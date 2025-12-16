const router = require("express").Router();
const { User, Todo } = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  authenticateUser,
  userSchema,
} = require("../authMiddleware/userAuth.js");
const validate = require("../authMiddleware/validation.js");
const SECRET = process.env.SECRET;

router.post("/signup", validate(userSchema), async (req, res) => {
  const { username, password } = req.body;
  try {
    const isUserExist = await User.findOne({ username });
    if (isUserExist) {
      return res.status(409).json({ message: "User already exits" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
    res
      .status(201)
      .json({ message: "User created successfully", token, id: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.post("/signin", validate(userSchema), async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!(user || isPasswordValid)) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
    res.status(200).json({
      message: "Logged in successfully",
      token: token,
      id: user._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.use(authenticateUser);

module.exports = router;
