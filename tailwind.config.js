/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
	],
	safelist: [
		'bg-[#46b8e9]', 'bg-[#3ee9d1]', 'bg-[#45bd97]', 'bg-[#72a3e1]', 'bg-[#4d92eb]',
		'after:border-[#46b8e9]', 'after:border-[#3ee9d1]', 'after:border-[#45bd97]', 'after:border-[#72a3e1]', 'after:border-[#4d92eb]'
	],
	theme: {
		extend: {},
	},
	plugins: [],
}

