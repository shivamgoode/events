import express from "express";
import TicketLead from "../models/TicketLead.js";

const router = express.Router();

router.post("/", async (req, res) => {
  await TicketLead.create(req.body);
  res.json({ success: true });
});

export default router;
