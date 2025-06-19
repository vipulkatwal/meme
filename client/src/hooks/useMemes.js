import { useState, useEffect, useCallback } from "react";
import { supabase } from "../services/supabaseClient";
import { socket } from "../services/socketClient";
import { getUser, mockUsers } from "../utils/userId";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function useMemes() {
	const [memes, setMemes] = useState([]);
	const [loading, setLoading] = useState(true);

	// Fetch memes from Supabase
	const fetchMemes = useCallback(async () => {
		setLoading(true);
		const response = await fetch(`${API_URL}/api/memes/with-bids`);
		if (response.ok) {
			const data = await response.json();
			setMemes(data);
		}
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
		socket.on("bid_update", ({ meme_id, highest_bid, highest_bidder }) => {
			setMemes((prev) =>
				prev.map((meme) =>
					meme.id === meme_id ? { ...meme, highest_bid, highest_bidder } : meme
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
		const user_id = getUser().id;
		const response = await fetch(`${API_URL}/api/memes`, {
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
		const user_id = getUser().id;
		await fetch(`${API_URL}/api/memes/${memeId}/vote`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ type, user_id }),
		});
	};

	// Place bid
	const bidMeme = async (memeId, credits) => {
		// Pick a random mock user for each bid
		const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
		const response = await fetch(`${API_URL}/api/memes/${memeId}/bid`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				credits,
				user_id: user.id,
				user_name: user.name,
				user_avatar: user.avatar,
			}),
		});
		if (!response.ok) {
			const err = await response.json();
			alert(err.error || "Failed to place bid");
			throw new Error(err.error || "Failed to place bid");
		}
		// No need to update state here; real-time update comes from socket event
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
