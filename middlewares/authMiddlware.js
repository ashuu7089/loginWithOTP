const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

const checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = authorization.split(' ')[1];

      const { userEmail } = jwt.verify(token, process.env.JWT);
      // Get User from token
      const user = await User.findOne({where: {userEmail: userEmail}})
      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).send({ status: false, message: 'Unauthorized User' });
    }
  } else {
    res.status(401).send({ message: 'Unauthorized User' });
  }
};

module.exports = checkUserAuth;

