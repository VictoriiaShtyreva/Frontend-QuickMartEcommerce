import productReducer, {
  fetchAllProducts,
} from "../../redux/slices/productSlice";
import { Product } from "../../types/Product";

//test for product reducer
const initialState = {
  products: [],
  loading: false,
  error: "",
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
      error: "",
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
});
