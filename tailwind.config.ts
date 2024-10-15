import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        neutral: '#faf7f0',
        ['sky-blue']: '#BEE2FD',
        purple800: '#022959',
        bg: '#EFF5FF',
        ['light-blue']: '#ABBCFF',
        grey: '#9699AA',
        red: '#EE374A',
        'border-grey': '#D6D9E6',
        purple: '#483EFF',
        purple100: '#f8f3ff',
        purple200: '#e4dcf8',
        purple300: '#d1c6f1',
        purple400: '#bdb1e8',
        purple500: '#aa9cdb',
        purple600: '#8f80cc',
        purple700: '#7066a3',
        purple800: '#524270',
        'very-light-grey': '#F8F9FF',

      }
    }
  },
  plugins: [],
}

export default config
