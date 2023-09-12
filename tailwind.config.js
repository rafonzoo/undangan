const defaultTheme = require('tailwindcss/defaultTheme')
// const translate = {
//   '3d-center': 'translate3d(-50%,-50%,0)',
//   '3d-0': 'translate3d(0,0,0)',
//   'z-0': 'translateZ(0)',
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
        good: ['Good Dog', 'Inter', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        // small: ['11px', '15px'],
        small: ['12px', '16px'],
        base: ['17px', '24px'],
        elevated: ['19px', '25px'],
        lead: ['21px', '26px'],
        good: ['24px', '20px']
        // heading: ['24px', '28px'],
        // hero: ['30px', '34px'],
      },
      letterSpacing: {
        base: '0.013em',
        lead: '0.021em',
        // heading: '0.021em',
        // hero: '0.0125em',
      },
      spacing: {
        inherit: 'inherit'
        // 21: 84,
      },
      screens: {
        xxs: '359px',
        // sm: '525px',
        // md: '768px',
      },
      keyframes: {
        scrolldown: {
          '0%': { backgroundPosition: '-204px 0' },
          '100%': { backgroundPosition: '204px 0' },
        }
      },
      animation: {
        playback: 'spin 20s linear infinite',
        scrolldown: 'scrolldown 3s infinite',
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        // '.translate-3d-center': { transform: translate['3d-center'] },
        // '.translate-z-0': { transform: 'translateZ(0)' },
        // '.backface-hidden': { 'backface-visibility': 'hidden' },
        '.translate-3d-0': { transform: 'translate3d(0,0,0)' },
      })
    },
  ],
}
