const app = require("express")();
const bodyParser = require("body-parser");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("hi there");
});

app.listen(PORT, () => {
  console.log(`Server is up at ${PORT}`);
});
