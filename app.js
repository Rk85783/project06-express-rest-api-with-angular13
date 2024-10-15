require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/database");
const apiRoute = require("./routes/apiRoute");
const cors = require("cors");

const app = express();
app.use(cors());

// Database connection
connectDB();

// parser
app.use(express.json());

// import routes
app.use("/api", apiRoute);

const appPort = process.env.APP_PORT || 4001;
app.listen(appPort, () => {
  console.log(`Server is runnint at http://localhost:${appPort}`);
});
