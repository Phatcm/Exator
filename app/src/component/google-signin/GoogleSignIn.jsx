import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Cookies from "js-cookie";
import { setUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const GoogleSignIn = ({ keepSignedIn, setLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const responseMessage = async (response) => {
    setLoading(true);
    // Send the ID token to your server
    const data = await axios.post(
      `${process.env.REACT_APP_URL_USER}/user/signinWithGoogle`,
      {
        id_token: response.credential,
      }
    );
    if (data.status === 200) {
      const userData = data.data.body.user;
      userData.username = userData.name;
      const options = {
        secure: true, // Cookie will only be sent over HTTPS
        sameSite: "None",
      };
      if (keepSignedIn) options.expired = 7;
      Cookies.set("jwt", data.data.body.token, options);
      dispatch(setUser(userData));

      const sendEmailVerify = axios.post(
        `${process.env.REACT_APP_URL}/email/verify`,
        { email: userData.email }
      );

      navigate("/dashboard");
    }
    setLoading(false);
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
