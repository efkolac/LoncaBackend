const Vendor = require("../models/Vendor");

/**
 * @desc    Get all vendors
 * @route   GET /api/vendors
 * @access  Private (requires auth)
 */
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ name: "asc" });
    res.json(vendors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
