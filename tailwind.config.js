/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
        },
        status: {
          full: '#ef4444',
          filling: '#f59e0b',
          open: '#22c55e',
        },
      },
      boxShadow: {
        phone: '0 30px 60px -15px rgba(0,0,0,0.55)',
        card: '0 4px 20px -6px rgba(15,23,42,0.12)',
      },
      keyframes: {
        'fade-slide': {
          '0%': { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-slide': 'fade-slide 0.28s ease-out',
      },
    },
  },
  plugins: [],
}
