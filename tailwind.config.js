/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        prm: "#3D48EB",
        sec: "#7F45FC",
        bgprm: "#18181B",
        bgsec: "#1C1C21",
        hvr: "#34343D",
        tktbg: "#2F2C26",
        tkttxt: "#E2B945",
        issbg: "#232837",
        isstxt: "#668CFF",
        txtprm: "#C5C5C9",
        txtsec: "#EFEFF0",
      },
    },
  },
  plugins: [],
}
