import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../types/type";
import axios from "axios";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const UserPage = () => {
  // const [userForm, setUserForm] = useState();
  // form enter email + password
  // send post,https://api.escuelajs.co/api/v1/auth/login
  // body:

  //get user info
  // const user = useSelector((state: AppState) => state.users.user);
  // if (!user) {
  //   return <div>NO USER</div>;
  // }

  // //token from  local storage
  // const token = localStorage.getItem("token");

  // send token with fetch
  //  fetch("https://api.escuelajs.co/api/v1/auth/profile", {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //   },
  // });

  // // send token with axios
  // axios.post("https://api.escuelajs.co/api/v1/auth/profile", userForm, {
  //   headers: {
  //     Authorization: "Bearer {your access token}",
  //   },
  // });

  return (
    <div>
      <div>User Page</div>
      {/* <p>Name: {user.name}</p> */}
    </div>
  );
};

export default UserPage;
