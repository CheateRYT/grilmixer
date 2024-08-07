/** @type {import('tailwindcss').Config} */
export default {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // или 'media' или 'class'
	theme: {
		extend: {
			colors: {
				primary: '#FF0000',
				secondary: '#00FF00',
			},
			fontFamily: {
				sans: ['Roboto', 'sans-serif'],
			},
			spacing: {
				72: '18rem',
				84: '21rem',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
