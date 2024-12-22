/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
		  colors: {
			primary: '#3b82f6', // Blue
			secondary: '#9333ea', // Purple
			background: '#f5f5f5',
			'card-light': '#fff', // Light Card
			'card-dark': '#333', // Dark Card
		  },
		  fontFamily: {
			sans: ['Inter', 'sans-serif'],
		  },
		},
	  },
  plugins: [require("tailwindcss-animate")],
}

