/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: [
    './dist/**/*.{js,ts,jsx,tsx,html}',
    './src/**/*.{js,ts,jsx,tsx,html}',
  ],
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {},
  important: true
}
