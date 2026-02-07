
require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@bakers-cluster.8ezxh.mongodb.net/bakers-and-crumbs?retryWrites=true&w=majority&appName=bakers-cluster`
  )
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// JWT Authentication
app.post("/api/jwt", async (req, res) => {
  try {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1hr",
    });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: "Failed to generate JWT" });
  }
});

// Stripe Payment Route
app.post("/api/payments/create-payment-intent", async (req, res) => {
  try {
    const { price } = req.body;
    const amount = price * 100;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: "Failed to create payment intent" });
  }
});



// Import Unified Routes
const unifiedRoutes = require("./api/routes/unifiedRoutes");
app.use("/api", unifiedRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to Bakers & Crumbs API");
});

// Start Server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
