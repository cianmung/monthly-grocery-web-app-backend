const User = require("../../models/auth/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res
      .status(400)
      .json({ message: "Username, Email and Password are required." });

  const duplicate = await User.findOne({ email }).exec();
  if (duplicate)
    return res
      .status(409)
      .json({ message: "This email is already registered!" });

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashPassword,
    });

    res.status(201).json({ success: `New user ${username} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  handleNewUser,
};
