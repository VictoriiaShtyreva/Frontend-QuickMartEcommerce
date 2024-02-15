export type UserRegister = {
  email: string;
  name: string;
  password: string;
  avatar: string;
};

export type User = UserRegister & {
  role: "admin" | "customer";
  id: number;
};
