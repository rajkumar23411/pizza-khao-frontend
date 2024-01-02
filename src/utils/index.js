export const baseUrl = process.env.REACT_APP_BACKEND_URL;

export const config = {
    headers: { "Content-Type": "application/json" },
    credential: "include",
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
export const filterOptions = [
    "Price High to Low",
    "Price Low to High",
    "Name A to Z",
    "Name Z to A",
    "Newest First",
    "Oldest First",
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
    {
        name: "All",
        image: "https://ik.imagekit.io/zquvvhmdy/pizza_khao/pizza-slice.svg?updatedAt=1683123631421",
    },
    {
        name: "Cheese",
        image: "https://ik.imagekit.io/zquvvhmdy/pizza_khao/cheese.png?updatedAt=1683123622255",
    },
    {
        name: "For Kids",
        image: "https://ik.imagekit.io/zquvvhmdy/pizza_khao/kid.png?updatedAt=1683123628239",
    },
    {
        name: "Light",
        image: "https://ik.imagekit.io/zquvvhmdy/pizza_khao/light.png?updatedAt=1683123628501",
    },
    {
        name: "Piquant",
        image: "https://ik.imagekit.io/zquvvhmdy/pizza_khao/piquent.png?updatedAt=1683123629965",
    },
    {
        name: "Savory",
        image: "https://ik.imagekit.io/zquvvhmdy/pizza_khao/savory.png?updatedAt=1683123634162",
    },
    {
        name: "Sea food",
        image: "https://ik.imagekit.io/zquvvhmdy/pizza_khao/sea_food.png?updatedAt=1683123635469",
    },
    {
        name: "Sweet",
        image: "https://ik.imagekit.io/zquvvhmdy/pizza_khao/sweet.png?updatedAt=1683123636988",
    },
    {
        name: "Veggie",
        image: "https://ik.imagekit.io/zquvvhmdy/pizza_khao/veggie.png?updatedAt=1683123637513",
    },
];
export const PagesSubMenu = [
    "About Us",
    "Our Serices",
    "Our team",
    "Book a table",
    "Contact Us",
    "Get in touch",
    "Coming Soon",
];

export const SubMenu = [
    { name: "Our popular pizzas", link: "/menu" },
    { name: "Menu filter light", link: "/menu-light" },
    { name: "Resturent menu", link: "/resturent-menu" },
];

export const shopSubMenu = [
    { name: "Favourites", link: "/account/favourites" },
    { name: "My orders", link: "/my-order" },
    { name: "Cart", link: "/cart" },
    { name: "Checkout", link: "/checkout" },
    { name: "My Account", link: "/account/settings" },
    { name: "Favourites", link: "/account/favourites" },
    { name: "Manage Address", link: "/account/address" },
];

export const cheeseText = [
    "Cheesy delights: Dive into our tasty cheese pizzas",
    "Mouthwatering cheese pizzas for cheese lovers",
    "Say cheese! Enjoy our gooey cheese pizzas",
    "Indulge in the creaminess: Irresistible cheese pizzas",
];
export const veggieText = [
    "Fresh and wholesome: Discover our veggie pizzas",
    "Garden delights: Savor our nutritious veggie pizzas",
    "Veggie paradise: Delicious pizzas packed with veggies",
    "Green goodness: Try our scrumptious veggie pizzas",
];
export const piquantText = [
    "Spice up your taste buds: Explore our piquant pizzas",
    "Fiery flavors: Brave our spicy piquant pizzas",
    "Bold and Zesty: Try our adventurous piquant pizzas",
    "For heat seekers: savor our hot and spicy pizzas",
];
export const forKidsText = [
    "Kids' pizza party: fun and yummy pizzas for kids",
    "Little chefs' favorites: Pizzas for your kids",
    "Kid-approved pizzas: Tasty and colorful delights",
    "Pizza adventure for kids: Playful and delicious pizzas",
];
