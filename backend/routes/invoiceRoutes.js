const express = require("express");

const {
  createInvoice,
  getInvoices,
  getInvoiceById
} = require("../controllers/invoiceController");

const router = express.Router();

router.post("/", createInvoice);
router.get("/", getInvoices);
router.get("/:id", getInvoiceById);

module.exports = router;