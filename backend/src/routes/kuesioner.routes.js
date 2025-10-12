const express = require("express");
const router = express.Router();
const { createKuesioner, getAllKuesioner, } = require("../controllers/kuesioner.controller");

router.post("/", createKuesioner);
router.get("/", getAllKuesioner);

module.exports = router;
