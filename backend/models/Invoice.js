const mongoose = require("mongoose");

const lineItemSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0
  }
});

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true
    },

    clientName: {
      type: String,
      required: true
    },

    issueDate: {
      type: Date,
      required: true
    },

    lineItems: {
      type: [lineItemSchema],
      required: true,
      validate: {
        validator: function (items) {
          return items.length > 0;
        },
        message: "At least one line item is required"
      }
    },

    vatRate: {
      type: Number,
      default: 15
    },

    status: {
      type: String,
      enum: ["draft", "sent", "paid"],
      default: "draft"
    },

    subtotal: {
      type: Number,
      default: 0
    },

    vatAmount: {
      type: Number,
      default: 0
    },

    total: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Invoice", invoiceSchema);