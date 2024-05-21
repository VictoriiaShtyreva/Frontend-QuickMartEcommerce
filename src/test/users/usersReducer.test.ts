import {
  fetchUserById,
  getAllUsers,
  loginUser,
  logout,
  registerUser,
  saveUserInformation,
  updateUser,
} from "../../redux/slices/usersSlice";
import { createNewStore } from "../../redux/store";
// import { newUser, singleUser } from "../mockdata/users";
import { userServer } from "../shared/userServer";

let store = createNewStore();

beforeAll(() => {
  userServer.listen();
});

afterAll(() => {
  userServer.close();
});

beforeEach(() => {
  store = createNewStore();
});

describe("user reducer", () => {
  //test for fetch all data of users
  // test("should fetch all users from api", async () => {
  //   await store.dispatch(getAllUsers());
  //   expect(store.getState().users.users.length).toBe(4);
  //   expect(store.getState().users.error).toBeNull();
  //   expect(store.getState().users.loading).toBeFalsy();
  // });
  //test for fetch single user
  test("should fetch single user from api", async () => {
    const dispatchedAction = await store.dispatch(fetchUserById("2"));
    const expectedAction = {
      type: "fetchUserById/fulfilled",
      payload: {
        data: {
          id: "2",
          email: "maria@mail.com",
          password: "12345",
          name: "Maria",
          role: "customer",
          avatar: "https://i.imgur.com/DTfowdu.jpg",
          creationAt: "2024-02-29T03:37:26.000Z",
          updatedAt: "2024-02-29T03:37:26.000Z",
        },
        id: 2,
      },
      meta: {
        arg: 2,
        requestId: expect.any(String),
        requestStatus: "fulfilled",
      },
    };
    expect(dispatchedAction).toEqual(expectedAction);
    expect(store.getState().users.error).toBeNull();
    expect(store.getState().users.loading).toBeFalsy();
  });
  //test for updating user
  //test for register user
  // test("should register a new user", async () => {
  //   await store.dispatch(registerUser(newUser));
  //   expect(store.getState().users.users.length).toBe(1);
  // });
  //test for login user
  test("should login a user", async () => {
    await store.dispatch(
      loginUser({ email: "garfiled@mail.com", password: "garfield45" })
    );
    expect(store.getState().users.user?.email).toBe("garfiled@mail.com");
  });
});
