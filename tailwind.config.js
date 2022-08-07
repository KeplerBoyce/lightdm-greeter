/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "shake": "shake 400ms 1",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0px)", animationTimingFunction: "ease-out" },
          "14%": { transform: "translateX(8px)", animationTimingFunction: "ease-out" },
          "29%": { transform: "translateX(-8px)", animationTimingFunction: "ease-out" },
          "43%": { transform: "translateX(4px)", animationTimingFunction: "ease-out" },
          "57%": { transform: "translateX(-4px)", animationTimingFunction: "ease-out" },
          "71%": { transform: "translateX(2px)", animationTimingFunction: "ease-out" },
          "86%": { transform: "translateX(-2px)", animationTimingFunction: "ease-out" },
        },
      },
    },
  },
  plugins: [],
}
