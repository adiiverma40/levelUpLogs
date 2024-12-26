import React, { useState , useEffect } from "react";
import { Button, Container, Input, UploadImage } from "../components";
import { data, NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios, { Axios } from "axios";
import { useSelector } from "react-redux";

function SignUp() {
  const [buttonClicked, SetButtonClicked] = useState("Sign Up");
  const [toggleButton, setToggelButton] = useState(false);
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [iamgeUploader, setImageUploader] = useState(false);
  const [profileImage, setProfileImage] = useState("https://placehold.co/400x600");
  const selector = useSelector((state) => state.user.profileImage);
  useEffect(() => {
    console.log(selector);
    if (selector) {
      setProfileImage(selector.profileImage);}
  }, [selector]);
  // const dispatch = useDispfatch();
  const navigate = useNavigate();
  async function createUser(Data) {
    try {
      console.log("in fn");
      console.log(Data);
      const data = {...Data, profileImage: profileImage};
      console.log(data);
      
      // Make API call
      const response = await axios.post(
        "http://localhost:3000/api/signup",
        data
      );

      // Handle success
      console.log("User created:", response.data);

      navigate("/login");
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
      <div
        className="h-3/5 mx-auto rounded-lg shadow-xl shadow-slate-800 px-10 py-3"
        style={{ width: "70%" }}
      >
        <span className="font-bold text-xl font-serif text-center block">
          Sign Up{" "}
        </span>
        <hr className="my-3" />
        <div className="flex justify-between">
          <div className="h-auto w-1/4">
            <img
              src={profileImage}
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
              className="rounded-lg mb-4 "
            />
            <Button
              onClick={() => setImageUploader((prev) => !prev)}
              className="mt-2 bg-amber-500
              w-52
              "
            >
              Upload Profile
            </Button>
          </div>

          <div className="h-auto w-3/4">
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
            <span className="block text-center">
              Already have a account?
              <NavLink
                to={"/login"}
                className="text-blue-700 hover:cursor-pointer"
              >
                Login!
              </NavLink>
            </span>
          </div>
        </div>
        {iamgeUploader && (
          <>
            <button
              onClick={() => {
                setImageUploader((prev) => !prev);
              }}
              className="absolute  z-10 top-20 left-2/3 bg-blue-600 p-1 text-white rounded-md font-bold"
            >
              X
            </button>
            <UploadImage />
          </>
        )}
      </div>
    </Container>
  );
}

export default SignUp;
