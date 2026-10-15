const users = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.userRegister = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const existing = await users.findOne({ email });
    if (existing) {
      res.status(406).json("User Already Exists.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new users({
      email,
      username,
      password: hashedPassword,
      authProvider: "local",
      providerId: null,
      github: "",
      linkdin: "",
      profile: "",
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await users.findOne({ email });
    if (!existing) {
      return res.status(406).json("Invalid email or password.");
    }
    if (existing.authProvider !== "local") {
      return res
        .status(406)
        .json("Please continue with ${existing.authProvider}.");
    }
    const isPasswordCorrect = await bcrypt.compare(password, existing.password);
    if (!isPasswordCorrect) {
      return res.status(406).json("Invalid email or password.");
    }
    const token = jwt.sign({ userId: existing._id }, process.env.SECRET_KEY);
    res.status(200).json({
      token,
      user: existing.username,
      git: existing.github,
      linkdin: existing.linkdin,
      profile: existing.profile,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

exports.profileUpdate = async (req, res) => {
  try {
    const uid = req.payload;
    const { username, github, linkdin } = req.body;
    if (req.file) {
      var profile = req.file.filename;
    } else {
      var { profile } = req.body;
    }
    const result = await users.findByIdAndUpdate(uid, {
      username,
      github,
      linkdin,
      profile,
    });
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json("Google authentication failed.");
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY
    );

    const params = new URLSearchParams({
      token,
      user: user.username || "",
      git: user.github || "",
      linkdin: user.linkdin || "",
      profile: user.profile || "",
    });

    res.redirect(
      `${process.env.CLIENT_URL}/oauth-success?${params.toString()}`
    );
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

exports.githubLogin = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json("GitHub authentication failed.");
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY
    );

    const params = new URLSearchParams({
      token,
      user: user.username || "",
      git: user.github || "",
      linkdin: user.linkdin || "",
      profile: user.profile || "",
    });

    res.redirect(
      `${process.env.CLIENT_URL}/oauth-success?${params.toString()}`
    );
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};