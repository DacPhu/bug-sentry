const bcrypt = require("bcryptjs");
const { User, Role, Member } = require("../models"); // Adjust according to your setup

module.exports.signup = async (req, res) => {
  try {
    if (req.session && req.session.userId) {
      return res.redirect("/project");
    }
    let { username, first_name, last_name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!username) username = email;
    const newUser = await User.create({
      username,
      first_name,
      last_name,
      role_id: role,
      email,
      password: hashedPassword,
      profile_picture: 'https://www.gravatar.com/avatar/?d=mp',
    });
    req.flash("success", "Create account successfully !"); // Flash success message
    res.redirect(`/login`);
  } catch (error) {
    console.error(error);
    req.flash("error", "Account not valid !"); // Flash error message
    res.redirect("/register");
  }
};

module.exports.get_sign_up = async (req, res) => {
  try {
    if (req.session && req.session.userId) {
      return res.redirect("/project");
    }
    const roles = await Role.findAll({ raw: true });
    res.render("register", { roles, layout: "home_layout" });
  }
  catch (error) {
    console.error(error);
    res.redirect("/register");
  }
};

module.exports.get_login = async (req, res) => {
  if (req.session && req.session.userId) {
    return res.redirect("/project");
  }
  res.render("login",{ layout: "home_layout" });
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
      req.flash("error", "Email or Password is not correct!"); // Flash error message
      return res.redirect(`/login`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash("error", "Email or Password is not correct!");
      return res.redirect(`/login`);
    }

    const members = await Member.findAll({
      where: {
        user_id: user.id
      },
      include: [
        { model: Role },
      ]
    });
    
    req.session.projects = {};
    for (const member of members) {
      req.session.projects[member.project_id] = {
        memberId: member.id,
        role: member.Role.name
      }
    }
    console.log(members);
    req.session.userId = user.id;
    req.session.email = user.username;
    req.session.fullname = user.first_name + ' '+ user.last_name
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
