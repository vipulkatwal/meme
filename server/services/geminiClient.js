const axios = require("axios");

const GEMINI_API_URL =
	"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Simple in-memory cache
const captionCache = new Map();
const vibeCache = new Map();

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateWithRetry(prompt, retries = MAX_RETRIES) {
	try {
		const response = await axios.post(
			`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
			{
				contents: [{ parts: [{ text: prompt }] }],
			},
			{ headers: { "Content-Type": "application/json" } }
		);
		return response.data.candidates?.[0]?.content?.parts?.[0]?.text;
	} catch (error) {
		if (retries > 0) {
			await sleep(RETRY_DELAY);
			return generateWithRetry(prompt, retries - 1);
		}
		console.error("Gemini API error:", error.response?.data || error.message);
		throw error;
	}
}

async function generateCaption(tags) {
	const cacheKey = tags.sort().join(",");
	if (captionCache.has(cacheKey)) {
		return captionCache.get(cacheKey);
	}
	try {
		const prompt = `Write a funny, cyberpunk-themed meme caption for a meme with these tags: ${tags.join(
			", "
		)}. Keep it short, witty, and under 100 characters.`;
		const caption = await generateWithRetry(prompt);
		captionCache.set(cacheKey, caption);
		return caption || "To the moon! 🚀";
	} catch (error) {
		console.error("Error generating caption:", error);
		return "To the moon! 🚀";
	}
}

async function generateVibe(tags) {
	const cacheKey = tags.sort().join(",");
	if (vibeCache.has(cacheKey)) {
		return vibeCache.get(cacheKey);
	}
	try {
		const prompt = `Describe the cyberpunk vibe of a meme with these tags: ${tags.join(
			", "
		)}. Keep it short and atmospheric, under 50 characters.`;
		const vibe = await generateWithRetry(prompt);
		vibeCache.set(cacheKey, vibe);
		return vibe || "Neon Crypto Chaos";
	} catch (error) {
		console.error("Error generating vibe:", error);
		return "Neon Crypto Chaos";
	}
}

module.exports = {
	generateCaption,
	generateVibe,
};
