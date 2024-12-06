const express = require("express");
const router = require("./routes/authRoutes");
const DbConnect = require("./database/DbConnect");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
DbConnect();
app.use(router);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
