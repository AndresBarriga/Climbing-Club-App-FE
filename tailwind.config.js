const colors = require('tailwindcss/colors');


module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	purge: {
	  safelist: {
		standard: [
		  'text-2xl',
		  'text-3xl',
		  'text-4xl',
		  'text-5xl',
		  'text-6xl',
		  'sm:text-2xl',
		  'sm:text-3xl',
		  'sm:text-4xl',
		  'sm:text-5xl',
		  'sm:text-6xl',
		  'md:text-2xl',
		  'md:text-3xl',
		  'md:text-4xl',
		  'md:text-5xl',
		  'md:text-6xl',
		  'lg:text-2xl',
		  'lg:text-3xl',
		  'lg:text-4xl',
		  'lg:text-5xl',
		  'lg:text-6xl',
		],
	  },
	  content: ['./src/**/*.{js,jsx,ts,tsx}'],
	},
	theme: {
	  extend: {
   
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
		fontSize: {
		  'xs': '.75rem',
		  'sm': '.875rem',
		  'base': '1rem',
		  'lg': '1.125rem',
		  'xl': '1.25rem',
		  '2xl': '1.5rem',
		  '3xl': '1.875rem',
		  '4xl': '2.25rem',
		  '5xl': '3rem',
		  '6xl': '4rem',
		  '16px': '16px',
		  '18px': '18px',
		  '20px': '20px',
		  '22px': '22px',
		},
		screens: {
			'sm': '640px',
			// => @media (min-width: 640px) { ... }
	  
			'md': '768px',
			// => @media (min-width: 768px) { ... }
	  
			'lg': '1024px',
			// => @media (min-width: 1024px) { ... }
	  
			'xl': '1280px',
			// => @media (min-width: 1280px) { ... }
	  
			'2xl': '1536px',
			// => @media (min-width: 1536px) { ... }
		  },
		backgroundColor: {
		  'slate-200': 'rgb(226, 232, 240)',
		},
		colors: {
		  'primary-light': '#F7F8FC',
		  'secondary-light': '#FFFFFF',
		  'ternary-light': '#f6f7f8',
		  'primary-dark': '#0D2438',
		  'secondary-dark': '#102D44',
		  'ternary-dark': '#1E3851',
		},
		container: {
		  padding: {
			DEFAULT: '1rem',
			sm: '2rem',
			lg: '5rem',
			xl: '6rem',
			'2xl': '8rem',
		  },
		},
	  },
	},
	variants: {
	  extend: { opacity: ['disabled'] },
	},
	plugins: ['@tailwindcss/forms'],
  };