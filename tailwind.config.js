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
          bg: '#0B0F17',
          card: '#121824',
          cardHover: '#182030',
          border: '#1E293B',
          borderHighlight: '#334155',
          accent: '#3B82F6',
          accentHover: '#2563EB',
          critical: '#EF4444',
          high: '#F97316',
          medium: '#F59E0B',
          low: '#10B981',
          safe: '#06B6D4',
          text: '#F8FAFC',
          muted: '#94A3B8',
          dim: '#64748B'
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
