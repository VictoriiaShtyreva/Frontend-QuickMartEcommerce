import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

import { newUser, singleUser, usersList } from "../mockdata/users";

export const handler = [
  //Handler for fetching all users
  http.get("https://api.escuelajs.co/api/v1/users", () => {
    return HttpResponse.json(usersList, { status: 200 });
  }),
  //Handler for fetching single user
  http.get("https://api.escuelajs.co/api/v1/users/:id", async ({ params }) => {
    const id = Number(params.id);
    const user = usersList.find((item) => item.id === id);
    return HttpResponse.json(user, { status: 200 });
  }),
  //Handler for updating user
  http.put("https://api.escuelajs.co/api/v1/users/:id", async () => {
    const user = usersList[0];
    user.name = "Jack";
    user.email = "jack@mail.com";
    return HttpResponse.json(user, { status: 200 });
  }),
  //Handler for register user
  http.post("https://api.escuelajs.co/api/v1/users", async () => {
    return HttpResponse.json(newUser, { status: 200 });
  }),
  //Handler for user with session
  http.get("https://api.escuelajs.co/api/v1/auth/profile", async () => {
    return HttpResponse.json(singleUser, { status: 200 });
  }),
  //Handler for login user
  http.post("https://api.escuelajs.co/api/v1/auth/login", async () => {
    return HttpResponse.json(
      { access_token: "12345", refresh_token: "12346" },
      { status: 200 }
    );
  }),
];

export const userServer = setupServer(...handler);
