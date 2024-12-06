const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		// "./node_modules/@nextui-org/theme/dist/components/(listbox|divider).js",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors:{
				primary: '#3b83f6',
			},
			fontFamily: {
				'cera': ['"Cera Pro Regular"', 'sans-serif'], // Use "Cera Pro" as the base font family
			},
		},
	},
	plugins: [nextui({
		theme: {
			extend: {
				colors: {
					primary: '#3b83f6',
				},
			},
		},
	})],
};
