import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { NewProduct, Product } from "../../types/Product";
import { request } from "undici";

const mockproducts: Product[] = [
  {
    id: 1,
    title: "product1",
    price: 34,
    description: "description for product1",
    images: ["img1", "img2"],
    category: { id: 1, name: "category1", image: "img1" },
  },
  {
    id: 2,
    title: "product2",
    price: 67,
    description: "description for product2",
    images: ["img1", "img2"],
    category: { id: 2, name: "category2", image: "img2" },
  },
];

export const handler = [
  http.get("https://api.escuelajs.co/api/v1/products", () => {
    return HttpResponse.json(mockproducts, { status: 200 });
  }),
  http.post("https://api.escuelajs.co/api/v1/products/", () => {
    return HttpResponse.json({}, { status: 200 });
  }),
];

export const productServer = setupServer(...handler);
