const express = require("express");

const {
    registerUser,
    loginUser,
    getAgents
} = require("../controllers/authControllers");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// POST /api/auth/register
router.post("/register", registerUser);


// POST /api/auth/login
router.post("/login", loginUser);

router.get("/agents", protect, getAgents);


module.exports = router;