import { Grid, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import ButtonComponent from "../../components/atoms/ButtonComponent";
import InputComponent from "../../components/atoms/InputComponent";
import { Link } from "react-router-dom";
import "../../styles/fonts.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [emailValid, setEmailValid] = useState("");
  const [passwordValid, setPasswordValid] = useState("");
  const [allDetails, setAllDetails] = useState({
    emailId: "",
    password: "",
  });
  console.log("all details", allDetails);

  let navigate = useNavigate();
  const getData = (e) => {
    e.preventDefault();
    console.log("e.target.name---", e.target.name);
    setAllDetails({
      ...allDetails,
      [e.target.name]: e.target.value,
    });
  };

  // const emailHandler = (e)=>{
  //     e.preventDefault();
  //     setEmail(e.target.value)

  // };

  // const passwordHandler = (e)=>{
  //     e.preventDefault();
  //     setPassword(e.target.value);

  // };

  // const formHandler = ()=>{
  //        console.log(email,password);
  //        setEmail("");
  //        setPassword("")
  // }

  const emailIdValidation = () => {
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+(\.\w{2,3})$/;
    if (allDetails.emailId) {
      if (emailRegex.test(allDetails.emailId)) {
        setEmailValid("");
        return true;
      } else {
        setEmailValid("Invalid Email");
      }
    } else {
      setEmailValid("* EmailID Required");
    }
  };

  const passwordValidation = () => {
    const passRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
    if (allDetails.password) {
      if (passRegex.test(allDetails.password)) {
        setPasswordValid("");
        return true;
      } else {
        setPasswordValid("Invalid Password");
      }
    } else {
      setPasswordValid("*Password Required");
    }
  };

  const submitData = async () => {
    emailIdValidation();
    passwordValidation();
    if (emailIdValidation() && passwordValidation()){
      try {
        const data = await axios.post(
          "http://localhost:5000/api/login",
           allDetails
        );
        console.log(data);
        setAllDetails({
          emailId: "",
          password: "",
        });
        navigate("/home"); 
      } catch (error) {
        console.log("error posting", error);
      }
          
    }
  };

  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      direction="column"
      sx={{
        alignItems: "center",
        top: "50%",
        left: "50%",
        position: "absolute",
        transform: "translate(-50%,-50%)",
      }}
    >
      <Box
        sx={{
          width: "30%",
          height: "auto",
          background: "white",
          boxShadow: "1px 2px 3px",
          borderRadius: "10px",
          color: "grey",
          padding: "20px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "black",
            fontWeight: "bold",
            fontFamily: "Nunito Sans', sans-serif",
          }}
        >
          Login
        </Typography>
        <Grid sx={{ mb: 3, mt: 4, color: "blue" }}>
          <InputComponent
            fullWidth
            label="Email"
            placeholder="Enter EmailId"
            name="emailId"
            type="text"
            value={allDetails.emailId}
            onChange={getData}
          />
          {emailValid && <div style={{ color: "red" }}>{emailValid}</div>}
        </Grid>
        <Grid sx={{ mb: 3 }}>
          <InputComponent
            fullWidth
            label="Password"
            placeholder="Enter Password"
            name="password"
            type="text"
            value={allDetails.password}
            onChange={getData}
          />
          {passwordValid && <div style={{ color: "red" }}>{passwordValid}</div>}
        </Grid>
        <Grid sx={{ mt: 4, mb: 2 }}>
          <Typography
            variant="h5"
            sx={{ fontFamily: "Nunito Sans', sans-serif" }}
          >
            Don't have an account?
            <Link to="/register" className="link-page">
              Register
            </Link>
          </Typography>
        </Grid>

        <ButtonComponent
          fullWidth
          variant="contained"
          label="Login"
          onClick={submitData}
        >
          Login
        </ButtonComponent>
      </Box>
    </Grid>
  );
};

export default Login;
