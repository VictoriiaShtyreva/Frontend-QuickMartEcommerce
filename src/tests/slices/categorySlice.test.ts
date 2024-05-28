import { createNewStore } from "../../redux/store";
import {
  fetchAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  fetchProductsByCategory,
} from "../../redux/slices/categorySlice";

import { QueryOptions } from "../../types/QueryOptions";
import mockAxios from "../mocks/mockAxios";
import { mockDataCategories } from "../mocks/mockDataCategories";

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

describe("categorySlice", () => {
  test("should handle fetchAllCategories", async () => {
    const queryOptions = {
      page: 1,
      pageSize: 12,
      sortBy: "name",
      sortOrder: "asc",
    };
    const queryString = createQueryString(queryOptions);
    const expectedUrl = `${process.env.REACT_APP_API_URL}/categories?${queryString}`;

    mockAxios.onGet(expectedUrl).reply(200, {
      items: mockDataCategories.items,
      totalCount: mockDataCategories.totalCount,
    });

    await store.dispatch(fetchAllCategories(queryOptions));
    const state = store.getState().categories;
    expect(state.categories).toHaveLength(mockDataCategories.items.length);
    expect(state.categories[0].name).toBe("Books");
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  test("should handle createCategory", async () => {
    const newCategory = {
      name: "Sports",
      image: new File([""], "sports.png", { type: "image/png" }),
    };

    mockAxios
      .onPost(`${process.env.REACT_APP_API_URL}/categories`)
      .reply((config) => {
        const formData = new FormData();
        config.data.forEach((value: any, key: string) => {
          formData.append(key, value);
        });

        const category = {
          id: "mock-id",
          name: formData.get("name") as string,
          image: "https://picsum.photos/200/?random=999",
        };

        mockDataCategories.items.push(category);
        mockDataCategories.totalCount += 1;
        return [201, category];
      });

    await store.dispatch(createCategory(newCategory));
    const state = store.getState().categories;
    expect(state.categories).toHaveLength(mockDataCategories.items.length);
    expect(state.categories[state.categories.length - 1].name).toBe("Sports");
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  test("should handle updateCategory", async () => {
    const updatedCategory = {
      id: "dc1fbe5d-27b2-4fdb-8623-61658d329b77",
      updateData: {
        name: "Updated Books",
        image: new File([""], "updated_books.png", { type: "image/png" }),
      },
    };

    mockAxios
      .onPatch(
        `${process.env.REACT_APP_API_URL}/categories/${updatedCategory.id}`
      )
      .reply(200, {
        ...mockDataCategories.items[0],
        ...updatedCategory.updateData,
      });

    await store.dispatch(updateCategory(updatedCategory));
    const state = store.getState().categories;
    expect(
      state.categories.find(
        (category) => category.id === "dc1fbe5d-27b2-4fdb-8623-61658d329b77"
      )?.name
    ).toBe("Updated Books");
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  test("should handle fetchProductsByCategory", async () => {
    const categoryId = "dc1fbe5d-27b2-4fdb-8623-61658d329b77";
    const mockProducts = {
      items: [
        {
          id: "74ed7fc9-908e-496e-83e2-c875b2480efa",
          title: "Books Product 1",
          description: "Description for Books Product 1",
          price: 1000,
          category: { id: categoryId, name: "Books" },
          inventory: 100,
          images: [],
        },
        {
          id: "98efdf45-979a-45cc-a810-63949bb89146",
          title: "Books Product 10",
          description: "Description for Books Product 10",
          price: 700,
          category: { id: categoryId, name: "Books" },
          inventory: 50,
          images: [],
        },
      ],
      totalCount: 2,
    };

    mockAxios
      .onGet(
        `${process.env.REACT_APP_API_URL}/categories/${categoryId}/products`
      )
      .reply(200, mockProducts.items);

    await store.dispatch(fetchProductsByCategory(categoryId));
    const state = store.getState().categories;
    expect(state.productsByCategory).toHaveLength(mockProducts.items.length);
    expect(state.productsByCategory[0].title).toBe("Books Product 1");
    expect(state.productsByCategory[1].title).toBe("Books Product 10");
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  test("should handle deleteCategory", async () => {
    store = createNewStore();
    const categoryIdToDelete = "dc1fbe5d-27b2-4fdb-8623-61658d329b77";
    mockAxios
      .onDelete(
        `${process.env.REACT_APP_API_URL}/categories/${categoryIdToDelete}`
      )
      .reply(200);

    await store.dispatch(deleteCategory(categoryIdToDelete));
    const state = store.getState().categories;
    expect(
      state.categories.some((category) => category.id === categoryIdToDelete)
    ).toBe(false);
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });
});
