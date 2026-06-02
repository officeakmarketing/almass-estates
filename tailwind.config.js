/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#C8A96E',
          darkGold: '#a68a64',
          black: '#050505',
          card: '#111111',
          border: 'rgba(255, 255, 255, 0.08)'
        }
      },
      fontFamily: {
        sans: ['Jost', 'sans-serif'],
        serif: ['Jost', 'sans-serif'],
      },
      animation: {
        'slow-pan': 'slow-pan 30s ease-in-out infinite alternate',
        'breathe': 'breathe 8s ease-in-out infinite',
        'reveal-up': 'reveal-up 1.5s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'fade-in-slow': 'fade-in 3s ease-in-out forwards',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'slow-pan': {
          '0%': { transform: 'scale(1.1) translate(0, 0)' },
          '100%': { transform: 'scale(1.2) translate(-2%, -2%)' },
        },
        'breathe': {
          '0%, 100%': { opacity: '0.4', filter: 'blur(10px)' },
          '50%': { opacity: '0.8', filter: 'blur(20px)' },
        },
        'reveal-up': {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 0 0 rgba(196, 164, 124, 0.4)' },
          '50%': { opacity: .8, boxShadow: '0 0 0 10px rgba(196, 164, 124, 0)' },
        }
      }
    },
  },
  plugins: [],
}