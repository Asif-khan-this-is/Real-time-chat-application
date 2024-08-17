import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import image from "../../assets/profile.jpeg";

const Form = ({ isSignin = false }) => {
  const [data, setData] = useState({
    ...(!isSignin && {
      fullName: "",
    }),
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    console.log("data : >>", data);
    e.preventDefault();
    const res = await fetch(
      `http://localhost:8000/api/${isSignin ? "login" : "register"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (res.status == 400) {
      alert("Invalid Credentials");
    } else {
      const resData = await res.json();
      if (resData.token) {
        localStorage.setItem("user:token", resData.token);
        localStorage.setItem("user:detail", JSON.stringify(resData.user));
        navigate("/");
      }
    }
  };

  return (
    <div className="form-container flex items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl flex bg-white rounded-xl shadow-lg">
        <div className="w-1/3 flex flex-col items-center justify-center p-8 border-r">
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-32 h-32 overflow-hidden rounded-full mb-4 border-4 border-indigo-500 shadow-lg">
              <img
                src={image}
                className="w-full h-full object-cover"
                alt="Profile"
              />
            </div>

            <div className="text-center mb-4">
              <button className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Edit Profile
              </button>
            </div>

            <div className="text-center text-gray-600 text-sm">
              <span>
                You can edit your profile or upload a new one in (jpg or png)
              </span>
            </div>
          </div>
        </div>
        <div className="w-2/3 p-8 flex flex-col items-center justify-center">
          <div className="text-2xl font-extrabold mb-4">
            {isSignin ? "Welcome Back" : "Welcome"}
          </div>
          <div className="text-lg font-light mb-10 text-center">
            {isSignin
              ? "Login to explore more"
              : "Ready to explore? Create your account"}
          </div>
          <form
            className="flex flex-col w-full"
            onSubmit={(e) => handleSubmit(e)}
          >
            {!isSignin && (
              <Input
                label="Full Name"
                name="name"
                placeholder="Enter Your Name"
                value={data.fullName}
                onChange={(e) => setData({ ...data, fullName: e.target.value })}
                className="mx-20 mb-3 w-[400px] h-14"
              />
            )}
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter Your email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="mx-20 mb-3 w-[400px] h-14"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter Your Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="mx-20 mb-3 w-[400px] h-14"
            />
            <Button
              className="w-[600px] max-w-xs mx-[100px] my-4 h-13 "
              type="submit"
              label={isSignin ? "Sign in" : "Sign up"}
            />
          </form>
          <div className="mt-2 text-center mr-4">
            {isSignin ? "Don't have an account?" : "Already have an account?"}
            <span
              className="text-primary cursor-pointer underline ml-2"
              onClick={() =>
                navigate(`/users${isSignin ? "/sign_up" : "/sign_in"}`)
              }
            >
              {isSignin ? "Sign up" : "Sign in"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
