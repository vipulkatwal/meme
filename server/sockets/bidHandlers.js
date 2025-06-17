const supabase = require("../services/supabaseClient");

const setupBidHandlers = (io, socket) => {
	// Handle new bid
	socket.on("place_bid", async ({ meme_id, credits, user_id }) => {
		try {
			// Get current highest bid
			const { data: currentBids } = await supabase
				.from("bids")
				.select("credits")
				.eq("meme_id", meme_id)
				.order("credits", { ascending: false })
				.limit(1);

			const currentHighestBid = currentBids?.[0]?.credits || 0;

			// Only accept bid if it's higher than current highest
			if (credits > currentHighestBid) {
				const { data: newBid, error } = await supabase
					.from("bids")
					.insert([
						{
							meme_id,
							user_id,
							credits,
						},
					])
					.select()
					.single();

				if (error) throw error;

				// Broadcast bid update to all clients
				io.emit("bid_update", {
					meme_id,
					new_bid: newBid,
					highest_bid: credits,
				});
			} else {
				// Notify the bidding user that their bid was too low
				socket.emit("bid_rejected", {
					meme_id,
					message: "Bid must be higher than current highest bid",
				});
			}
		} catch (error) {
			console.error("Error processing bid:", error);
			socket.emit("bid_error", {
				meme_id,
				message: "Error processing bid",
			});
		}
	});

	// Handle vote
	socket.on("vote", async ({ meme_id, type }) => {
		try {
			const { data, error } = await supabase
				.from("memes")
				.update({
					upvotes: supabase.raw(`upvotes + ${type === "up" ? 1 : -1}`),
				})
				.eq("id", meme_id)
				.select()
				.single();

			if (error) throw error;

			// Broadcast vote update to all clients
			io.emit("vote_update", {
				meme_id,
				upvotes: data.upvotes,
			});
		} catch (error) {
			console.error("Error processing vote:", error);
			socket.emit("vote_error", {
				meme_id,
				message: "Error processing vote",
			});
		}
	});
};

module.exports = {
	setupBidHandlers,
};
