const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Vendor = require("../models/Vendor");

// @desc    Register a new user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  const { username, password, role, vendorName } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    let vendorId;
    if (role === "vendor") {
      if (!vendorName) {
        return res
          .status(400)
          .json({ msg: "Vendor name is required for vendor role" });
      }
      // For simplicity, we find or create a vendor. In a real app, you might have a separate vendor creation process.
      let vendor = await Vendor.findOne({ name: vendorName });
      if (!vendor) {
        vendor = new Vendor({ name: vendorName });
        await vendor.save();
      }
      vendorId = vendor._id;
    }

    user = new User({ username, password, role, vendorId });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: { id: user.id, role: user.role, vendorId: user.vendorId },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Authenticate user & get token (Login)
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  // ... Implementation for login: find user, compare password, generate JWT
  // This is left as an exercise but would be very similar to the register function's JWT signing part.
  res.status(501).json({ msg: "Login endpoint not implemented yet." });
};
