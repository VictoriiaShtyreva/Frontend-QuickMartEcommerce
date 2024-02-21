import productReducer, {
  createProduct,
  fetchAllProducts,
} from "../../redux/slices/productSlice";
import store from "../../redux/store";
import { NewProduct, Product } from "../../types/Product";
import { productServer } from "../shared/productServer";

beforeAll(() => {
  productServer.listen();
});

afterAll(() => {
  productServer.close();
});

//test for product reducer
const initialState = {
  products: [],
  loading: false,
  error: null,
};

// test suit for product reducer
describe("product reducer", () => {
  //mock data
  let mockproduct: Product[] = [
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
  //test initialState
  test("should return the initial state", () => {
    const state = productReducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });
  //test1: fullfill
  test("should return a list of products", () => {
    const state = productReducer(
      initialState,
      fetchAllProducts.fulfilled(mockproduct, "fulfilled")
    );
    expect(state).toEqual({
      products: mockproduct,
      loading: false,
      error: null,
    });
  });
  //test2: pending
  test("should set loading to true", () => {
    const state = productReducer(
      initialState,
      fetchAllProducts.pending("pending")
    );
    expect(state).toEqual({
      products: [],
      loading: true,
      error: null,
    });
  });
  //test3: rejected
  test("should set error to the rejected message", () => {
    const error = new Error("error");
    const state = productReducer(
      initialState,
      fetchAllProducts.rejected(error, "error")
    );
    expect(state).toEqual({
      products: [],
      loading: false,
      error: error.message,
    });
  });

  //test fetching asyncthunk with store dispatch
  test("should fetch all products from api", async () => {
    await store.dispatch(fetchAllProducts());
    expect(store.getState().products.products.length).toBeCalled;
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
});
