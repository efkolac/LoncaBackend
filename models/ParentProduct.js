const mongoose = require("mongoose");

const ParentProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor", // This creates a reference to the Vendor model
    required: true,
  },
});

module.exports = mongoose.model("parent_products", ParentProductSchema);
