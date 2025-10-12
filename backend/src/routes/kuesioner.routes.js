const express = require("express");
const router = express.Router();
const { createKuesioner } = require("../controllers/kuesioner.controller");

router.post("/", createKuesioner);

module.exports = router;
