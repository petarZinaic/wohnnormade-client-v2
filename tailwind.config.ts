import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      white: "#fff",
      black: "#000000",
      grey: "#707070",
      blueLight: "#455a64",
      blueDimmed: "rgba(69, 90, 100, 0.6)",
      blueDark: "#1b2327",
      orange: "#ff725e",
      orangeDisabled: "rgba(255, 114, 94, 0.35)",
      orangeLight: "rgba(215, 64, 0, 0.08)",
      orangeDark: "#da513d",
      purple: "rgba(89, 35, 131, 0.08)",
      purpleDdark: "#592383",
    },
    fontFamily: {
      Montserrat: ["Montserrat", "sans-serif"]
    }
  },
  plugins: [],
};
export default config;
