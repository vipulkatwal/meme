/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				orbitron: ["Orbitron", "sans-serif"],
				"share-tech-mono": ['"Share Tech Mono"', "monospace"],
			},
			colors: {
				cyber: {
					primary: "#00f6ff",
					secondary: "#ff00ff",
					dark: "#0a0a0f",
					darker: "#050507",
				},
			},
			animation: {
				glitch: "glitch 1s linear infinite",
				flicker: "flicker 3s linear infinite",
			},
			keyframes: {
				glitch: {
					"0%, 100%": { transform: "translate(0)" },
					"33%": { transform: "translate(-2px, 2px)" },
					"66%": { transform: "translate(2px, -2px)" },
				},
				flicker: {
					"0%, 100%": { opacity: 1 },
					"50%": { opacity: 0.8 },
				},
			},
		},
	},
	plugins: [],
};
