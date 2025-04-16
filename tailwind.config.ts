import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          md: "3rem",
          lg: "4rem",
          xl: "6rem",
          "2xl": "8rem",
        },
        screens: {
          "2xl": "1580px",
          xl: "1324px",
          lg: "1024px",
          md: "100%",
          sm: "100%",
        },
      },
    },
  },
  
  plugins: [],
} satisfies Config;
