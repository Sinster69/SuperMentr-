import iphone from "../assets/images/iphone.jpg";
import tshirt from "../assets/images/tshirt.jpg";
import laptop from "../assets/images/laptop.jpg";
import shoes from "../assets/images/shoes.jpg";

const products = [
  {
    id: 1,
    name: "iPhone",
    category: "Electronics",
    price: 800,
    rating: 4.5,
    image: iphone
  },
  {
    id: 2,
    name: "T-Shirt",
    category: "Clothing",
    price: 20,
    rating: 4.2,
    image: tshirt
  },
  {
    id: 3,
    name: "Laptop",
    category: "Electronics",
    price: 1200,
    rating: 4.8,
    image: laptop
  },
  {
    id: 4,
    name: "Shoes",
    category: "Clothing",
    price: 60,
    rating: 4.3,
    image: shoes
  }
];

export default products;