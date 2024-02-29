import { AuthenticationToken } from "../../types/Authentication";
import { User } from "../../types/User";

export const usersList: User[] = [
  {
    id: 1,
    email: "john@mail.com",
    password: "changeme",
    name: "Jhon",
    role: "customer",
    avatar: "https://i.imgur.com/LDOO4Qs.jpg",
    creationAt: "2024-02-29T03:37:26.000Z",
    updatedAt: "2024-02-29T03:37:26.000Z",
  },
  {
    id: 2,
    email: "maria@mail.com",
    password: "12345",
    name: "Maria",
    role: "customer",
    avatar: "https://i.imgur.com/DTfowdu.jpg",
    creationAt: "2024-02-29T03:37:26.000Z",
    updatedAt: "2024-02-29T03:37:26.000Z",
  },
  {
    id: 3,
    email: "admin@mail.com",
    password: "admin123",
    name: "Admin",
    role: "admin",
    avatar: "https://i.imgur.com/yhW6Yw1.jpg",
    creationAt: "2024-02-29T03:37:26.000Z",
    updatedAt: "2024-02-29T03:37:26.000Z",
  },
  {
    id: 4,
    email: "anjelina@gmail.com",
    password: "qwerty",
    name: "anjelina jolly",
    role: "customer",
    avatar: "https://pbs.twimg.com/media/E3BIXavUcAEtTXk.jpg",
    creationAt: "2024-02-29T04:19:41.000Z",
    updatedAt: "2024-02-29T09:48:21.000Z",
  },
];

export const newUser: User = {
  id: 5,
  email: "viktoriiashtyreva@mail.com",
  password: "viktoria24",
  role: "customer",
  name: "Viktoriia Shtyreva",
  avatar: "avatar.com",
};

export const singleUser: User = {
  id: 6,
  email: "garfiled@mail.com",
  password: "garfield45",
  role: "customer",
  name: "Garfield",
  avatar: "avatar.com",
};
