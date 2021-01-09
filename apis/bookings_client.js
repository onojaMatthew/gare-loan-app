const express = require("express");

const { bookingsCall } = require("../controller/bookings_client");

const router = express.Router();

router.post("/gare_bookings/loan", bookingsCall);

module.exports = router;