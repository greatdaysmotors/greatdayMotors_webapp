/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#2F2FC8",
        brandBlack: "#333333",
        brandSuccessColor: "#0A8917",
        brandDark: "#1A1A1A",
        textGray: "#E6E6E6",
        textDeepGray: "#666666",
        successColor: "#0A8917",
        brandGray: "#999999",
        brandErrorColor: "#EC3B3B",
      },
    },
  },
  plugins: [],
};

