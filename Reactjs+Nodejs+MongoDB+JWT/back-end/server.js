const express = require("express");
const router = require("./routes/authRoutes");
const DbConnect = require("./database/DbConnect");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173", // or use "*" for any origin, but this can expose you to security risks
  credentials: true, // This allows the server to send cookies
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(router);

// Connect to MongoDB
DbConnect();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
