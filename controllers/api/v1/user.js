"use strict";

const controller = {};
const models = require("../../../models");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "../../../private/avatars/uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

controller.getUsers = async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ message: "Email is empty" });
  }

  try {
    const user = await models.User.findOne({
      where: { email },
      attributes: ["id", "username", "first_name", "last_name", "role_id"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const role = await models.Role.findOne({
      where: { id: user.role_id },
      attributes: ["id", "name"],
    });

    return res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        role_id: role.id,
        role_name: role.name,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

controller.getAllUsers = async (req, res) => {
  try {
    const users = await models.User.findAll({
      attributes: ["id", "username", "first_name", "last_name", "role_id"],
    });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({
      users: users.map((user) => ({
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
      })),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

controller.editUserInfo = async (req, res) => {
  try {
    const file_avatar = req.profile_picture;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const address = req.body.address;
    const phone_number = req.body.phone_number;
    const birth_date = req.body.birth_date;
    const userId = req.session.userId;

    console.log("EDIT PROFILE", req.body);

    const uploadDir = path.join(__dirname, "../../../private/avatars/uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    let filePath = null;
    if (file_avatar) {
      filePath = path.join(uploadDir, file_avatar.originalname);
      fs.writeFileSync(filePath, file_avatar.buffer);
    }

    const user = await models.User.update(
      {
        first_name,
        last_name,
        address,
        phone_number,
        birth_date,
        profile_picture: filePath,
      },
      {
        where: { id: userId },
      }
    );
    if (user[0] === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User profile updated!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

controller.editUserPassword = async (req, res) => {
  try {
    const newPassword = req.body["new-password"];
    const userId = req.session.userId;

    console.log(req.body.newPassword);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await models.User.update(
      {
        password: hashedPassword,
      },
      {
        where: { id: userId },
      }
    );

    if (user[0] === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Password updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

controller.checkPassword = async (req, res) => {
  const currentPassword = req.body.currentPassword;
  const userId = req.session.userId;
  try {
    const user = await models.User.findByPk(userId);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (isMatch) {
      return res.status(200).json({ valid: true });
    } else {
      return res.status(200).json({ valid: false });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = controller;
