import React, { useEffect } from "react";
import { Container } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Store/Slices/UserSlice";
import axios from "axios";
function Home() {
  const selector = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function loginUserByToken() {
    try {
      const response = await axios.get("http://localhost:3000/protected", {
        withCredentials: true, // This will send cookies with the request
      });
      console.log(response);
      if (response.data.message === "Token verified") {
        dispatch(
          login({
            name: response.data.userData.name,
            email: response.data.userData.email,
            currentWeight: response.data.userData.currentWeight,
            DOB: response.data.userData.DOB,
            id: response.data.userData._id,
            accesToken: response.data.accessToken,
            isLoggedIn: true,
          })
        );
      }
    } catch (error) {
      console.log(error);
      alert("Token Expired, Please login again");
      navigate("/login");
    }
  }

  useEffect(() => {
    if (selector.isLoggedIn) {
      console.log("welcome Home!");
    } else if (
      selector.isLoggedIn === false &&
      selector.name !== "adfghiufdsbiuydswfgipubdfgisuabdfghi;sugdsfibhu"
    ) {
      loginUserByToken(selector.accessToken);
      console.log("not logged in");
    } else {
      navigate("/login");
    }
  }, [selector.isLoggedIn]);

  return (
    <div>
      <Container flex={false}>Home</Container>
    </div>
  );
}

export default Home;
