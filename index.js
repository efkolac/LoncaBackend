const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body Parser Middleware
app.use(express.json());

// Enable CORS
app.use(cors());

// Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/sales", require("./routes/sales"));
// Add this line in index.js
app.use("/api/vendors", require("./routes/vendor"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
