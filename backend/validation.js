const { z } = require("zod");

const plannerDetails = z.object({
  servicesNeeded: z.array(z.string()).min(1, "Select at least one service"),
  expectedGuests: z
    .number()
    .int()
    .positive("Guest count cannot be a negative number"),
  budgetRange: z.string().min(1, "Budget range is required"),
  planningStartsFrom: z.string().min(1, "Start date is required"),
  onSiteCoordination: z.boolean(),
  experienceRequired: z.string().min(1, "Experience is required"),
  notes: z.string().optional(),
});

const performerDetails = z.object({
  performanceType: z.string().min(1, "Performance type is required"),
  genre: z.string().min(1, "Genre or style is required"),
  teamSize: z.number().int().positive("Team size must be a positive number"),
  languages: z.array(z.string()).min(1, "Select at least one language"),
  durationMinutes: z
    .number()
    .int()
    .positive("Duration must be a positive number"),
  equipmentProvidedBy: z.enum(["Host", "Performer", "Shared"]),
  budgetRange: z.string().min(1, "Budget range is required"),
  notes: z.string().optional(),
});

const crewDetails = z.object({
  rolesNeeded: z.array(z.string()).min(1, "Select at least one role"),
  headcount: z.number().int().positive("Headcount must be a positive number"),
  experienceLevel: z.string().min(1, "Experience level is required"),
  callTime: z.string().min(1, "Call time is required"),
  wrapTime: z.string().min(1, "Wrap time is required"),
  equipmentProvided: z.boolean(),
  payPerPerson: z.string().min(1, "Pay range is required"),
  notes: z.string().optional(),
});

// Fields validation
const eventBasics = z.object({
  eventName: z.string().min(2, "Event name must be at least 2 characters"),
  eventType: z.string().min(1, "Event type is required"),
  isDateRange: z.boolean(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  location: z.string().min(2, "Location is required"),
  venue: z.string().optional(),
});

const requirementSchema = z.discriminatedUnion("category", [
  eventBasics.extend({
    category: z.literal("planner"),
    details: plannerDetails,
  }),
  eventBasics.extend({
    category: z.literal("performer"),
    details: performerDetails,
  }),
  eventBasics.extend({
    category: z.literal("crew"),
    details: crewDetails,
  }),
]);

module.exports = { requirementSchema };
