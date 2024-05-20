import { Product } from "../../types/Product";

export const mockProducts: Product[] = [
  {
    id: 1,
    title: "Chic Transparent Fashion Handbag",
    price: 613,
    description:
      "Elevate your style with our Chic Transparent Fashion Handbag, perfect for showcasing your essentials with a clear, modern edge. This trendy accessory features durable acrylic construction, luxe gold-tone hardware, and an elegant chain strap. Its compact size ensures you can carry your day-to-day items with ease and sophistication.",
    images: [
      { id: "img1-1", productId: "1", url: "https://i.imgur.com/Lqaqz59.jpg" },
      { id: "img1-2", productId: "1", url: "https://i.imgur.com/uSqWK0m.jpg" },
      { id: "img1-3", productId: "1", url: "https://i.imgur.com/atWACf1.jpg" },
    ],
    category: {
      id: 5,
      name: "Miscellaneous",
      image: "https://i.imgur.com/BG8J0Fj.jpg",
    },
    inventory: 100,
  },
  {
    id: 2,
    title: "Stylish Marble Pattern Notebook",
    price: 25,
    description:
      "Make a statement with our Stylish Marble Pattern Notebook, designed to inspire creativity and organization. This sleek notebook features high-quality paper with a luxurious marble print cover, perfect for jotting down thoughts, sketches, or keeping track of your busy schedule. Whether for work, school, or personal use, this notebook is a must-have accessory for any modern individual.",
    images: [
      { id: "img1-1", productId: "2", url: "https://i.imgur.com/Lqaqz59.jpg" },
      { id: "img1-2", productId: "2", url: "https://i.imgur.com/uSqWK0m.jpg" },
      { id: "img1-3", productId: "2", url: "https://i.imgur.com/atWACf1.jpg" },
    ],
    category: {
      id: 5,
      name: "Miscellaneous",
      image: "https://i.imgur.com/7OcN6uW.jpg",
    },
    inventory: 100,
  },
  {
    id: 3,
    title: "Classic Leather Wallet",
    price: 120,
    description:
      "Crafted from premium leather, our Classic Leather Wallet combines timeless style with practicality. With multiple compartments for cards, cash, and coins, this wallet keeps your essentials organized and easily accessible. The sleek design and durable construction make it an essential accessory for everyday use.",
    images: [
      { id: "img1-1", productId: "3", url: "https://i.imgur.com/Lqaqz59.jpg" },
      { id: "img1-2", productId: "3", url: "https://i.imgur.com/uSqWK0m.jpg" },
      { id: "img1-3", productId: "3", url: "https://i.imgur.com/atWACf1.jpg" },
    ],
    category: {
      id: 5,
      name: "Miscellaneous",
      image: "https://i.imgur.com/FGqOjWY.jpg",
    },
    inventory: 100,
  },
];

export const descMockProducts: Product[] = [
  {
    id: 1,
    title: "Chic Transparent Fashion Handbag",
    price: 613,
    description:
      "Elevate your style with our Chic Transparent Fashion Handbag, perfect for showcasing your essentials with a clear, modern edge. This trendy accessory features durable acrylic construction, luxe gold-tone hardware, and an elegant chain strap. Its compact size ensures you can carry your day-to-day items with ease and sophistication.",
    images: [
      { id: "img1-1", productId: "1", url: "https://i.imgur.com/Lqaqz59.jpg" },
      { id: "img1-2", productId: "1", url: "https://i.imgur.com/uSqWK0m.jpg" },
      { id: "img1-3", productId: "1", url: "https://i.imgur.com/atWACf1.jpg" },
    ],
    category: {
      id: 5,
      name: "Miscellaneous",
      image: "https://i.imgur.com/BG8J0Fj.jpg",
    },
    inventory: 100,
  },
  {
    id: 3,
    title: "Classic Leather Wallet",
    price: 120,
    description:
      "Crafted from premium leather, our Classic Leather Wallet combines timeless style with practicality. With multiple compartments for cards, cash, and coins, this wallet keeps your essentials organized and easily accessible. The sleek design and durable construction make it an essential accessory for everyday use.",
    images: [
      { id: "img1-1", productId: "3", url: "https://i.imgur.com/Lqaqz59.jpg" },
      { id: "img1-2", productId: "3", url: "https://i.imgur.com/uSqWK0m.jpg" },
      { id: "img1-3", productId: "3", url: "https://i.imgur.com/atWACf1.jpg" },
    ],
    category: {
      id: 5,
      name: "Miscellaneous",
      image: "https://i.imgur.com/FGqOjWY.jpg",
    },
    inventory: 100,
  },
  {
    id: 2,
    title: "Stylish Marble Pattern Notebook",
    price: 25,
    description:
      "Make a statement with our Stylish Marble Pattern Notebook, designed to inspire creativity and organization. This sleek notebook features high-quality paper with a luxurious marble print cover, perfect for jotting down thoughts, sketches, or keeping track of your busy schedule. Whether for work, school, or personal use, this notebook is a must-have accessory for any modern individual.",
    images: [
      { id: "img1-1", productId: "2", url: "https://i.imgur.com/Lqaqz59.jpg" },
      { id: "img1-2", productId: "2", url: "https://i.imgur.com/uSqWK0m.jpg" },
      { id: "img1-3", productId: "2", url: "https://i.imgur.com/atWACf1.jpg" },
    ],
    category: {
      id: 5,
      name: "Miscellaneous",
      image: "https://i.imgur.com/7OcN6uW.jpg",
    },
    inventory: 100,
  },
];

export const ascMockProducts: Product[] = [
  {
    id: 2,
    title: "Stylish Marble Pattern Notebook",
    price: 25,
    description:
      "Make a statement with our Stylish Marble Pattern Notebook, designed to inspire creativity and organization. This sleek notebook features high-quality paper with a luxurious marble print cover, perfect for jotting down thoughts, sketches, or keeping track of your busy schedule. Whether for work, school, or personal use, this notebook is a must-have accessory for any modern individual.",
    images: [
      { id: "img2-1", productId: "2", url: "https://i.imgur.com/8qOr2G9.jpg" },
      { id: "img2-2", productId: "2", url: "https://i.imgur.com/rDRPb3T.jpg" },
      { id: "img2-3", productId: "2", url: "https://i.imgur.com/Ky15kXe.jpg" },
    ],
    category: {
      id: 5,
      name: "Miscellaneous",
      image: "https://i.imgur.com/7OcN6uW.jpg",
    },
    inventory: 100,
  },
  {
    id: 3,
    title: "Classic Leather Wallet",
    price: 120,
    description:
      "Crafted from premium leather, our Classic Leather Wallet combines timeless style with practicality. With multiple compartments for cards, cash, and coins, this wallet keeps your essentials organized and easily accessible. The sleek design and durable construction make it an essential accessory for everyday use.",
    images: [
      { id: "img2-1", productId: "3", url: "https://i.imgur.com/8qOr2G9.jpg" },
      { id: "img2-2", productId: "3", url: "https://i.imgur.com/rDRPb3T.jpg" },
      { id: "img2-3", productId: "3", url: "https://i.imgur.com/Ky15kXe.jpg" },
    ],
    category: {
      id: 5,
      name: "Miscellaneous",
      image: "https://i.imgur.com/FGqOjWY.jpg",
    },
    inventory: 100,
  },
  {
    id: 1,
    title: "Chic Transparent Fashion Handbag",
    price: 613,
    description:
      "Elevate your style with our Chic Transparent Fashion Handbag, perfect for showcasing your essentials with a clear, modern edge. This trendy accessory features durable acrylic construction, luxe gold-tone hardware, and an elegant chain strap. Its compact size ensures you can carry your day-to-day items with ease and sophistication.",
    images: [
      { id: "img2-1", productId: "1", url: "https://i.imgur.com/8qOr2G9.jpg" },
      { id: "img2-2", productId: "1", url: "https://i.imgur.com/rDRPb3T.jpg" },
      { id: "img2-3", productId: "1", url: "https://i.imgur.com/Ky15kXe.jpg" },
    ],
    category: {
      id: 5,
      name: "Miscellaneous",
      image: "https://i.imgur.com/BG8J0Fj.jpg",
    },
    inventory: 100,
  },
];

export const favProduct: Product = {
  id: 1,
  title: "Chic Transparent Fashion Handbag",
  price: 613,
  description:
    "Elevate your style with our Chic Transparent Fashion Handbag, perfect for showcasing your essentials with a clear, modern edge. This trendy accessory features durable acrylic construction, luxe gold-tone hardware, and an elegant chain strap. Its compact size ensures you can carry your day-to-day items with ease and sophistication.",
  images: [
    { id: "img2-1", productId: "1", url: "https://i.imgur.com/8qOr2G9.jpg" },
    { id: "img2-2", productId: "1", url: "https://i.imgur.com/rDRPb3T.jpg" },
    { id: "img2-3", productId: "1", url: "https://i.imgur.com/Ky15kXe.jpg" },
  ],
  category: {
    id: 5,
    name: "Miscellaneous",
    image: "https://i.imgur.com/BG8J0Fj.jpg",
  },
  inventory: 100,
};
