const express = require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/user.route");
const { mediaRouter } = require("./routes/media.route");
const { authenticate } = require("./middleware/authentication");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/users", userRouter);
app.use(authenticate);
app.use("/media", mediaRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Some problem while connecting");
  }
  console.log(`Running at ${process.env.port}`);
});
