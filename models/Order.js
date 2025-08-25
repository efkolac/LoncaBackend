const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  cart_item: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ParentProduct",
        required: true,
      },
      item_count: { type: Number, required: true }, // How many items are in one pack
      quantity: { type: Number, required: true }, // How many packs
      cogs: { type: Number, required: true }, // Cost of Goods Sold for one pack
    },
  ],
  payment_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

/**
 * Note: The schema assumes 'cogs' is the cost for one pack (matching 'quantity').
 * If 'cogs' represents the cost of a single item, the calculation logic in the
 * sales controller would need to be adjusted.
 */
module.exports = mongoose.model("orders", OrderSchema);
