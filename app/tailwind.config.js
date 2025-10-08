/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Garanta que esta linha existe!
  ],
  theme: {
    extend: {
      colors: {
        primary: '#BC1F1B',
        secondary: '#2B2522',
        accent: '#4F46E5',
      },
    },
  },
  plugins: [],
}