/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgMain: '#F4F5F6',
        cardBg: '#FFFFFF',
        textPrimary: '#000000',
        titleMalayalam: '#0F172A',
        textMalayalam: '#334155',
        blueAvBg: '#94BEF2',
        redAvBg: '#F48789',
        bnBg: '#FBD5D6',
        bnPill: '#FFA3AE',
        bnPillText: '#7A1719',
        timeBg: '#D5E1EC',
        timeText: '#64748B',
        strokeColor: '#D6D6D6',
        timelineStroke: '#676767',
        navBg: '#F5F5F5',
        moreBg: '#8290A8'
      },
      fontFamily: {
        'malayalam': ['"Noto Serif Malayalam"', 'serif'],
        'inter': ['"SF Pro Rounded"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'sf': ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}
