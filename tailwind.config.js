/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Heebo', 'sans-serif'],
        heading: ['Rubik', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#C4704B',
          light: '#E8A87C',
        },
        success: '#7D9B76',
        highlight: '#E8836B',
        text: '#3D2C2C',
        card: '#FFFFFF',
        sticky: '#FEF3C7',
        bg: '#FDF6EC',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
