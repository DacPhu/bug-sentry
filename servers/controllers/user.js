"use strict";

const controller = {};
const models = require("../models");

controller.getUser = async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ message: "Email is empty" });
  }

  try {
    // Find the user by email
    const user = await models.User.findOne({
      where: { email },
      attributes: ["id", "username", "first_name", "last_name", "role_id"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Return the user and role information as a JSON response
    return res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = controller;
