/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hello-text": "url('../public/images/hello_background.jpg')",
        "page-head": "url('../public/images/footer_background1.jpg')",
        "restro-menu": "url('../public/images/restro-menu.jpg')",
      },
      textColor: {
        golden: "#B7903C",
      },
      borderColor: {
        golden: "#B7903C",
      },
    },
    fontFamily: {
      sans: ["sans-serif"],
      roboto: ["Lato"],
    },
  },
  plugins: [],
};
