/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        soc: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          cardHover: '#F1F5F9',
          border: '#E2E8F0',
          borderHighlight: '#CBD5E1',
          accent: '#2563EB',
          accentHover: '#1D4ED8',
          critical: '#DC2626',
          high: '#EA580C',
          medium: '#D97706',
          low: '#2563EB',
          safe: '#16A34A',
          text: '#0F172A',
          muted: '#64748B',
          dim: '#94A3B8'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
