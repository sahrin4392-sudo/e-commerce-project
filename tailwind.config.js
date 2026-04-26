/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fbf8ea',
          100: '#f6efcd',
          200: '#efdf9e',
          300: '#e6c867',
          400: '#deb339',
          500: '#d4af37', // Gold accent
          600: '#b8860b', // Darker gold
          700: '#9b6c07',
          800: '#82580b',
          900: '#6f4a0f',
          950: '#402704',
        },
        dark: {
          bg: '#0F0F0F',    // Deep luxury black
          surface: '#1A1A1A', // Dark Gray surface
          glow: '#d4af37', // Gold glow
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
