import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setUsername }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { username: user, password }
      );
      if (response.data.success) {
        localStorage.setItem("username", user);
        setUsername(user);
        navigate("/");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Error logging in");
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center mt-40">
      <form
        className="flex flex-col gap-10 w-3/4 md:w-2/3 lg:w-1/3 border-2 p-4 md:p-8 border-black dark:border-red-500 border-r-8 border-b-8 "
        onSubmit={handleLogin}
      >
        <h1 className="font-bold m-auto font-ten text-4xl dark:text-white ">
          LOGIN
        </h1>

        <div className="flex flex-col gap-2">
          <label className="label-custom">Username</label>
          <input
            className="input-custom "
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Username"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="label-custom">Password</label>
          <input
            className="input-custom "
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        <button className="btn-custom" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
