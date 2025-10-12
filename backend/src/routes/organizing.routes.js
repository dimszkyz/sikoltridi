// backend/src/routes/organizing.routes.js
const express = require("express");
const router = express.Router();
const {
  listOrganizing,
  createOrganizing,
  deleteOrganizing,
} = require("../controllers/organizingController");
const { uploadOrganizing } = require("../middlewares/uploadOrganizing");

router.get("/", listOrganizing);

router.post(
  "/",
  (req, res, next) => {
    uploadOrganizing(req, res, (err) => {
      if (err) return res.status(400).json({ message: err.message });
      next();
    });
  },
  createOrganizing
);

router.delete("/:id", deleteOrganizing);

module.exports = router;
