import { createNewStore } from "../../redux/store";
import {
  fetchAllProducts,
  createProduct,
  fetchProductById,
  updateProduct,
  deleteProduct,
} from "../../redux/slices/productSlice";
import { mockProducts } from "../mocks/mockDataProducts";
import mockAxios from "../mocks/mock";
import { QueryOptions } from "../../types/QueryOptions";

// Queries
const createQueryString = (options: QueryOptions) => {
  const params = new URLSearchParams();
  params.append("page", options.page.toString());
  params.append("pageSize", options.pageSize.toString());
  params.append("sortBy", options.sortBy);
  params.append("sortOrder", options.sortOrder);
  return params.toString();
};

let store = createNewStore();

beforeEach(() => {
  mockAxios.reset();
});

describe("productSlice", () => {
  test("should handle fetchAllProducts", async () => {
    const queryOptions = {
      page: 1,
      pageSize: 12,
      sortBy: "byTitle",
      sortOrder: "Ascending",
    };
    const queryString = createQueryString(queryOptions);
    const expectedUrl = `${process.env.REACT_APP_API_URL}/products?${queryString}`;

    mockAxios.onGet(expectedUrl).reply(200, {
      items: mockProducts.items,
      totalCount: mockProducts.totalCount,
    });

    await store.dispatch(fetchAllProducts(queryOptions));
    const state = store.getState().products;
    expect(state.products).toHaveLength(mockProducts.items.length);
    expect(state.products[0].title).toBe("Books Product 1");
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  test("should handle createProduct", async () => {
    const newProduct = {
      title: "Another Product",
      price: 300,
      description: "Another Description",
      categoryId: "3",
      inventory: 30,
      images: [],
    };

    // Mock the POST request for creating a product
    mockAxios
      .onPost(`${process.env.REACT_APP_API_URL}/products`)
      .reply((config) => {
        const data = new URLSearchParams(config.data);
        const product = {
          id: "mock-id",
          title: data.get("title") || "",
          price: parseFloat(data.get("price") || "0"),
          description: data.get("description") || "",
          category: {
            id: data.get("categoryId") || "",
            name: "Books",
            image: "https://picsum.photos/200/?random=2",
          },
          reviews: [],
          inventory: parseInt(data.get("inventory") || "0", 10),
          images: [],
        };
        mockProducts.items.push(product);
        mockProducts.totalCount += 1;
        return [201, product];
      });

    await store.dispatch(createProduct(newProduct));
    const state = store.getState().products;
    expect(state.products).toHaveLength(mockProducts.items.length);
    expect(state.products[state.products.length - 1].title).toBe(
      "Another Product"
    );
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  test("should handle fetchProductById", async () => {
    mockAxios
      .onGet(
        `${process.env.REACT_APP_API_URL}/products/74ed7fc9-908e-496e-83e2-c875b2480efa`
      )
      .reply(200, mockProducts.items[0]);

    await store.dispatch(
      fetchProductById("74ed7fc9-908e-496e-83e2-c875b2480efa")
    );
    const state = store.getState().products;
    expect(state.product).toBeDefined();
    expect(state.product?.title).toBe("Books Product 1");
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  test("should handle updateProduct", async () => {
    const updatedProduct = {
      id: "74ed7fc9-908e-496e-83e2-c875b2480efa",
      data: {
        title: "Updated Product 1",
        price: 150,
        description: "Updated Description 1",
        categoryId: "1",
        inventory: 15,
      },
      images: [],
    };

    mockAxios
      .onPatch(
        `${process.env.REACT_APP_API_URL}/products/74ed7fc9-908e-496e-83e2-c875b2480efa`
      )
      .reply(200, {
        ...mockProducts.items[0],
        ...updatedProduct.data,
      });

    await store.dispatch(updateProduct(updatedProduct));
    const state = store.getState().products;
    expect(
      state.products.find(
        (p) => p.id === "74ed7fc9-908e-496e-83e2-c875b2480efa"
      )?.title
    ).toBe("Updated Product 1");
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  test("should handle deleteProduct", async () => {
    store = createNewStore();
    mockAxios
      .onDelete(
        `${process.env.REACT_APP_API_URL}/products/74ed7fc9-908e-496e-83e2-c875b2480efa`
      )
      .reply(200);
    await store.dispatch(deleteProduct("74ed7fc9-908e-496e-83e2-c875b2480efa"));
    const state = store.getState().products;
    expect(
      state.products.some(
        (product) => product.id === "74ed7fc9-908e-496e-83e2-c875b2480efa"
      )
    ).toBe(false);
  });
});
