import React from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import axios from "axios";

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
    <FacebookLogin
      appId="1069347884398455"
      autoLoad={true}
      fields="name,email,picture"
      callback={responseFacebook}
    />
  );
}

export default FaceBookBtn;
