/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "merriweather": ["Merriweather", "serif"]
      }, 
      colors: {
        "yellow": "#EDF042",
        'modal-black': 'rgba(0,0,0,0.4)',
      } 
    },
  },
  plugins: [],
}

