const express = require("express");
const { Requirement } = require("../db");
const { requirementSchema } = require("../validation");

const router = express.Router();

// POST /api/requirements - create a new requirement
router.post("/", async (req, res) => {
  // Testing
  console.log("POST /api/requirements received");

  const parsed = requirementSchema.safeParse(req.body);

  //Testing
  console.log("Validation completed");
  console.log("Attempting to save requirement");

  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation unsuccesfull",
    });
  }

  const data = parsed.data;

  try {
    const requirement = await Requirement.create({
      eventName: data.eventName,
      eventType: data.eventType,
      isDateRange: data.isDateRange,
      startDate: data.startDate,
      endDate: data.endDate,
      location: data.location,
      venue: data.venue || "",
      category: data.category,
      details: data.details,
    });

    // Testing
    console.log("Requirement saved:", requirement._id);

    res.status(201).json({
      message: "Requirement posted successfully",
      requirementId: requirement._id,
      category: data.category,
      data: requirement,
    });
  } catch (err) {
    console.error("Failed to post requirements: ", err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

// GET /api/requirements - get all requirements with newest first order
router.get("/:category", async (req, res) => {
  const { category } = req.params;

  const allowed = ["planner", "performer", "crew"];

  if (!allowed.includes(category)) {
    return res.status(400).json({
      message: "Invalid category",
    });
  }

  try {
    const requirements = await Requirement.find({ category }).sort({
      createdAt: -1,
    });

    res.json({
      category,
      count: requirements.length,
      requirements,
    });
  } catch (err) {
    console.error("Failed to fetch requirements:", err);

    res.status(500).json({
      message: "Something went wrong while fetching",
    });
  }
});

module.exports = router;
