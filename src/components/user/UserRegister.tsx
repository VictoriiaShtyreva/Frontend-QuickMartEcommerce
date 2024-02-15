import React, { useState } from "react";
import { UserRegister } from "../../types/User";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState<UserRegister>({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({ ...user, [event.target.name]: event?.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Submitted user:", user);
    //send user info POST
    axios
      .post("https://api.escuelajs.co/api/v1/products", user)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          //return user data
          //save info to redux
          //   dispatch(saveUserInformation(response.data));
          //navigate user to log in
          navigate("/user-profile");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="avatar">Avatar:</label>
        <input
          type="text"
          id="avatar"
          name="avatar"
          value={user.avatar}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
