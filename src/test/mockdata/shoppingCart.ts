import { ShoppingCartItem } from "../../types/ShoppingCart";

export const shoppingItem: ShoppingCartItem = {
  id: 1,
  title: "Chic Transparent Fashion Handbag",
  price: 613,
  description:
    "Elevate your style with our Chic Transparent Fashion Handbag, perfect for showcasing your essentials with a clear, modern edge. This trendy accessory features durable acrylic construction, luxe gold-tone hardware, and an elegant chain strap. Its compact size ensures you can carry your day-to-day items with ease and sophistication.",
  images: [
    "https://i.imgur.com/Lqaqz59.jpg",
    "https://i.imgur.com/uSqWK0m.jpg",
    "https://i.imgur.com/atWACf1.jpg",
  ],
  creationAt: "2024-02-29T03:37:26.000Z",
  updatedAt: "2024-02-29T08:18:20.000Z",
  category: {
    id: 5,
    name: "Miscellaneous",
    image: "https://i.imgur.com/BG8J0Fj.jpg",
    creationAt: "2024-02-29T03:37:26.000Z",
    updatedAt: "2024-02-29T03:37:26.000Z",
  },
  quantity: 1,
};
