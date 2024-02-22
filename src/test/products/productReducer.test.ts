import {
  createProduct,
  deleteProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
} from "../../redux/slices/productSlice";
import { createNewStore } from "../../redux/store";
import { NewProduct } from "../../types/Product";
import { productServer } from "../shared/productServer";

let store = createNewStore();

beforeAll(() => {
  productServer.listen();
});

afterAll(() => {
  productServer.close();
});

beforeEach(() => {
  store = createNewStore();
});

describe("product reducer", () => {
  //test fetching asyncthunk with store dispatch
  test("should fetch all products from api", async () => {
    await store.dispatch(fetchAllProducts());
    expect(store.getState().products.products.length).toBe(2);
    expect(store.getState().products.error).toBeNull();
    expect(store.getState().products.loading).toBeFalsy();
  });
  //create new product
  test("should create a new product", async () => {
    const newProduct: NewProduct = {
      title: "Test1",
      price: 45,
      description: "description for T-short",
      images: ["1.png"],
      categoryId: 1,
    };
    await store.dispatch(createProduct(newProduct));
    expect(store.getState().products.products.length).toBe(1);
  });
  //test for fetching single product by id
  test("should fetch a single product by id", async () => {
    const id = 1;
    // Dispatch the action to fetch the product
    const dispatchedAction = await store.dispatch(fetchProductById(id));
    const expectedAction = {
      type: "fetchProductById/fulfilled",
      payload: {
        data: {
          id: 1,
          title: "product1",
          price: 34,
          description: "description for product1",
          images: ["img1", "img2"],
          category: { id: 1, name: "category1", image: "img1" },
        },
        id: 1,
      },
      meta: {
        arg: 1,
        requestId: expect.any(String),
        requestStatus: "fulfilled",
      },
    };
    expect(dispatchedAction).toEqual(expectedAction);
    expect(store.getState().products.error).toBeNull();
    expect(store.getState().products.loading).toBeFalsy();
  });
  //test for updating product
  test("should update a product", async () => {
    const updates = {
      id: 1,
      data: {
        title: "updated product",
      },
    };
    const dispatchedAction = await store.dispatch(updateProduct(updates));
    const expectedAction = {
      type: "updateProduct/fulfilled",
      payload: {
        id: 1,
        title: "updated product",
        price: 34,
        description: "description for product1",
        images: ["img1", "img2"],
        category: { id: 1, name: "category1", image: "img1" },
      },
      meta: {
        arg: { id: 1, data: { title: "updated product" } },
        requestId: expect.any(String),
        requestStatus: "fulfilled",
      },
    };
    expect(dispatchedAction).toEqual(expectedAction);
    expect(store.getState().products.error).toBeNull();
    expect(store.getState().products.loading).toBeFalsy();
  });
});
