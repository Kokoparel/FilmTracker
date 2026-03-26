/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['"Playfair Display"', 'Georgia', 'serif'],
        'body': ['"DM Sans"', 'sans-serif'],
        'mono': ['"DM Mono"', 'monospace'],
      },
      colors: {
        'film': {
          'black':   '#0a0a0b',
          'dark':    '#111114',
          'card':    '#17171c',
          'border':  '#2a2a35',
          'muted':   '#3a3a48',
          'gold':    '#d4a843',
          'gold-lt': '#f0c96b',
          'cream':   '#f5efe6',
          'red':     '#c0392b',
          'text':    '#e8e0d5',
          'sub':     '#8a8494',
        }
      },
      boxShadow: {
        'gold': '0 0 0 2px #d4a843, 0 0 30px rgba(212,168,67,0.2)',
        'card': '0 8px 32px rgba(0,0,0,0.5)',
        'glow': '0 0 20px rgba(212,168,67,0.35)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        masterpiece: {
          '0%, 100%': { boxShadow: '0 0 0 2px #d4a843, 0 0 20px rgba(212,168,67,0.2)' },
          '50%': { boxShadow: '0 0 0 2px #f0c96b, 0 0 40px rgba(212,168,67,0.45)' },
        },
        badgePop: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '70%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
        'masterpiece': 'masterpiece 2s ease-in-out infinite',
        'badge-pop': 'badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
      },
    },
  },
  plugins: [],
}