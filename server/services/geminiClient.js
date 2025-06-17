const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Simple in-memory cache
const captionCache = new Map();
const vibeCache = new Map();

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateWithRetry = async (prompt, retries = MAX_RETRIES) => {
	try {
		const result = await model.generateContent(prompt);
		const response = await result.response;
		return response.text();
	} catch (error) {
		if (retries > 0) {
			await sleep(RETRY_DELAY);
			return generateWithRetry(prompt, retries - 1);
		}
		throw error;
	}
};

const generateCaption = async (tags) => {
	const cacheKey = tags.sort().join(",");

	if (captionCache.has(cacheKey)) {
		return captionCache.get(cacheKey);
	}

	try {
		const prompt = `Write a funny, cyberpunk-themed meme caption for a meme with these tags: ${tags.join(
			", "
		)}.
                   Keep it short, witty, and under 100 characters.`;

		const caption = await generateWithRetry(prompt);
		captionCache.set(cacheKey, caption);
		return caption;
	} catch (error) {
		console.error("Error generating caption:", error);
		return "To the moon! 🚀"; // Fallback caption
	}
};

const generateVibe = async (tags) => {
	const cacheKey = tags.sort().join(",");

	if (vibeCache.has(cacheKey)) {
		return vibeCache.get(cacheKey);
	}

	try {
		const prompt = `Describe the cyberpunk vibe of a meme with these tags: ${tags.join(
			", "
		)}.
                   Keep it short and atmospheric, under 50 characters.`;

		const vibe = await generateWithRetry(prompt);
		vibeCache.set(cacheKey, vibe);
		return vibe;
	} catch (error) {
		console.error("Error generating vibe:", error);
		return "Neon Crypto Chaos"; // Fallback vibe
	}
};

module.exports = {
	generateCaption,
	generateVibe,
};
