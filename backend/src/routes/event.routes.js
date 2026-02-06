import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

/**
 * GET /api/events
 * Query params:
 *  - city (default: Sydney)
 *  - q (optional search)
 */
router.get("/", async (req, res) => {
  try {
    const { city = "Sydney", q } = req.query;

    // 🔥 Case-insensitive city match
    const query = {
      city: { $regex: `^${city}$`, $options: "i" },
    };

    // 🔍 Optional search
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    const events = await Event.find(query).sort({ datetime: 1 });

    return res.status(200).json(events);
  } catch (error) {
    console.error("❌ GET /api/events failed:", error);
    return res.status(500).json({
      message: "Failed to fetch events",
    });
  }
});

export default router;
