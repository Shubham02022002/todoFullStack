const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const z = require("zod");
const validate = require("./validation.js");

const userSchema = z.object({
  username: z.email(),
  password: z.string().min(5),
});

const todoSchema = z.object({
  title: z.string(),
  description: z.string(),
  completed: z.boolean().optional(),
});

validate(userSchema);

const authenticateUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "Authentication required." });
  }
  try {
    const payload = jwt.verify(token, SECRET);
    req.userId = payload.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = { authenticateUser, userSchema, todoSchema };
