/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mainGray: 'rgb(228, 235, 240)',
        mainBlue: 'rgb(0, 161, 255)',
        darkBlue: 'rgb(31, 42, 61)',
        mainBlack: 'rgb(17, 28, 45)',
      },
    },
  },
  plugins: [],
};
