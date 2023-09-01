/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hello-text":
          "url('https://ik.imagekit.io/zquvvhmdy/pizza_khao/hello_background.jpg?updatedAt=1683123625897')",
        "page-head":
          "url('https://ik.imagekit.io/zquvvhmdy/pizza_khao/footer_background1.jpg?updatedAt=1683123625810')",
        "restro-menu":
          "url('https://ik.imagekit.io/zquvvhmdy/pizza_khao/restro-menu.jpg?updatedAt=1683123633803')",
        "banner-background":
          "url('https://ik.imagekit.io/zquvvhmdy/pizza_khao/Banner_background.jpg?updatedAt=1691993180408')",
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
      roboto: ["Roboto", "sans-serif"],
    },
  },
  plugins: [],
};
