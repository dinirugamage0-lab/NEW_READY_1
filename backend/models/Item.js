const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // quantity must be a number and at least 1
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    // price must be a number and at least 0
    price : {
      type: Number,
      required: true,
      min: 0
    },
    // category is a String (e.g., "Food", "Electronics")
    category: {
      type: String,
      required: true,
    },
    // totalPrice is calculated in the route before saving
    totalPrice: {
      type: Number,
      required: true,
    }
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemSchema);
