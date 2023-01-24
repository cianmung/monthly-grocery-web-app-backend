require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");

//Connect to Database
connectDB();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/register", require("./routes/auth/register"));
app.use("/login", require("./routes/auth/login"));
app.use("/refresh", require("./routes/auth/refresh"));
app.use("/logout", require("./routes/auth/logout"));

//app.use(verifyJWT);
app.use("/paymentdetails", require("./routes/api/payments"));

// for production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
  app.listen(port, () => console.log(`Server is running on port: ${port}`));
});
