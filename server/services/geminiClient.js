const axios = require("axios");

const GEMINI_API_URL =
	"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// In-memory per-user Gemini rate limit
const userGeminiUsage = new Map();
function canUseGemini(user_id) {
	const now = Date.now();
	const windowMs = 60 * 1000; // 1 minute
	const maxPerMinute = 5;
	if (!userGeminiUsage.has(user_id)) {
		userGeminiUsage.set(user_id, []);
	}
	const timestamps = userGeminiUsage
		.get(user_id)
		.filter((ts) => now - ts < windowMs);
	if (timestamps.length >= maxPerMinute) return false;
	timestamps.push(now);
	userGeminiUsage.set(user_id, timestamps);
	return true;
}

// Simple in-memory cache
const captionCache = new Map();
const vibeCache = new Map();

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Fallback pools
const fallbackCaptions = [
	"To the moon! 🚀",
	"404 Meme Not Found",
	"HODL your memes!",
	"Neon dreams, meme schemes.",
	"When in doubt, meme it out.",
	"Viral in the cyber-void.",
	"Upload, upvote, up only!",
	"Meme like nobody's watching.",
	"Zero chill, full meme.",
	"AI says: Nice meme!",
];
const fallbackVibes = [
	"Neon Crypto Chaos",
	"Retro Meme Energy",
	"Quantum LOLs",
	"Pixel Punk Fever",
	"Stonks & Giggles",
	"Vaporwave Mischief",
	"Hackercore Humor",
	"Electric Meme Dream",
	"Byte-sized Banter",
	"Glowing Memeverse",
];
function randomFrom(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

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

async function generateCaption(tags, force = false) {
	const cacheKey = tags.sort().join(",");
	if (!force && captionCache.has(cacheKey)) {
		return captionCache.get(cacheKey);
	}
	try {
		const prompt = `Write a single, short, witty, original cyberpunk meme caption (not a list, not options, not markdown, no formatting) for a meme with these tags: ${tags.join(
			", "
		)}. Make it creative and under 100 characters. Do NOT return a list, options, or markdown.`;
		const caption = await generateWithRetry(prompt);
		captionCache.set(cacheKey, caption);
		return caption || randomFrom(fallbackCaptions);
	} catch (error) {
		console.error("Error generating caption:", error);
		return randomFrom(fallbackCaptions);
	}
}

async function generateVibe(tags, force = false) {
	const cacheKey = tags.sort().join(",");
	if (!force && vibeCache.has(cacheKey)) {
		return vibeCache.get(cacheKey);
	}
	try {
		const prompt = `Describe the unique cyberpunk vibe of a meme with these tags: ${tags.join(
			", "
		)}. Be creative, use fresh words, and keep it under 50 characters. Do not always use the word 'glitch'.`;
		const vibe = await generateWithRetry(prompt);
		vibeCache.set(cacheKey, vibe);
		return vibe || randomFrom(fallbackVibes);
	} catch (error) {
		console.error("Error generating vibe:", error);
		return randomFrom(fallbackVibes);
	}
}

module.exports = {
	generateCaption,
	generateVibe,
	canUseGemini,
};
