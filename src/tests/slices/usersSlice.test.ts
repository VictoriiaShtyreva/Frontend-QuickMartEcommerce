import { createNewStore } from "../../redux/store";
import {
  getAllUsers,
  fetchUserById,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  authenticateUser,
} from "../../redux/slices/usersSlice";
import { mockDataUsers } from "../mocks/mockDataUsers";
import { QueryOptions } from "../../types/QueryOptions";
import mockAxios from "../mocks/mockAxios";

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

describe("usersSlice", () => {
  test("should handle getAllUsers", async () => {
    const queryOptions = {
      page: 1,
      pageSize: 10,
      sortBy: "name",
      sortOrder: "asc",
    };
    const queryString = createQueryString(queryOptions);
    const expectedUrl = `${process.env.REACT_APP_API_URL}/users?${queryString}`;

    mockAxios.onGet(expectedUrl).reply(200, {
      items: mockDataUsers.items,
      totalCount: mockDataUsers.totalCount,
    });

    await store.dispatch(getAllUsers(queryOptions));
    const state = store.getState().users;
    expect(state.users).toHaveLength(mockDataUsers.items.length);
    expect(state.users[0].name).toBe("Bob");
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  test("should handle fetchUserById", async () => {
    const userId = "5a7452f2-f55e-4b8f-9509-956e923549df";
    mockAxios
      .onGet(`${process.env.REACT_APP_API_URL}/users/${userId}`)
      .reply(200, mockDataUsers.items[0]);

    await store.dispatch(fetchUserById(userId));
    const state = store.getState().users;
    expect(state.user).toBeDefined();
    expect(state.user?.name).toBe("Bob");
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  test("should handle updateUser", async () => {
    const updatedUser = {
      id: "5a7452f2-f55e-4b8f-9509-956e923549df",
      name: "Updated Bob",
      email: "updated_bob@example.com",
    };

    mockAxios
      .onPatch(`${process.env.REACT_APP_API_URL}/users/${updatedUser.id}`)
      .reply(200, {
        ...mockDataUsers.items[0],
        ...updatedUser,
      });

    await store.dispatch(updateUser(updatedUser));
    const state = store.getState().users;
    expect(state.users.find((user) => user.id === updatedUser.id)?.name).toBe(
      "Updated Bob"
    );
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  test("should handle registerUser", async () => {
    const newUser = {
      name: "Alice",
      email: "alice@example.com",
      password: "password123",
      avatar: new File([""], "avatar.png", { type: "image/png" }),
      role: "Customer",
    };

    mockAxios
      .onPost(`${process.env.REACT_APP_API_URL}/users`)
      .reply((config) => {
        const data = new URLSearchParams(config.data);
        const user = {
          id: "mock-id",
          name: data.get("name") as string,
          email: data.get("email") as string,
          role: "Customer",
          avatar: "https://picsum.photos/200/?random=424",
          orders: [],
          reviews: [],
        };
        mockDataUsers.items.push(user);
        mockDataUsers.totalCount += 1;
        return [201, user];
      });

    await store.dispatch(registerUser(newUser));
    const state = store.getState().users;
    expect(state.users).toHaveLength(mockDataUsers.items.length);
    expect(state.users[state.users.length - 1].name).toBe("Alice");
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  test("should handle deleteUser", async () => {
    const userId = "5a7452f2-f55e-4b8f-9509-956e923549df";
    mockAxios
      .onDelete(`${process.env.REACT_APP_API_URL}/users/${userId}`)
      .reply(200);

    await store.dispatch(deleteUser(userId));
    const state = store.getState().users;
    expect(state.users.some((user) => user.id === userId)).toBe(false);
  });

  test("should handle loginUser", async () => {
    const credentials = { email: "bob@example.com", password: "password123" };
    const token = "mock-token";
    const user = mockDataUsers.items[0];

    mockAxios
      .onPost(`${process.env.REACT_APP_API_URL}/auth/login`)
      .reply(200, token);
    mockAxios
      .onGet(`${process.env.REACT_APP_API_URL}/auth/authenticate`)
      .reply(200, user);

    await store.dispatch(loginUser(credentials));
    const state = store.getState().users;
    expect(state.user).toBeDefined();
    expect(state.user?.name).toBe("Bob");
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  test("should handle authenticateUser", async () => {
    const token = "mock-token";
    const user = mockDataUsers.items[0];

    localStorage.setItem("token", token);
    mockAxios
      .onGet(`${process.env.REACT_APP_API_URL}/auth/authenticate`)
      .reply(200, user);

    await store.dispatch(authenticateUser());
    const state = store.getState().users;
    expect(state.user).toBeDefined();
    expect(state.user?.name).toBe("Bob");
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });
});
