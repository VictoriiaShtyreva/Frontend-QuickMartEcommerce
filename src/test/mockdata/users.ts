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
  },
  {
    id: 2,
    email: "maria@mail.com",
    password: "12345",
    name: "Maria",
    role: "customer",
    avatar: "https://i.imgur.com/DTfowdu.jpg",
  },
  {
    id: 3,
    email: "admin@mail.com",
    password: "admin123",
    name: "Admin",
    role: "admin",
    avatar: "https://i.imgur.com/yhW6Yw1.jpg",
  },
  {
    id: 4,
    email: "anjelina@gmail.com",
    password: "qwerty",
    name: "anjelina jolly",
    role: "customer",
    avatar: "https://pbs.twimg.com/media/E3BIXavUcAEtTXk.jpg",
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
