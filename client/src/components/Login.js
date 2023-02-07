import React from "react";
import { useForm } from "react-hook-form";

import "../css/Login.css";
import axios from "axios";
const Login = () => {
  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    login(data);

    reset();
  };

  //logging in function
  const login = async (data) => {
    await axios
      .post(`/api/users/login`, {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        console.log(res);
        setInterval(window.location.reload(), 3000);
      })
      .catch((err) => {
        // Handle error
        console.log(err);
        alert(err.response.data.message);
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-4 col-md-3 col-sm-2"></div>
        <div className="col-lg-4 col-md-6 col-sm-8 p-4 login_form_container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="login_heading">LOGIN</h2>

            <input
              placeholder="Email"
              className="form-control"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="validation_error">*Email is required</span>
            )}
            <hr />
            <input
              placeholder="Password"
              className="form-control"
              type="password"
              {...register("password", { required: true })}
            />

            {errors.password && (
              <span className="validation_error">*Password is required</span>
            )}
            <hr />

            <button className="form-control btn btn-info mb-4" type="submit">
              Login
            </button>
          </form>
        </div>
        <div className="col-lg-4 col-md-3 col-sm-2"></div>
      </div>
    </div>
  );
};
export default Login;
