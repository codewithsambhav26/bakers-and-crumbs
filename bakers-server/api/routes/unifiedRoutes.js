
const express = require("express");
const router = express.Router();

const cartRoutes = require("./cartRoutes");        // Import cart routes
const menuRoutes = require("./menuRoutes");        // Import menu routes
const paymentRoutes = require("./paymentRoutes");  // Import payment routes
const userRoutes = require("./userRoutes");        // Import user routes

// Use cart routes
router.use("/carts", cartRoutes);

// Use menu routes
router.use("/menu", menuRoutes);

// Use payment routes
router.use("/payments", paymentRoutes);

// Use user routes
router.use("/users", userRoutes);

module.exports = router;
