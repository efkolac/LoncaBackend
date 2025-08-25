const mongoose = require("mongoose");
const Order = require("../models/Order");

/**
 * Retrieves and calculates monthly sales value for a given vendor.
 * @param {mongoose.Types.ObjectId} vendorId - The ID of the vendor.
 * @returns {Promise<Array>} A promise that resolves to an array of monthly sales data.
 */
const getMonthlySalesForVendor = async (vendorId) => {
  return Order.aggregate([
    { $unwind: "$cart_item" },
    {
      $lookup: {
        from: "parent_products", // Corrected collection name
        localField: "cart_item.product",
        foreignField: "_id",
        as: "productInfo",
      },
    },
    { $unwind: "$productInfo" },
    { $match: { "productInfo.vendor": vendorId } },
    {
      $group: {
        _id: {
          year: { $year: "$payment_at" },
          month: { $month: "$payment_at" },
        },
        totalMonthlyValue: {
          $sum: { $multiply: ["$cart_item.cogs", "$cart_item.quantity"] },
        },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
    {
      $project: {
        _id: 0,
        period: {
          $concat: [
            { $toString: "$_id.year" },
            "-",
            { $toString: "$_id.month" },
          ],
        },
        salesValue: "$totalMonthlyValue",
      },
    },
  ]);
};

/**
 * Retrieves the 10 most recent orders with populated product and vendor details.
 * @returns {Promise<Array>} A promise that resolves to an array of the 10 most recent orders.
 */
const getRecentOrdersWithDetails = async () => {
  return Order.find()
    .sort({ payment_at: -1 })
    .limit(10)
    .populate({
      path: "cart_item.product",
      select: "name vendor",
      populate: {
        path: "vendor",
        model: "Vendor",
        select: "name",
      },
    });
};

/**
 * Retrieves all-time units sold for each product of a given vendor.
 * @param {mongoose.Types.ObjectId} vendorId - The ID of the vendor.
 * @returns {Promise<Array>} A promise that resolves to an array of products with their total units sold.
 */
const getAllTimeUnitsSoldPerProduct = async (vendorId) => {
  return Order.aggregate([
    { $unwind: "$cart_item" },
    {
      $lookup: {
        from: "parent_products", // Corrected collection name
        localField: "cart_item.product",
        foreignField: "_id",
        as: "productInfo",
      },
    },
    { $unwind: "$productInfo" },
    { $match: { "productInfo.vendor": vendorId } },
    {
      $group: {
        _id: {
          productId: "$productInfo._id",
          productName: "$productInfo.name",
        },
        totalUnitsSold: {
          $sum: { $multiply: ["$cart_item.quantity", "$cart_item.item_count"] },
        },
      },
    },
    { $sort: { "_id.productName": 1 } },
    {
      $project: {
        _id: 0,
        productId: "$_id.productId",
        productName: "$_id.productName",
        totalUnitsSold: "$totalUnitsSold",
      },
    },
  ]);
};

module.exports = {
  getMonthlySalesForVendor,
  getRecentOrdersWithDetails,
  getAllTimeUnitsSoldPerProduct,
};
