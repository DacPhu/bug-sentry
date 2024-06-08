const bcrypt = require("bcryptjs");
const { User,Role } = require("../models"); // Adjust according to your setup

module.exports.signup = async (req, res) => {
  try {
    let { username, first_name, last_name, email, password,role } = req.body;
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!username) username = email;
    const newUser = await User.create({
      username,
      first_name,
      last_name,
      role_id: role,
      email,
      password: hashedPassword,
    });
    req.flash("success", "Tạo tài khoản thành công."); // Flash success message
    res.redirect(`/login`);
  } catch (error) {
    console.error(error);
    req.flash("error", "Tài khoản không hợp lệ."); // Flash error message
    res.redirect("/register");
  }
};

module.exports.get_sign_up = async (req, res) => {
  try {
    // get all roles
    const roles = await Role.findAll({ raw: true });
    console.log(roles);
    res.render("register", { roles, layout: "home_layout" });
  }
  catch (error) {
    console.error(error);
    res.redirect("/register");
  }
};


module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);


    const user = await User.findOne({ 
      where: { email },
      include: [{ model: Role }],
      plain: true
    });

    if (!user) {
      req.flash("error", "Email hoặc mật khẩu không đúng."); // Flash error message
      return res.redirect(`/login`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash("error", "Email hoặc mật khẩu không đúng.");
      return res.redirect(`/login`);
    }

    req.session.userId = user.id;
    req.session.username = user.username;
    const userRole = user.Role.get({ plain: true });
    req.session.role = userRole.name;
    console.log(req.session.username, req.session.userId);
    res.redirect(`/project`);
  } catch (error) {
    console.error(error);
    req.flash("error", "Server error, please try again later."); // Flash error message
    res.redirect(`/login`);
  }
};


module.exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send("Could not log out.");
    }
    res.redirect("/login");
  });
};
