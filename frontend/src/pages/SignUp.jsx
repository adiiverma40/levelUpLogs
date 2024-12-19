import React, { useState } from "react";
import { Button, Container, Input } from "../components";
import { data, NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios, { Axios } from "axios";
import { useDispatch } from "react-redux";
import { login } from "../Store/Slices/UserSlice";
function SignUp() {
  const [buttonClicked, SetButtonClicked] = useState("Sign Up");
  const [toggleButton, setToggelButton] = useState(false);
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  async function createUser(Data) {
    try {
      console.log("in fn");
      console.log(Data);

      // Make API call
      const response = await axios.post(
        "http://localhost:3000/api/signup",
        Data
      );

      // Handle success
      console.log("User created:", response.data);
      dispatch(
        login({
          name: response.data.newUser.name,
          email: response.data.newUser.email,
          currentWeight: response.data.newUser.currentWeight,
          DOB: response.data.newUser.DOB,
          id: response.data.newUser._id,
          isLoggedIn:true
        })
      );
      navigate('/')
      setErrorMessage("User created successfully!"); // Optional success message
    } catch (error) {
      // Handle error response
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
      SetButtonClicked("Signing......");
    } else {
      SetButtonClicked("Sign Up");
    }
    setToggelButton((prevState) => !prevState);
  };
  return (
    <Container flex={false}>
      <div className="h-3/5 w-1/2 mx-auto rounded-lg shadow-xl shadow-slate-800 px-10 py-3">
        <span className="font-bold text-xl font-serif text-center block">
          Sign Up{" "}
        </span>
        <hr className="my-3" />
        <div className="">
          <form onSubmit={handleSubmit(createUser)} className="w-full flex">
            <div className="w-1/2">
              <Input
                {...register("name", { required: true })}
                label="Name"
                placeholder="Enter your name"
              />
              <Input
                {...register("email", { required: true })}
                type={"email"}
                label="Email"
                placeholder="Enter your Email"
              />
              <Input
                {...register("password", { required: true })}
                type={"password"}
                label="Password"
                placeholder="Enter your Password"
              />
            </div>
            <div className="w-1/2">
              <Input
                {...register("currentWeight", { required: true })}
                label="Current Weight"
                placeholder="Enter your Weight(In KGs)"
                type={"number"}
              />
              <Input
                {...register("DOB", { required: true })}
                label="DOB"
                placeholder="Enter your DOB"
                type={"date"}
              />
              {/* <button type="submit">click here</button> */}
              <Button type={"submit"} onClick={onButtonClick}>
                {buttonClicked}
              </Button>
              <br />
              <span className="font-semibold text-red-500 text-sm">
                {errorMessage}
              </span>
            </div>
          </form>
        </div>
        <span className="block text-center">
          Already have a account?
          <NavLink to={"/login"} className="text-blue-700 hover:cursor-pointer">
            {" "}
            Login!
          </NavLink>
        </span>
      </div>
    </Container>
  );
}

export default SignUp;
