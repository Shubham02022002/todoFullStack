const { Schema, model, default: mongoose } = require("mongoose");

require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI).then((resp) => {
  console.log("DB connected " + resp.connection.host);
});

const todoSchema = new Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const userSchema = new Schema({
  username: String,
  password: String,
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

const Todo = model("Todo", todoSchema);
const User = model("User", userSchema);

module.exports = {
  Todo,
  User,
};
