export type UserRegister = {
  email?: string;
  name?: string;
  password?: string;
  avatar?: string;
};

export type User = UserRegister & {
  role?: "admin" | "customer";
  id: number;
  creationAt?: string;
  updatedAt?: string;
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
};
