/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // User Exact 5-Color Palette (#0F0F0F, #202020, #5DD62C, #337418, #F8F8F8)
        darkCharcoal: '#0F0F0F', // Ultra Dark Header / Dark Contrast
        darkGrey: '#202020',     // Deep Grey Secondary Surfaces
        limePrimary: '#5DD62C',  // Vibrant Electric Lime Green (Primary Action Accent)
        forestGreen: '#337418',  // Deep Forest Green (Notice & Status Accent)
        whitePrimary: '#F8F8F8', // Crisp Off-White Primary Background & Cards

        bg: {
          dark: '#F8F8F8',
          surface: '#FFFFFF',
          card: '#FFFFFF',
          hover: '#F0F0F0',
        },
        brand: {
          cyan: '#5DD62C',
          mint: '#5DD62C',
          emerald: '#5DD62C',
          accent: '#337418',
          muted: '#0F0F0F',
        },
        status: {
          success: '#337418',
          warning: '#D97706',
          error: '#DC2626',
          info: '#2563EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
        glass: '16px',
      },
      boxShadow: {
        flat: '0 2px 6px rgba(15, 15, 15, 0.05)',
        card: '0 3px 12px rgba(15, 15, 15, 0.08)',
        header: '0 2px 8px rgba(15, 15, 15, 0.12)',
      },
      borderColor: {
        clean: 'rgba(32, 32, 32, 0.12)',
        lime: 'rgba(93, 214, 44, 0.40)',
      }
    },
  },
  plugins: [],
}
