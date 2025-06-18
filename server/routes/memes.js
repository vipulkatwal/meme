const express = require("express");
const router = express.Router();
const supabase = require("../services/supabaseClient");
const {
	generateCaption,
	generateVibe,
	canUseGemini,
} = require("../services/geminiClient");

// Create a new meme
router.post("/", async (req, res) => {
	try {
		const { title, image_url, tags, user_id } = req.body;
		if (!canUseGemini(user_id)) {
			return res
				.status(429)
				.json({ error: "Rate limit exceeded for AI generation." });
		}

		// Generate caption and vibe using Gemini
		const caption = await generateCaption(tags);
		const vibe = await generateVibe(tags);

		const { data, error } = await supabase
			.from("memes")
			.insert([
				{
					title,
					image_url: image_url || "https://via.placeholder.com/400x300",
					tags,
					caption,
					vibe,
					upvotes: 0,
					owner_id: "cyberpunk420", // Hardcoded as per requirements
				},
			])
			.select()
			.single();

		if (error) throw error;

		// Emit new meme event
		req.app.get("io").emit("new_meme", data);

		res.status(201).json(data);
	} catch (error) {
		console.error("Error creating meme:", error);
		res.status(500).json({ error: error.message });
	}
});

// Get all memes
router.get("/", async (req, res) => {
	try {
		const { data, error } = await supabase
			.from("memes")
			.select("*")
			.order("created_at", { ascending: false });

		if (error) throw error;
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Vote on a meme
router.post("/:id/vote", async (req, res) => {
	try {
		const { id } = req.params;
		const { type } = req.body;

		// Fetch current upvotes
		const { data: meme, error: fetchError } = await supabase
			.from("memes")
			.select("upvotes")
			.eq("id", id)
			.single();
		if (fetchError || !meme) throw fetchError || new Error("Meme not found");

		// Calculate new upvotes
		const newUpvotes = Math.max(0, meme.upvotes + (type === "up" ? 1 : -1));

		// Update upvotes in Supabase
		const { data, error } = await supabase
			.from("memes")
			.update({ upvotes: newUpvotes })
			.eq("id", id)
			.select()
			.single();
		if (error) throw error;

		// Emit vote update
		const io = req.app.get("io");
		if (io) {
			io.emit("vote_update", { meme_id: id, upvotes: newUpvotes });
		}

		res.json(data);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Get leaderboard
router.get("/leaderboard", async (req, res) => {
	try {
		const { top = 10 } = req.query;

		const { data, error } = await supabase
			.from("memes")
			.select("*")
			.order("upvotes", { ascending: false })
			.limit(parseInt(top));

		if (error) throw error;
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Create a new bid for a meme
router.post("/:id/bid", async (req, res) => {
	try {
		const { id: meme_id } = req.params;
		const { credits, user_id, user_name, user_avatar } = req.body;
		if (!credits || !user_id) {
			return res
				.status(400)
				.json({ error: "credits and user_id are required" });
		}

		// Get current highest bid
		const { data: currentBids } = await supabase
			.from("bids")
			.select("credits")
			.eq("meme_id", meme_id)
			.order("credits", { ascending: false })
			.limit(1);
		const currentHighestBid = currentBids?.[0]?.credits || 0;

		if (credits <= currentHighestBid) {
			return res
				.status(400)
				.json({ error: "Bid must be higher than current highest bid" });
		}

		const { data: newBid, error } = await supabase
			.from("bids")
			.insert([{ meme_id, user_id, user_name, user_avatar, credits }])
			.select()
			.single();
		if (error) throw error;

		// Emit bid update via Socket.IO with highest_bidder info
		req.app.get("io")?.emit("bid_update", {
			meme_id,
			highest_bid: credits,
			highest_bidder: {
				id: user_id,
				name: user_name,
				avatar: user_avatar,
			},
		});

		res.status(201).json(newBid);
	} catch (error) {
		console.error("Error creating bid:", error);
		res.status(500).json({ error: error.message });
	}
});

// Generate caption and vibe for a meme (on demand)
router.post("/:id/caption", async (req, res) => {
	try {
		const { id } = req.params;
		// Fetch meme tags
		const { data: meme, error: memeError } = await supabase
			.from("memes")
			.select("tags")
			.eq("id", id)
			.single();
		if (memeError || !meme) {
			return res.status(404).json({ error: "Meme not found" });
		}
		const tags = meme.tags || [];

		// Force regenerate caption and vibe
		const caption = await generateCaption(tags, true);
		const vibe = await generateVibe(tags, true);

		// Update meme with caption and vibe
		const { data: updatedMeme, error: updateError } = await supabase
			.from("memes")
			.update({ caption, vibe })
			.eq("id", id)
			.select()
			.single();
		if (updateError) throw updateError;

		res.json(updatedMeme);
	} catch (error) {
		console.error("Error generating caption/vibe:", error);
		res.status(500).json({ error: error.message });
	}
});

// Get all memes with highest bid and bidder
router.get("/with-bids", async (req, res) => {
	try {
		const { data: memes, error } = await supabase
			.from("memes")
			.select("*")
			.order("created_at", { ascending: false });

		if (error) throw error;

		// For each meme, fetch the highest bid
		const memesWithBids = await Promise.all(
			memes.map(async (meme) => {
				const { data: bids } = await supabase
					.from("bids")
					.select("credits, user_id, user_name, user_avatar")
					.eq("meme_id", meme.id)
					.order("credits", { ascending: false })
					.limit(1);

				if (bids && bids.length > 0) {
					meme.highest_bid = bids[0].credits;
					meme.highest_bidder = {
						id: bids[0].user_id,
						name: bids[0].user_name,
						avatar: bids[0].user_avatar,
					};
				} else {
					meme.highest_bid = 0;
					meme.highest_bidder = null;
				}
				return meme;
			})
		);

		res.json(memesWithBids);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
