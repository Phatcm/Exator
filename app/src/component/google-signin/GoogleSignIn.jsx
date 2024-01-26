import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Cookies from "js-cookie";
import { setUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const GoogleSignIn = ({ keepSignedIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const responseMessage = async (response) => {
    console.log(response);
    // Send the ID token to your server
    const data = await axios.post(
      `${process.env.REACT_APP_URL_USER}/user/signinWithGoogle`,
      {
        id_token: response.credential,
      }
    );
    if (data.status === 200) {
      const userData = data.data.body.user;
      const options = {
        secure: true, // Cookie will only be sent over HTTPS
        sameSite: "None",
      };
      if (keepSignedIn) options.expired = 7;
      Cookies.set("jwt", data.data.body.token, options);
      dispatch(setUser(userData));
      navigate("/dashboard");
    }
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
