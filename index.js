const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const newsletterRoutes = require("./routes/newsletterRoutes");
const ContactUsRoutes = require("./routes/ContactusRoutes");
const BlogRoutes = require("./routes/BlogRoutes");
const AuthRoutes = require("./routes/AuthRoutes");
const CareerRoutes = require("./routes/CareerRoutes");

const connectDB = require("./configuration/connectDB");

const app = express();

dotenv.config();
const port = process.env.PORT || 4000;
connectDB();

app.use(express.json());

app.use(cors());

app.use(bodyParser.json());

app.use("/api/newsletter", newsletterRoutes);
app.use("/api", ContactUsRoutes);
app.use("/api/blog", BlogRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/job", CareerRoutes);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running",
  });
});

app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});
