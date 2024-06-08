const bcrypt = require("bcryptjs");
const { User,Role } = require("../models"); // Adjust according to your setup

module.exports.signup = async (req, res) => {
  try {
    const { username, first_name, last_name, email, password } = req.body;
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });
    console.log(req.body);
    req.session.userId = newUser.id;
    res.redirect(`/project`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
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
      return res.redirect(`/login?error=Invalid email or password`);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.redirect(`/login?error=Invalid email or password`);
    }

    req.session.userId = user.id;
    req.session.username = user.username;
    const userRole = user.Role.get({ plain: true });
    req.session.role = userRole.name;
    console.log(req.session.username, req.session.userId);
    res.redirect(`/project`);
  } catch (error) {
    console.error(error);
    res.redirect(`/login?error=Server error, please try again later`);
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
