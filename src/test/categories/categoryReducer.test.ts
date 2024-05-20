import { fetchAllCategories } from "../../redux/slices/categorySlice";
import { createNewStore } from "../../redux/store";
import { QueryOptions } from "../../types/QueryOptions";
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
  const queryOptions: QueryOptions = {
    page: 1,
    pageSize: 10,
    sortBy: "byPrice",
    sortOrder: "Ascending",
  };
  //test for fetch all data of products
  test("should fetch all categories from api", async () => {
    await store.dispatch(fetchAllCategories(queryOptions));
    expect(store.getState().categories.categories.length).toBe(5);
    expect(store.getState().categories.error).toBeNull();
    expect(store.getState().categories.loading).toBeFalsy();
  });
});
