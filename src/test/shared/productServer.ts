import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

import { NewProduct, Product } from "../../types/Product";
import { mockProducts } from "../mockdata/products";

export const handler = [
  //Handler for fetching all products
  http.get("https://api.escuelajs.co/api/v1/products", () => {
    return HttpResponse.json(mockProducts, { status: 200 });
  }),
  //Handler for creating a new product
  http.post("https://api.escuelajs.co/api/v1/products", async ({ request }) => {
    const product = (await request.json()) as NewProduct;
    const createdProduct: Product = {
      ...product,
      id: 4,
      category: {
        id: 2,
        name: "Electronics",
        image: "https://i.imgur.com/ZANVnHE.jpeg",
      },
    };
    return HttpResponse.json(createdProduct, { status: 201 });
  }),
  //Handler for fetching a single product by id
  http.get(
    "https://api.escuelajs.co/api/v1/products/:id",
    async ({ params }) => {
      const id = Number(params.id);
      const product = mockProducts.find((item) => item.id === id);
      return HttpResponse.json(product, { status: 200 });
    }
  ),
  //Handler for updating a product
  http.put("https://api.escuelajs.co/api/v1/products/:id", async () => {
    const product = mockProducts[1];
    product.title = "Stylish Notebook";
    return HttpResponse.json(product, { status: 200 });
  }),
  //Handler for for delete product
  http.delete(
    "https://api.escuelajs.co/api/v1/products/:id",
    async ({ params }) => {
      const id = Number(params.id);
      const product = mockProducts.filter((item) => item.id !== id);
      if (!product) {
        return new HttpResponse(null, { status: 404 });
      }
      mockProducts.splice(0, 1);
      return HttpResponse.json(true, { status: 200 });
    }
  ),
];

export const productServer = setupServer(...handler);
