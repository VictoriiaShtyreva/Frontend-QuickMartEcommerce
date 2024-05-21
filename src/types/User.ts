export type UserRegister = {
  email: string;
  name: string;
  password: string;
  avatar: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  avatar: string;
  password: string;
  role: "admin" | "customer";
};

export type UserInitialState = {
  user: User | null;
  users: User[];
  loading: boolean;
  error: string | null;
};

export type RegistrationFormData = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};
