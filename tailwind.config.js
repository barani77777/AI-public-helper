/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        civic: {
          blue: '#0D9488',        // Teal primary (replaces blue)
          blueHover: '#0F766E',   // Teal hover
          deep: '#115E59',        // Deep teal
          amber: '#D97706',
          green: '#059669',
          red: '#DC2626',
          slate: '#475569',
        },
        surface: {
          50: '#FAF8F5',          // Warm off-white
          100: '#F5F0EB',         // Warm light
          200: '#E8E0D8',         // Warm border
          300: '#D4C9BE',         // Warm muted
          white: '#FFFFFF',
        },
        brand: {
          DEFAULT: '#0D9488',     // Teal
          hover: '#0F766E',       // Darker teal
          light: '#CCFBF1',       // Light teal bg
          dark: '#115E59',        // Dark teal
          forest: '#166534',      // Forest green
        },
        priority: {
          critical: '#DC2626',
          high: '#EA580C',
          medium: '#D97706',
          low: '#059669',
        },
        text: {
          primary: '#2D2D2D',     // Dark charcoal
          secondary: '#525252',   // Medium charcoal
          muted: '#737373',       // Muted gray
          disabled: '#A3A3A3',    // Light muted
        }
      },
      fontFamily: {
        heading: ['Outfit', 'system-ui', 'sans-serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        elem: '10px',
      },
      boxShadow: {
        'civic': '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'civic-card': '0 4px 12px -2px rgba(45, 45, 45, 0.06)',
        'civic-teal': '0 4px 14px -2px rgba(13, 148, 136, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.25s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
