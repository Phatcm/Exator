import { updateUser } from "../db/UserDb";
import { buildResponse } from "../utils/buildResponse";
import catchAsync from "../utils/catchAsync";

export const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    buildResponse(res, 400, "fail", {
      message: "Cant use this for password updates!",
    });
    return;
  }

  const { photo, username } = req.body;

  //update user

  const response = await updateUser(req.email, photo, username);

  if (response.$metadata.httpStatusCode === 200)
    buildResponse(res, 200, "success", { message: "Update success!" });
  else buildResponse(res, 404, "error", { message: "Update fail!" });

  return;
});
