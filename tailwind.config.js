/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FAF8F3',
        paper2: '#F1EDE2',
        ink: '#1C1B17',
        inksoft: '#4A473E',
        muted: '#8B8678',
        line: '#DEDACB',
        purple: {
          DEFAULT: '#7C4DD9',
          bg: '#EFE7FB',
        },
        amber: {
          DEFAULT: '#D97B29',
          bg: '#FBEBDC',
        },
        note: '#FFF3B0',
        scrap: {
          bg: '#F3ECE4',
          rose: '#C85C7A',
          rosedark: '#A8425E',
          pink: '#D98DA0',
          orange: '#E8A33D',
          cream: '#F0E4D0',
          olive: '#A6A37C',
          tape: '#E8C15A',
        },
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'monospace'],
        serif: ['var(--font-serif)', 'serif'],
        script: ['var(--font-script)', 'cursive'],
        hand: ['var(--font-hand)', 'cursive'],
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(var(--rot, 0deg))' },
          '50%': { transform: 'translateY(-8px) rotate(var(--rot, 0deg))' },
        },
      },
    },
  },
  plugins: [],
};
