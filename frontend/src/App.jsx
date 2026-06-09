import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:4000/api/invoices";

function App() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    invoiceNumber: "",
    clientName: "",
    issueDate: "",
    vatRate: 15,
    status: "draft",
    lineItems: [
      {
        description: "",
        quantity: 1,
        unitPrice: 0
      }
    ]
  });

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(API_URL);
      setInvoices(response.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLineItemChange = (index, e) => {
    const updatedItems = [...formData.lineItems];

    updatedItems[index][e.target.name] =
      e.target.name === "quantity" || e.target.name === "unitPrice"
        ? Number(e.target.value)
        : e.target.value;

    setFormData({
      ...formData,
      lineItems: updatedItems
    });
  };

  const addLineItem = () => {
    setFormData({
      ...formData,
      lineItems: [
        ...formData.lineItems,
        {
          description: "",
          quantity: 1,
          unitPrice: 0
        }
      ]
    });
  };

  const removeLineItem = (index) => {
    const updatedItems = formData.lineItems.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      lineItems: updatedItems
    });
  };

  const resetForm = () => {
    setFormData({
      invoiceNumber: "",
      clientName: "",
      issueDate: "",
      vatRate: 15,
      status: "draft",
      lineItems: [
        {
          description: "",
          quantity: 1,
          unitPrice: 0
        }
      ]
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }

      resetForm();
      fetchInvoices();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const viewInvoice = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setSelectedInvoice(response.data);
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };

  const editInvoice = (invoice) => {
    setEditingId(invoice._id);

    setFormData({
      invoiceNumber: invoice.invoiceNumber,
      clientName: invoice.clientName,
      issueDate: invoice.issueDate.slice(0, 10),
      vatRate: invoice.vatRate,
      status: invoice.status,
      lineItems: invoice.lineItems.map((item) => ({
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice
      }))
    });
  };

  const deleteInvoice = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this invoice?");

    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchInvoices();
      setSelectedInvoice(null);
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  return (
    <div className="container">
      <h1>Mini Invoice Tracker</h1>

      <section className="card">
        <h2>{editingId ? "Edit Invoice" : "Create Invoice"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <input
              type="text"
              name="invoiceNumber"
              placeholder="Invoice Number"
              value={formData.invoiceNumber}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="clientName"
              placeholder="Client Name"
              value={formData.clientName}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              required
            />

            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          <h3>Line Items</h3>

          {formData.lineItems.map((item, index) => (
            <div className="line-item" key={index}>
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={item.description}
                onChange={(e) => handleLineItemChange(index, e)}
                required
              />

              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                min="1"
                value={item.quantity}
                onChange={(e) => handleLineItemChange(index, e)}
                required
              />

              <input
                type="number"
                name="unitPrice"
                placeholder="Unit Price"
                min="0"
                value={item.unitPrice}
                onChange={(e) => handleLineItemChange(index, e)}
                required
              />

              {formData.lineItems.length > 1 && (
                <button type="button" onClick={() => removeLineItem(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}

          <button type="button" onClick={addLineItem}>
            Add Line Item
          </button>

          <button type="submit">
            {editingId ? "Update Invoice" : "Create Invoice"}
          </button>

          {editingId && (
            <button type="button" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </form>
      </section>

      <section className="card">
        <h2>Invoices</h2>

        <table>
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Client</th>
              <th>Issue Date</th>
              <th>Total Incl. VAT</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice._id}>
                <td>{invoice.invoiceNumber}</td>
                <td>{invoice.clientName}</td>
                <td>{invoice.issueDate.slice(0, 10)}</td>
                <td>MUR {invoice.total.toFixed(2)}</td>
                <td>{invoice.status}</td>
                <td>
                  <button onClick={() => viewInvoice(invoice._id)}>View</button>
                  <button onClick={() => editInvoice(invoice)}>Edit</button>
                  <button onClick={() => deleteInvoice(invoice._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {selectedInvoice && (
        <section className="card">
          <h2>Invoice Details</h2>

          <p><strong>Invoice Number:</strong> {selectedInvoice.invoiceNumber}</p>
          <p><strong>Client:</strong> {selectedInvoice.clientName}</p>
          <p><strong>Status:</strong> {selectedInvoice.status}</p>

          <h3>Items</h3>

          <ul>
            {selectedInvoice.lineItems.map((item) => (
              <li key={item._id}>
                {item.description} — {item.quantity} × MUR {item.unitPrice}
              </li>
            ))}
          </ul>

          <p><strong>Subtotal:</strong> MUR {selectedInvoice.subtotal.toFixed(2)}</p>
          <p><strong>VAT:</strong> MUR {selectedInvoice.vatAmount.toFixed(2)}</p>
          <p><strong>Grand Total:</strong> MUR {selectedInvoice.total.toFixed(2)}</p>
        </section>
      )}
    </div>
  );
}

export default App;