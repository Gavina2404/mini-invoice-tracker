# Submission — Gavina Smriti Beharee

## Stack I chose
- Frontend: React (Vite), Axios
- Backend: Node.js, Express.js
- Database: MongoDB Atlas, Mongoose
- **Why this stack:**
I chose this stack because it is easy to learn, well documented and commonly used for full stack web applications. It allowed me to build the project efficiently while learning modern web development technologies.

## Time spent
~ 7-8 hours

## How to run
### Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB Atlas account or MongoDB instance

### Environment variables
- Create a .env file inside the backend folder:
PORT=4000
MONGO_URI=your_mongodb_connection_string

### Install & run
Backend:
cd backend
npm install
npm run dev

Frontend:
cd frontend
npm install
npm run dev

Frontend will run on:
http://localhost:5173

Backend API will run on:
http://localhost:4000

### Seed data (optional)
The provided sample-invoices.json file can be used to create invoices through the API or imported manually into MongoDB.

## What I built — core checklist
- Create an invoice (with line items)
- List invoices
- View one invoice (subtotal / VAT / total)
- Edit & delete an invoice
- Totals computed on the backend
- Basic validation

## Bonus I did
- Responsive user interface
- MongoDB Atlas cloud database integration

## Trade-offs & assumptions
- A single company invoice management workflow was assumed.
- Authentication was not implemented in order to focus on completing all core requirements within the expected time.
- Only basic validation was implemented using Mongoose schema validation and frontend form requirements.

## What I'd do with more time
- Add user authentication and authorization.
- Add search and filtering by client name and invoice status.
- Add pagination for large invoice lists.
- Improve error handling and user feedback.
- Add automated API and frontend tests.
- Deploy the application online.

## AI tools I used (be transparent — it's fine, just tell us)
- ChatGPT was used as a learning and development assistant for understanding React, Express, MongoDB Atlas configuration, debugging issues, and reviewing implementation approaches.
-  All code was reviewed, tested, and adapted before being integrated into the final solution.

