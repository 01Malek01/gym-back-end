import jwt from "jsonwebtoken";
//create a refresh token
const createRefreshToken = async (user) => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });
};

export default createRefreshToken;
