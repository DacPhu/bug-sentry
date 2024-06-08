const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.get("/login", (req, res) => res.render("login",{ layout: "home_layout" }));
router.post("/login", authController.login);
router.get("/register", (req, res) => res.render("register",{ layout: "home_layout" }));
router.post("/register", authController.signup);
router.get("/logout", authController.logout);

module.exports = router;