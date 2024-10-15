const userModel = require("../models/userModel");
const messages = require("../utils/constantMessages");
const { hashSync, compareSync } = require("bcrypt");

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          status: false,
          message: messages.ALL_FIELDS_REQUIRED
        });
      }

      const existsUser = await userModel.findOne({ email });
      if (!existsUser) {
        return res.status(400).json({
          status: false,
          message: messages.USER_NOT_FOUND
        });
      }

      const isMatched = compareSync(password, existsUser.password);
      if (!isMatched) {
        return res.status(401).json({
          status: false,
          message: messages.INVALID_CREDENCIALS
        });
      }

      const loggedUser = existsUser.toJSON();
      delete loggedUser.password;

      return res.status(200).json({
        status: true,
        message: messages.LOGIN_SUCCESS,
        data: loggedUser
      });
    } catch (error) {
      console.error("login(): catch(): error : ", error);
      return res.status(200).json({
        status: false,
        message: messages.INTERNAL_SERVER_ERROR
      });
    }
  },
  signup: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
          status: false,
          message: messages.ALL_FIELDS_REQUIRED
        });
      }

      const hashPassword = hashSync(password, 10);
      await userModel.create({
        firstName,
        lastName,
        email,
        password: hashPassword
      });

      return res.status(200).json({
        status: true,
        message: messages.SINGUP_SUCCESS
      });
    } catch (error) {
      console.error("signup(): catch(): error : ", error);
      return res.status(200).json({
        status: false,
        message: messages.INTERNAL_SERVER_ERROR
      });
    }
  }
};
