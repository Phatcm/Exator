import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleSignIn = () => {
  const responseMessage = (response) => {
    console.log(response);
    // Send the ID token to your server
    axios
      .post(
        `https://ex9dfrk6qd.execute-api.ap-northeast-1.amazonaws.com/prod/googleApi?idToken=${response.credential}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // document.getElementById("signoutButton").style.display = "block";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  return (
    <div>
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </div>
  );
};
export default GoogleSignIn;
