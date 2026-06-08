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

const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();

    res.status(200).json(invoices);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice not found"
      });
    }

    res.status(200).json(invoice);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const updateInvoice = async (req, res) => {
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

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      {
        invoiceNumber,
        clientName,
        issueDate,
        lineItems,
        vatRate,
        status,
        subtotal,
        vatAmount,
        total
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedInvoice) {
      return res.status(404).json({
        message: "Invoice not found"
      });
    }

    res.status(200).json(updatedInvoice);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const deleteInvoice = async (req, res) => {
  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);

    if (!deletedInvoice) {
      return res.status(404).json({
        message: "Invoice not found"
      });
    }

    res.status(200).json({
      message: "Invoice deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
module.exports = {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice
};