import { http, HttpResponse } from "msw";
import { mockProducts } from "./mockDataProducts";
import { NewProduct } from "../../types/Product";
import { v4 as uuidv4 } from "uuid";
import { Console } from "console";

// Utility function to convert NewProduct to the full Product type
const convertToProduct = (newProduct: NewProduct) => ({
  id: uuidv4(), // Generate a unique ID
  title: newProduct.title,
  description: newProduct.description,
  price: newProduct.price,
  category: {
    id: newProduct.categoryId,
    name: "Books",
    image: "https://picsum.photos/200/?random=2",
  },
  reviews: [],
  inventory: newProduct.inventory,
  images: [],
});

// Utility for query
const parseQueryString = (url: URL) => {
  const params = url.searchParams;
  const page = Number(params.get("page")) || 1;
  const pageSize = Number(params.get("pageSize")) || 10;
  const sortBy = params.get("sortBy") || "byTitle";
  const sortOrder = params.get("sortOrder") || "Ascending";

  return { page, pageSize, sortBy, sortOrder };
};

export const productsHandlers = [
  // Handler for fetching all products
  http.get(`${process.env.REACT_APP_API_URL}/products`, ({ request }) => {
    const parsedUrl = new URL(request.url);
    const queryOptions = parseQueryString(parsedUrl);
    const sortedProducts = [...mockProducts.items].sort((a, b) => {
      if (queryOptions.sortBy === "byTitle") {
        return queryOptions.sortOrder === "Ascending"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      return 0;
    });
    const paginatedProducts = sortedProducts.slice(
      (queryOptions.page - 1) * queryOptions.pageSize,
      queryOptions.page * queryOptions.pageSize
    );
    const response = {
      items: paginatedProducts,
      totalCount: mockProducts.totalCount,
    };
    return HttpResponse.json(response, { status: 200 });
  }),
  // Handler for fetching a single product by ID
  http.get(`${process.env.REACT_APP_API_URL}/products/:id`, ({ params }) => {
    const { id } = params;
    const product = mockProducts.items.find((p) => p.id === id);
    if (!product) return HttpResponse.json(null, { status: 404 });
    return HttpResponse.json(product, { status: 200 });
  }),
  // Handler for updating a product
  http.patch(
    `${process.env.REACT_APP_API_URL}/products/:id`,
    async ({ params, request }) => {
      const { id } = params;
      const updatedData = await request.json();
      const existingProduct = mockProducts.items.find((p) => p.id === id);
      if (!existingProduct) {
        return HttpResponse.error();
      }
      Object.assign(existingProduct, updatedData);
      return HttpResponse.json(existingProduct, { status: 200 });
    }
  ),
  // Handler for creating a new product
  http.post(
    `${process.env.REACT_APP_API_URL}/products`,
    async ({ request }) => {
      const newProduct = (await request.json()) as NewProduct;
      const product = convertToProduct(newProduct);
      mockProducts.items.push(product);
      mockProducts.totalCount += 1;
      return HttpResponse.json(product, { status: 201 });
    }
  ),
  // Handler for deleting a product
  http.delete(`${process.env.REACT_APP_API_URL}/products/:id`, ({ params }) => {
    const { id } = params;
    const index = mockProducts.items.findIndex((p) => p.id === id);
    if (index === -1) {
      return HttpResponse.error();
    }
    const deletedProduct = mockProducts.items.splice(index, 1)[0];
    mockProducts.totalCount -= 1;
    return HttpResponse.json(deletedProduct, { status: 200 });
  }),
];
