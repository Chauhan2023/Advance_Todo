const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const app = express();
const cors = require("cors");
const user = require("./models/signup");
const upload_Todo = require("./models/Upload");
const port = process.env.PORT | 80;
const { body, validationResult } = require("express-validator");
app.use(bodyparser.json());

app.use(cors());

//secret key jwt
const jwtSecretkey = "RohitchauhanProjectTodo12345";

//conect mongoose
mongoose.connect(
  "mongodb+srv://rohitchauhan19780:Rohit%402001@cluster0.abcw6i8.mongodb.net/Todo"
);

const database = mongoose.connection;

//checking database is connected
database.on("open", async () => {
  try {
    console.log("It is connected");
  } catch (error) {
    console.log("Error in fetching data", errro);
  }
});

//checking error database
database.on("error", () => console.log("mongoose is not connected"));

//Login User
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const finduser = await user.db
      .collection("users")
      .findOne({ email: email });
    if (!finduser) {
      res.status(400).json({ error: "No !!Login with correct detail" });
    }

    const compare = await bcrypt.compare(password, finduser.password);
    if (!compare) {
      return res.status(400).json({ error: "Enter your correct detail" });
    }
    const datajwt = {
      user: {
        id: finduser.id,
      },
    };

    const authToken = jwt.sign(datajwt, jwtSecretkey);
    return res.status(200).json({
      success: "You are login",
      token: authToken,
      username: finduser.name,
    });
  } catch (error) {}
});

//create User
app.post("/signup", async (req, res) => {
  const { name, mobile, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hasspassword = await bcrypt.hash(password, salt);
  const check = await user.findOne({ mobile: mobile });

  if (check) {
    res.status(400).send("User is already exsist Please go to login");
  } else {
    try {
      await user.create({
        name: name,
        mobile: mobile,
        email: email,
        password: hasspassword,
      });
      res.status(200).send("user is created successfully");
    } catch (error) {
      res.status(400).send("user is not created", error);
    }
  }
});

//Old Saved data
app.post("/uploaded_data", async (req, res) => {
  try {
    console.log("frontEnd data hit");
    const data = await database.collection("uploads").find({}).toArray();
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log("Data is not send");
    res.status(500).send("Internal Server Error");
  }
});

//upload TOdo
app.post("/upload", async (req, res) => {
  const { list, name } = req.body;
  try {
    await upload_Todo.create({
      name,
      list,
    });

    res.status(200).json({ success: "The data is store successfully" });
  } catch (error) {
    res.status(400).json({ error: "The data is not saved" });
  }
});

//listen
app.listen(port, () => {
  console.log(`The server is run this project ${port}`);
});
