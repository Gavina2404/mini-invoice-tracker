const Invoice = require("../models/Invoice");

const createInvoice = async (req, res) => {
  try {
    const {
      invoiceNumber,
      clientName,
      issueDate,
      lineItems,
      vatRate = 15,
      status
    } = req.body;

    let subtotal = 0;

    for (const item of lineItems) {
      subtotal += item.quantity * item.unitPrice;
    }

    const vatAmount = subtotal * (vatRate / 100);
    const total = subtotal + vatAmount;

    const invoice = new Invoice({
      invoiceNumber,
      clientName,
      issueDate,
      lineItems,
      vatRate,
      status,
      subtotal,
      vatAmount,
      total
    });

    await invoice.save();

    res.status(201).json(invoice);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createInvoice
};