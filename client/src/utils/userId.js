// Assign a random mock user to this client if not already assigned
export const mockUsers = [
	{
		id: "cyberpunk420",
		name: "Neo Biddersmith",
		avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Neo",
		role: "creator",
	},
	{
		id: "hackerette88",
		name: "Glitch Queen",
		avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Glitch",
		role: "trader",
	},
	{
		id: "stonkslord777",
		name: "Elon Stonks",
		avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Stonks",
		role: "speculator",
	},
	{
		id: "bytefreak01",
		name: "Byte Freak",
		avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=ByteFreak",
		role: "engineer",
	},
	{
		id: "vibecrasher007",
		name: "Vibe Crasher",
		avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=VibeCrasher",
		role: "troll",
	},
	{
		id: "memelordx",
		name: "Meme Lord X",
		avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=MemeLordX",
		role: "collector",
	},
	{
		id: "gl1tchm0nk",
		name: "Gl1tch M0nk",
		avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=GlitchMonk",
		role: "creator",
	},
	{
		id: "degen_dao",
		name: "Degen DAO",
		avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=DegenDAO",
		role: "trader",
	},
	{
		id: "rootkitronin",
		name: "Rootkit Ronin",
		avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=RootkitRonin",
		role: "hacker",
	},
	{
		id: "shillmaster9000",
		name: "Shillmaster 9000",
		avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Shillmaster",
		role: "promoter",
	},
];

export function getUser() {
	let user = null;
	try {
		user = JSON.parse(localStorage.getItem("mockUser"));
	} catch {}
	if (!user) {
		user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
		localStorage.setItem("mockUser", JSON.stringify(user));
	}
	return user;
}
