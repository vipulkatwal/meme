import { useState, useEffect, useCallback } from "react";
import { supabase } from "../services/supabaseClient";
import { socket } from "../services/socketClient";
import { getUserId } from "../utils/userId";

export function useMemes() {
	const [memes, setMemes] = useState([]);
	const [loading, setLoading] = useState(true);

	// Fetch memes from Supabase
	const fetchMemes = useCallback(async () => {
		setLoading(true);
		const { data, error } = await supabase
			.from("memes")
			.select("*")
			.order("created_at", { ascending: false });
		if (!error) setMemes(data);
		setLoading(false);
	}, []);

	useEffect(() => {
		fetchMemes();
		// Real-time updates
		socket.on("new_meme", (meme) => setMemes((prev) => [meme, ...prev]));
		socket.on("vote_update", ({ meme_id, upvotes }) => {
			setMemes((prev) =>
				prev.map((meme) => (meme.id === meme_id ? { ...meme, upvotes } : meme))
			);
		});
		socket.on("bid_update", ({ meme_id, highest_bid }) => {
			setMemes((prev) =>
				prev.map((meme) =>
					meme.id === meme_id ? { ...meme, highest_bid } : meme
				)
			);
		});
		return () => {
			socket.off("new_meme");
			socket.off("vote_update");
			socket.off("bid_update");
		};
	}, [fetchMemes]);

	// Create meme
	const createMeme = async (memeData) => {
		const user_id = getUserId();
		const response = await fetch("http://localhost:3000/api/memes", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...memeData, user_id }),
		});
		if (!response.ok) throw new Error("Failed to create meme");
		const newMeme = await response.json();
		setMemes((prev) => [newMeme, ...prev]);
		return newMeme;
	};

	// Vote meme
	const voteMeme = async (memeId, type) => {
		const user_id = getUserId();
		await fetch(`http://localhost:3000/api/memes/${memeId}/vote`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ type, user_id }),
		});
	};

	// Place bid
	const bidMeme = (memeId, credits) => {
		const user_id = getUserId();
		socket.emit("place_bid", {
			meme_id: memeId,
			credits,
			user_id,
		});
	};

	return {
		memes,
		loading,
		fetchMemes,
		createMeme,
		voteMeme,
		bidMeme,
	};
}
