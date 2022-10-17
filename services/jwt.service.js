const jwt = require("jsonwebtoken");
require("dotenv").config();

class jsonwebtoken {
  // Access Token 생성
  createAccessToken = async (userId) => {
    return jwt.sign({ id: userId }, process.env.SECRET_KEY, {
      expiresIn: "3h",
    });
  };

  // Refresh Token 생성
  createRefreshToken = async () => {
    return jwt.sign({}, process.env.SECRET_KEY, { expiresIn: "7d" });
  };

  // Access Token 검증
  validateAccessToken(accessToken) {
    try {
      jwt.verify(accessToken, process.env.SECRET_KEY); 
      return true;
    } catch (error) {
      return false;
    }
  }

  // Refresh Token 검증
  validateRefreshToken(refreshToken) {
    try {
      jwt.verify(refreshToken, process.env.SECRET_KEY); 
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = jsonwebtoken;
