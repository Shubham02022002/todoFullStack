const app = require("express")();
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoutes.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

app.use("/user", userRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Invalid Route!");
});

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
