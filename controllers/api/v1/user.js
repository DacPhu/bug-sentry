"use strict";

const controller = {};
const models = require("../../../models");

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

    // Return the users array as a JSON response
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

controller.editUser = async (req, res) => {
  try {
    const file_avatar = req.avatar;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const address = req.body.address;
    const phone = req.body.phone;
    const birth_date = req.body.birth_date;

    const uploadDir = path.join(__dirname, "../../../private/avatar/uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const filePath = path.join(uploadDir, `${req.params.id}_avatar`);
    fs.writeFileSync(filePath, file_avatar.buffer);
    const user = await models.User.update(
      {
        first_name,
        last_name,
        address,
        phone,
        birth_date,
        avatar: filePath,
      },
      {
        where: { id: req.params.id },
      }
    );
    if (user[0] === 0) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.redirect(`/profile/edit-profile`);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = controller;
