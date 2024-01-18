import * as jwt from "jsonwebtoken";

const generateToken = (id: string): string => {
  return jwt.sign({ id }, "KHAAMA", {
    expiresIn: "1h",
  });
};

export default generateToken;
