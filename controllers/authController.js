const userModel = require("../models/userModel");
const messages = require("../utils/constantMessages");
const { hashSync } = require("bcrypt");

module.exports = {
  login: (req, res) => {
    return res.status(200).json({
      status: true,
      message: "Ok"
    });
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
