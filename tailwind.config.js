/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  darkMode: 'media', // or 'class' for manual toggle
  theme: {
    extend: {
      colors: {
        // Add custom colors if needed
      },
      spacing: {
        '72': '18rem', // For sidebar width
        '24': '6rem',  // For collapsed sidebar width
      },
      zIndex: {
        '100': '100',
      },
      boxShadow: {
        'sidebar': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      transitionProperty: {
        'width': 'width',
        'spacing': 'margin, padding',
      },
      // Add responsive breakpoints if needed
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}
