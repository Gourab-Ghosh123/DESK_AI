const express = require("express");

const router = express.Router();

const {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    deleteTicket,
    generateAITicketResponse
} = require("../controllers/ticketController");

const protect = require("../middleware/authMiddleware");


// All ticket routes require login

// POST /api/tickets
router.post("/", protect, createTicket);


// GET /api/tickets
router.get("/", protect, getTickets);


// GET /api/tickets/:id
router.get("/:id", protect, getTicketById);


// PUT /api/tickets/:id
router.put("/:id", protect, updateTicket);


// DELETE /api/tickets/:id
router.delete("/:id", protect, deleteTicket);

router.post(
    "/:id/generate-response",
    protect,
    generateAITicketResponse
);


module.exports = router;