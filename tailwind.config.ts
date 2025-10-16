import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'miac-green': '#004d00',
        'miac-gold': '#ffd700',
        'miac-white': '#ffffff',
      },
    },
  },
  plugins: [],
};
export default config;