/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      data: {
        checked: 'li~="checked"',
      },
      keyframes: {
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        'close-rotate': {
          '0%': { transform: 'scale(0.2) rotate(-120deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        'hamburger-scaleX': {
          '0%': { transform: 'scaleX(0)' },
          '70%': { transform: 'scaleX(1.2)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'toast-slide-in': {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'toast-slide-out': {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(100%)', opacity: 0 },
        },
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: 'translateX(2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: 'translateY(2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: 'translateX(2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
      },
      animation: {
        'close-rotate': 'close-rotate 0.3s ease-out forwards',
        'hamburger-scaleX': 'hamburger-scaleX 0.3s ease-out forwards ',
        'toast-slide-in': 'toast-slide-in 0.3s ease-out forwards',
        'toast-slide-out': 'toast-slide-out 0.3s ease-in forwards',
        slideDownAndFade:
          'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade:
          'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade:
          'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require('windy-radix-palette')],
}
