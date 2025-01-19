/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    mode: 'jit',
    important: true,
    content: ['./dist/**/*.{js,ts,jsx,tsx,html}', './src/**/*.{js,ts,jsx,tsx,html}'],
    theme: {
        extend: {
            opacity: {
                '05': '0.05'
            },
            colors: {
                green: {
                    50: '#FFFFFF',
                    100: '#EFFAF2',
                    150: '#E0F5E6',
                    200: '#D0F0D9',
                    250: '#C1EBCC',
                    300: '#B1E7C0',
                    350: '#A2E2B3',
                    400: '#92DDA6',
                    450: '#83D89A',
                    500: '#73D38D',
                    550: '#64CE80',
                    600: '#54C974',
                    650: '#45C467',
                    700: '#3BBA5D',
                    750: '#36AB55',
                    800: '#319B4D',
                    850: '#2C8C46',
                    900: '#277C3E',
                    950: '#226D36',
                    1000: '#1D5D2E',
                    1050: '#184E27',
                    1100: '#143E1F',
                    1150: '#0F2F17',
                    1200: '#0A1F0F',
                    1250: '#051008'
                }
            }
        }
    }
};
