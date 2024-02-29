import { fetchAllCategories } from "../../redux/slices/categorySlice";
import { createNewStore } from "../../redux/store";
import { categoryServer } from "../shared/categoryServer";

let store = createNewStore();

beforeAll(() => {
  categoryServer.listen();
});

afterAll(() => {
  categoryServer.close();
});

beforeEach(() => {
  store = createNewStore();
});

describe("category reducer", () => {
  //test for fetch all data of products
  test("should fetch all categories from api", async () => {
    await store.dispatch(fetchAllCategories());
    expect(store.getState().categories.categories.length).toBe(5);
    expect(store.getState().categories.error).toBeNull();
    expect(store.getState().categories.loading).toBeFalsy();
  });
});
