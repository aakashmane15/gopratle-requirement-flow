const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const requirementSchema = new Schema({
  // Fields - would be same for everything
  eventName: { type: String, required: true },
  eventType: { type: String, required: true },
  isDateRange: { type: Boolean, default: false },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  venue: { type: String, default: "" },

  // Categorise the requirements
  category: {
    type: String,
    required: true,
    enum: ["planner", "performer", "crew"],
  },

  details: {
    type: Schema.Types.Mixed,
    required: true,
  },

  createdAt: { type: Date, default: Date.now },
});

const Requirement = mongoose.model("Requirement", requirementSchema);

module.exports = { Requirement };
