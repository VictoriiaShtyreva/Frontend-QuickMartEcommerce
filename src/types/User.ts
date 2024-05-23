import { Order } from "./Order";
import { Review } from "./Review";

export type User = {
  id: string;
  email: string;
  name: string;
  avatar: string | File;
  role: "Admin" | "Customer";
  orders: Order[];
  reviews: Review[];
};

export interface UserState {
  user: User | null;
  users: User[];
  total: number;
  loading: boolean;
  error: string | null;
  filteredUsers: User[];
}

export interface PaginatedUsers {
  items: User[];
  totalCount: number;
}

export type UserRegister = {
  email: string;
  name: string;
  password: string;
  avatar?: File;
  role: string;
};

export type RegistrationFormData = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};
