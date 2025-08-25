const express = require("express");
const router = express.Router();
const { getAllVendors } = require("../controllers/vendorController");

// @route    GET /api/vendors
// @desc     Get all vendors, sorted by name
// @access   Private
router.get("/", getAllVendors);

module.exports = router;
