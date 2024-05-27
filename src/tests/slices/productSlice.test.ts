import { createNewStore } from "../../redux/store";
import {
  fetchAllProducts,
  createProduct,
  fetchProductById,
  updateProduct,
  deleteProduct,
} from "../../redux/slices/productSlice";
import { mockServer } from "../mocks/server";
import { mockProducts } from "../mocks/mockDataProducts";

let store = createNewStore();

beforeAll(() => {
  mockServer.listen();
});

beforeEach(() => {
  store = createNewStore();
});

afterEach(() => {
  mockServer.resetHandlers();
});

afterAll(() => {
  mockServer.close();
});

describe("productSlice", () => {
  test("should handle fetchAllProducts", async () => {
    const queryOptions = {
      page: 1,
      pageSize: 12,
      sortBy: "byTitle",
      sortOrder: "Ascending",
    };
    await store.dispatch(fetchAllProducts(queryOptions));
    const state = store.getState().products;
    console.log("state after fetchAllProducts:", state);
    expect(state.products).toHaveLength(3);
    expect(state.products[0].title).toBe("Books Product 1");
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  test("should handle createProduct", async () => {
    const newProduct = {
      id: "3",
      title: "Another Product",
      price: 300,
      description: "Another Description",
      categoryId: "3",
      inventory: 30,
      images: [],
    };
    const result = await store.dispatch(createProduct(newProduct));
    console.log(result);
    const state = store.getState().products;
    console.log("state after createProduct:", state);
    expect(state.products).toHaveLength(4);
    expect(state.products[3].title).toBe("Another Product");
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  test("should handle fetchProductById", async () => {
    const result = await store.dispatch(
      fetchProductById("74ed7fc9-908e-496e-83e2-c875b2480efa")
    );
    console.log(result);
    const state = store.getState().products;
    console.log("state after fetchProductById:", state);

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

    const result = await store.dispatch(updateProduct(updatedProduct));
    console.log(result);
    const state = store.getState().products;
    console.log("state after updateProduct:", state);

    expect(
      state.products.find(
        (p) => p.id === "74ed7fc9-908e-496e-83e2-c875b2480efa"
      )?.title
    ).toBe("Updated Product 1");
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  test("should handle deleteProduct", async () => {
    await store.dispatch(deleteProduct("74ed7fc9-908e-496e-83e2-c875b2480efa"));
    const state = store.getState().products;
    expect(
      state.products.some(
        (product) => product.id === "74ed7fc9-908e-496e-83e2-c875b2480efa"
      )
    ).toBe(false);
  });
});
