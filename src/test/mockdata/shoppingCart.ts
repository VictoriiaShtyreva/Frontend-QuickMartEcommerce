import { ShoppingCartItem } from "../../types/ShoppingCart";

export const shoppingItem: ShoppingCartItem = {
  id: "1",
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
    id: "5",
    name: "Miscellaneous",
    image: "https://i.imgur.com/BG8J0Fj.jpg",
  },
  quantity: 1,
  inventory: 100,
};
