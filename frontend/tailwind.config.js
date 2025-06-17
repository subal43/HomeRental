/** @type {import('tailwindcss').Config} */
export default {
  content: [

    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

           boxShadow: {
        'top-lg': '0 -4px 10px rgba(0, 0, 0, 0.2)',
      },

      keyframes: {
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'zoom-in': {
          '0%': { transform: 'scale(0.8)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
       animation: {
        'fade-in-up': 'fade-in-up 1s ease-out',
        'zoom-in': 'zoom-in 0.8s ease-out',
      },

         keyframe: {
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },

      animated: {
        'fade-in-up': 'fade-in-up 0.6s ease-out',
      },
    },
  },
  plugins: [],
}

