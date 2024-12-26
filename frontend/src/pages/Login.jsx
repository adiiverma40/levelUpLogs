import React, { useState } from "react";
import { Button, Container, Input } from "../components";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, profileImage } from "../Store/Slices/UserSlice";
function Login() {
  const [buttonClicked, SetButtonClicked] = useState("Login");
  const [toggleButton, setToggelButton] = useState(false);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errorMessage , setErrorMessage] = useState('')
  async function checkLoggin(data) {
    try {
    console.log(data);
    //API call
    // const response = await axios.post("http://localhost:3000/api/login" , data)
    const response = await axios.post(
      "http://localhost:3000/api/login", 
      data, 
      {
        withCredentials: true, // This will send cookies with the request
      }
    );

    console.log(response);
    dispatch(
      login({
        name: response.data.userData.name,
        email: response.data.userData.email,
        currentWeight: response.data.userData.currentWeight,
        DOB: response.data.userData.DOB,
        id: response.data.userData._id,
        accesToken: response.data.accessToken,
        isLoggedIn:true
      })
    );
    dispatch(profileImage(response.data.userData.profileImage))
    navigate('/') 
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      setErrorMessage(error.response.data.message); // Set API error message
    } else if (error.request) {
      // Network error: No response received from server
      setErrorMessage(
        "Network error: Unable to reach the server. Please try again later."
      );
    } else {
      setErrorMessage("Something went wrong. Please try again."); // Generic error
    }
    console.error("Error creating user:", error);
  }
    
  }

  const onButtonClick = () => {
    if (!toggleButton) {
      SetButtonClicked("Logging in......");
    } else {
      SetButtonClicked("Sign Up");
    }
    setToggelButton((prevState) => !prevState);
  };
  return (
    <Container flex={false}>
      <div className="h-3/5 w-1/2 mx-auto rounded-lg shadow-xl shadow-slate-800 px-10 py-3">
        <span className="font-bold text-xl font-serif text-center block">
          Login
        </span>
        <hr className="my-3" />
        <div className="w-3/4 mx-auto">
          <form onSubmit={handleSubmit(checkLoggin)} className="w-full ">
            <Input
              type={"email"}
              label="Email"
              placeholder="Enter your Email"
                {...register("email", { required: true })}
            />
            <Input
              type={"password"}
              label="Password"
              placeholder="Enter your Password"
                {...register("password", { required: true })}
            />
            <Button className="w-44" type="submit" onClick={onButtonClick}>
              {buttonClicked}
            </Button>
            <span>{errorMessage}</span>
          </form>
        </div>
        <span className="block text-center mt-4">
          Don't have a account?
          <NavLink
            to={"/signUp"}
            className="text-blue-700 hover:cursor-pointer"
          >
            Sign Up!
          </NavLink>
        </span>
      </div>
    </Container>
  );
}

export default Login;
