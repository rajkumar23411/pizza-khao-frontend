export const baseUrl = "https://creepy-jersey-dog.cyclic.app";

export const config = {
  headers: { "Content-Type": "application/json" },
};

export const Categories = [
  "Cheese",
  "For Kids",
  "Light",
  "Piquant",
  "Savory",
  "Sea food",
  "Sweet",
  "Veggie",
];

export const pizzaSize = ["regular", "medium", "large", "extralarge"];

export const sortingOptions = [
  "Price Low to High",
  "Price High to Low",
  "Name A to Z",
  "Name Z to A",
  "Newest first",
  "Oldest first",
  "Average Rating",
];

export const getDate = (createdAt) => {
  const date = new Date(createdAt);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate = date.toLocaleString("en-US", options);
  return formattedDate;
};

export const menuLightCategories = [
  { name: "All", image: "/images/pizza-slice.svg" },
  { name: "Cheese", image: "/images/cheese.png" },
  { name: "For Kids", image: "/images/kid.png" },
  { name: "Light", image: "/images/light.png" },
  { name: "Piquant", image: "/images/piquent.png" },
  { name: "Savory", image: "/images/savory.png" },
  { name: "Sea food", image: "/images/sea_food.png" },
  { name: "Sweet", image: "/images/sweet.png" },
  { name: "Veggie", image: "/images/veggie.png" },
];

export const phrases = [
  "Hang on! Tossing dough... 🍕",
  "Hang in there! Grating cheese... 🧀",
  "Wait a moment! Slicing pepperoni... 🍴",
  "Hang on! Baking in progress... 🔥",
  "Be patient! Adding fresh toppings... 🥬",
  "Keep calm! Preparing the sauce... 🍅",
  "Hang on! Rolling out the crust... 🌀",
  "Hang on! Seasoning to perfection... 🧂",
  "Just a minute! Checking the oven temperature... 🔍",
  "Hang on! Plating the pizza... 🍽️",
];

export const randomLoaderPhrase = () => {
  return phrases[Math.floor(Math.random() * phrases.length)];
};

export const PagesSubMenu = [
  "About Us",
  "Our Serices",
  "Our team",
  "Book a table",
  "Contact Us",
  "Get in touch",
  "Coming Soon",
];

export const shopSubMenu = [
  { name: "Favourites", link: "/account/favourites" },
  { name: "My orders", link: "/my-order" },
  { name: "Cart", link: "/cart" },
  { name: "Checkout", link: "/checkout" },
  { name: "My Account", link: "/account/settings" },
];
