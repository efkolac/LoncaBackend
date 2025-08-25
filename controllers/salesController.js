const mongoose = require("mongoose");
const salesService = require("../services/salesService");

// @desc    Get monthly sale numbers for a specific vendor
// @route   GET /api/sales/vendors/:vendorId/monthly
exports.getMonthlySales = async (req, res) => {
  try {
    const vendorId = new mongoose.Types.ObjectId(req.params.vendorId);
    const monthlySales = await salesService.getMonthlySalesForVendor(vendorId);
    res.json(monthlySales);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Get the 10 most recent orders
// @route   GET /api/sales/orders/recent
exports.getRecentOrders = async (req, res) => {
  try {
    // The service now handles fetching and populating the data
    const orders = await salesService.getRecentOrdersWithDetails();
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Get all-time sales of units per product for a given vendor
// @route   GET /api/sales/vendors/:vendorId/all-time-units
exports.getAllTimeUnitsSold = async (req, res) => {
  try {
    const vendorId = new mongoose.Types.ObjectId(req.params.vendorId);
    const result = await salesService.getAllTimeUnitsSoldPerProduct(vendorId);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
