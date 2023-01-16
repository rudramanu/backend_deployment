const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const decoded = jwt.verify(token, "coder");
    // console.log(decoded);
    if (decoded) {
      const userID = decoded.userID;
      req.body.userID = userID;
      console.log("testing", req.body);
      next();
    } else {
      res.send("Please login first");
    }
  } else {
    res.send("Please login first");
  }
};

module.exports = {
  authenticate,
};
