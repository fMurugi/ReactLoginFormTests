import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = ({onSubmit}) => {

  // const [users, setUsers] = useState([
  //   { username: "user1", password: "123456Your@" },
  //   { username: "user2", password: "password2786@$Ron" },
  //   { username: "user3", password: "password399#Fint" },
  // ]);

  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Username is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
    // onSubmit: (values) => {
    //   const user = users.find((user) => user.username === values.username && user.password === values.password);
    //   if (user) {
    //     onSubmit(values);
    //   } else {
    //     formik.setFieldError("username", "Invalid username or password");
    //   }
    // },
  });

  
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1>Login</h1>
      <label htmlFor="username">Username *</label>
      <input
        id="username"
        name="username"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.username}
      />
      {formik.errors.username ? (
        <div id ="errMessage">{formik.errors.username}</div>
      ) : null}

      <label htmlFor="password">Password *</label>
     
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {formik.errors.password ? (
        <div id ="errMessage">{formik.errors.password}</div>
      ) : null}

      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
