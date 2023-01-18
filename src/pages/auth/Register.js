import { Grid, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import ButtonComponent from "../../components/atoms/ButtonComponent";
import InputComponent from "../../components/atoms/InputComponent";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/fonts.css";
import axios from "axios";

const Register = () => {
  const [emailValid, setEmailValid] = useState("");
  const [passwordValid, setPasswordValid] = useState("");
  const [firstNameValid, setFirstNameValid] = useState("");
  const [lastNameValid, setLastNameValid] = useState("");
  const [phoneNoValid, setPhoneNoValid] = useState("");

  const [allDetails, setAllDetails] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNo: "",
  });
  console.log("all details", allDetails);
  let navigate = useNavigate();
  const getData = (e) => {
    e.preventDefault();
    setAllDetails({
      ...allDetails,
      [e.target.name]: e.target.value,
    });
  };

  const nameValidation = () => {
    const nameRegex = /^[A-Za-z]+$/;
    if (allDetails.firstName) {
      if (nameRegex.test(allDetails.firstName)) {
        setFirstNameValid("");
        return true;
      } else {
        setFirstNameValid("Invalid FirstName");
      }
    } else {
      setFirstNameValid("* Firstname Required");
    }
  };

  const lastNameValidation = () => {
    const nameRegex = /^[A-Za-z]+$/;
    if (allDetails.lastName) {
      if (nameRegex.test(allDetails.lastName)) {
        setLastNameValid("");
        return true;
      } else {
        setLastNameValid("Invalid LastName");
      }
    } else {
      setLastNameValid("* Lastname  Required");
    }
  };

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

  const phoneNoValidation = () => {
    const mobileRegex = /^(\+|\d)[0-9]{7,16}$/;
    if (allDetails.phoneNo) {
      if (mobileRegex.test(allDetails.phoneNo)) {
        setPhoneNoValid("");
        return true;
      } else {
        setPhoneNoValid("Invalid Mobile Number");
      }
    } else {
      setPhoneNoValid("* Mobile number Required");
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
    nameValidation();
    lastNameValidation();
    emailIdValidation();
    phoneNoValidation();
    passwordValidation();

    if(
    nameValidation() &&
    lastNameValidation() &&
    emailIdValidation() &&
    phoneNoValidation() &&
    passwordValidation() 
    ){
      try {
        const data = await axios.post(
          "http://localhost:5000/api/register",
           allDetails
        );
        console.log(data);
        setAllDetails({
          emailId: "",
          password: "",
        });
        navigate('/');
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
          Register
        </Typography>
        <Grid sx={{ mb: 2, mt: 4, color: "blue" }}>
          <InputComponent
            fullWidth
            label="First Name"
            placeholder="Enter First Name"
            name="firstName"
            type="text"
            value={allDetails.firstName}
            onChange={getData}
          />
          {firstNameValid && (
            <div style={{ color: "red" }}>{firstNameValid}</div>
          )}
        </Grid>
        <Grid sx={{ mb: 3 }}>
          <InputComponent
            fullWidth
            label="Last Name"
            placeholder="Enter Last Name"
            name="lastName"
            type="text"
            value={allDetails.lastName}
            onChange={getData}
          />
          {lastNameValid && <div style={{ color: "red" }}>{lastNameValid}</div>}
        </Grid>
        <Grid sx={{ mb: 3 }}>
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
            label="Phone number"
            placeholder="Enter Phone number"
            name="phoneNo"
            type="text"
            value={allDetails.phoneNo}
            onChange={getData}
          />
          {phoneNoValid && <div style={{ color: "red" }}>{phoneNoValid}</div>}
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
            Already have an account!
            <Link to="/" className="link-page">
              Login
            </Link>
          </Typography>
        </Grid>

        <ButtonComponent
          fullWidth
          variant="contained"
          label="Register"
          onClick={submitData}
        >
          Register
        </ButtonComponent>
      </Box>
    </Grid>
  );
};

export default Register;
