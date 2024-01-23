import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleSignIn = () => {
  const responseMessage = async (response) => {
    console.log(response);
    // Send the ID token to your server
    const data = await axios.get(
      `https://ex9dfrk6qd.execute-api.ap-northeast-1.amazonaws.com/prod/googleApi?idToken=${response.credential}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
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
