const Ticket = require("../models/ticket");


// CREATE TICKET
const createTicket = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Basic validation
        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required"
            });
        }

        const ticket = await Ticket.create({
            title,
            description,
            createdBy: req.user.userId
        });

        res.status(201).json({
            message: "Ticket created successfully",
            ticket
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create ticket",
            error: error.message
        });
    }
};


// GET TICKETS
const getTickets = async (req, res) => {
    try {
        let tickets;

        // Customer can only see their own tickets
        if (req.user.role === "customer") {
            tickets = await Ticket.find({
                createdBy: req.user.userId
            })
                .populate("createdBy", "name email")
                .populate("assignedTo", "name email")
                .sort({ createdAt: -1 });
        }

        // Agent and Admin can see all tickets
        else {
            tickets = await Ticket.find()
                .populate("createdBy", "name email")
                .populate("assignedTo", "name email")
                .sort({ createdAt: -1 });
        }

        res.status(200).json({
            count: tickets.length,
            tickets
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch tickets",
            error: error.message
        });
    }
};


// GET SINGLE TICKET
const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id)
            .populate("createdBy", "name email")
            .populate("assignedTo", "name email");

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found"
            });
        }

        // Customer can only access own ticket
        if (
            req.user.role === "customer" &&
            ticket.createdBy._id.toString() !== req.user.userId
        ) {
            return res.status(403).json({
                message: "You are not allowed to access this ticket"
            });
        }

        res.status(200).json(ticket);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch ticket",
            error: error.message
        });
    }
};


// UPDATE TICKET
const updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found"
            });
        }

        // Customer cannot update other users' tickets
        if (
            req.user.role === "customer" &&
            ticket.createdBy.toString() !== req.user.userId
        ) {
            return res.status(403).json({
                message: "You are not allowed to update this ticket"
            });
        }

        const { status, assignedTo } = req.body;

        // Update status if provided
        if (status) {
            ticket.status = status;
        }

        // Only agent/admin should assign tickets
        if (assignedTo && req.user.role !== "customer") {
            ticket.assignedTo = assignedTo;
        }

        await ticket.save();

        res.status(200).json({
            message: "Ticket updated successfully",
            ticket
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update ticket",
            error: error.message
        });
    }
};


// DELETE TICKET
const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found"
            });
        }

        // Customer can delete only own ticket
        if (
            req.user.role === "customer" &&
            ticket.createdBy.toString() !== req.user.userId
        ) {
            return res.status(403).json({
                message: "You are not allowed to delete this ticket"
            });
        }

        await ticket.deleteOne();

        res.status(200).json({
            message: "Ticket deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete ticket",
            error: error.message
        });
    }
};


module.exports = {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    deleteTicket
};