const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

function isAuth(req, res, next) {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    {
      req.isAuth = false;
      return next();
    }
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    req.isAuth = true;
    next();
  } catch (ex) {
    req.isAuth = false;
    next();
  }
}

module.exports = isAuth;
