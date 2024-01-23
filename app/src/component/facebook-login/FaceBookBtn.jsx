import React from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import axios from "axios";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
const responseFacebook = (response) => {
  console.log(response);
  let accessToken = response.accessToken; // This is your Facebook access token

  // Send the access token to your AWS Lambda function
  axios
    .post(
      "https://04jicbyks4.execute-api.ap-northeast-1.amazonaws.com/prod/facebookApi",
      {
        id_token: accessToken,
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

function FaceBookBtn() {
  return (
    // <FacebookLogin
    //   appId="1069347884398455"
    //   autoLoad={true}
    //   onSuccess={(response) => {
    //     console.log("Login Success!", response);
    //   }}
    //   onFail={(error) => {
    //     console.log("Login Failed!", error);
    //   }}
    //   onProfileSuccess={(response) => {
    //     console.log("Get Profile Success!", response);
    //   }}
    // />
    <LoginSocialFacebook
      appId="1069347884398455"
      onResolve={(response) => {
        console.log(response);
        // setProfile(response.data);
        // sendTokenToServer(response.data.accessToken);
      }}
      onReject={(error) => {
        console.log(error);
      }}
    >
      <FacebookLoginButton />
    </LoginSocialFacebook>
  );
}

export default FaceBookBtn;
