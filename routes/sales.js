const express = require("express");
const router = express.Router();
const {
  getMonthlySales,
  getAllTimeUnitsSold,
  getRecentOrders,
} = require("../controllers/salesController");
const { auth } = require("../middleware/authMiddleware");

// All routes in this file are protected and require a valid token.
// They also check if the user is an admin or the specific vendor making the request.

// @route    GET api/sales/vendors/:vendorId/monthly
// @desc     Get monthly sales for a vendor
router.get("/vendors/:vendorId/monthly", getMonthlySales);

// @route    GET api/sales/vendors/:vendorId/all-time-units
// @desc     Get all-time units sold for a vendor
router.get("/vendors/:vendorId/all-time-units", getAllTimeUnitsSold);
router.get("/orders/recent", getRecentOrders);

module.exports = router;
