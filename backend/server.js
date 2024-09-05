const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const IndexRoute = require("./Routers/index");
const connectDatabase = require("./Helpers/database/connectDatabase");
const customErrorHandler = require("./Middlewares/Errors/customErrorHandler");

dotenv.config({
  path: "./Config/config.env",
});

connectDatabase();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", IndexRoute);

app.use(customErrorHandler);

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT} : ${process.env.NODE_ENV}`);
});

// const pathToBuild=path.resolve(__dirname, "../frontend/build")

// app.use(express.static(pathToBuild));

// app.get("*",(req,res) => {

//     res.sendFile(path.resolve(pathToBuild,"index.html"));
// })
app.get("/health", (req, res) => {
  res.json({ message: "hey buddy your server is complete" });
});
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  console.log("dir "+__dirname)
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error : ${err}`);

  server.close(() => process.exit(1));
});
