# Mini Invoice Tracker
A full-stack invoice management application built for the Access Technologies Junior Software Engineer take-home challenge.

## Features
- Create invoices with line items
- List invoices
- View invoice details
- Edit invoices
- Delete invoices
- Automatic VAT calculation on the backend
- Basic validation

## Tech Stack
- Frontend: React (Vite), Axios
- Backend: Node.js, Express.js
- Database: MongoDB Atlas, Mongoose

## Setup

### Backend
Create a .env file inside the backend folder:

PORT=4000
MONGO_URI=your_mongodb_connection_string

Run:

cd backend
npm install
npm run dev

### Frontend
Open another terminal and run:

cd frontend
npm install
npm run dev

Frontend:
http://localhost:5173 

Backend:
http://localhost:4000 

## API Endpoints
http 
GET/api/invoices 
GET/api/invoices/:id 
POST/api/invoices 
PUT/api/invoices/:id 
DELETE /api/invoices/:id 

## Additional Information
See SUBMISSION.md for implementation details, assumptions, trade-offs, future improvements, and AI usage.
