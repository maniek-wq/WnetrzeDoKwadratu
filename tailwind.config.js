/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          light: '#F5F5DC',
          medium: '#F5E6D3',
          warm: '#E8DCC6'
        },
        earth: {
          brown: '#8B7355',
          tan: '#D4A574',
          gold: '#B8860B'
        },
        gray: {
          light: '#A9A9A9',
          medium: '#808080',
          dark: '#2F2F2F'
        }
      },
      animation: {
        'zoom-out': 'zoomOut 1s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.5s ease-out forwards',
        'letter-fade': 'letterFade 0.3s ease-out forwards'
      },
      keyframes: {
        zoomOut: {
          '0%': { transform: 'scale(1.3)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        letterFade: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}

