import Field, { inputClass } from "../ui/Field";

const EVENT_TYPES = [
  "Wedding",
  "Corporate Event",
  "Concert",
  "Birthday / Private Party",
  "College Fest",
  "Conference",
  "Other",
];

const CATEGORIES = [
  {
    value: "planner",
    label: "Event Planner",
    hint: "Someone to plan and run the event",
  },
  {
    value: "performer",
    label: "Performer",
    hint: "Bands, DJs, dancers, comedians",
  },
  {
    value: "crew",
    label: "Crew",
    hint: "Sound, lights, stage, camera, security",
  },
];

export default function Step1EventBasics({ basics, onChange, errors }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Event basics</h2>
      <p className="text-sm text-gray-500 mb-6">
        Tell us about the event first.
      </p>

      <Field label="Event name" required error={errors.eventName}>
        <input
          className={inputClass}
          value={basics.eventName}
          onChange={(e) => onChange("eventName", e.target.value)}
          placeholder="e.g. Aarohi 2026 Cultural Night"
        />
      </Field>

      <Field label="Event type" required error={errors.eventType}>
        <select
          className={inputClass}
          value={basics.eventType}
          onChange={(e) => onChange("eventType", e.target.value)}
        >
          <option value="">Select an event type</option>
          {EVENT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Field>

      <div className="mb-5">
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={basics.isDateRange}
            onChange={(e) => onChange("isDateRange", e.target.checked)}
            className="h-4 w-4"
          />
          This event runs across multiple days
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label={basics.isDateRange ? "Start date" : "Event date"}
          required
          error={errors.startDate}
        >
          <input
            type="date"
            className={inputClass}
            value={basics.startDate}
            onChange={(e) => onChange("startDate", e.target.value)}
          />
        </Field>

        {basics.isDateRange && (
          <Field label="End date" required error={errors.endDate}>
            <input
              type="date"
              className={inputClass}
              value={basics.endDate}
              onChange={(e) => onChange("endDate", e.target.value)}
            />
          </Field>
        )}
      </div>

      <Field label="Location" required error={errors.location}>
        <input
          className={inputClass}
          value={basics.location}
          onChange={(e) => onChange("location", e.target.value)}
          placeholder="e.g. Kolhapur, Maharashtra"
        />
      </Field>

      <Field label="Venue" hint="Optional - leave blank if not finalised yet">
        <input
          className={inputClass}
          value={basics.venue}
          onChange={(e) => onChange("venue", e.target.value)}
          placeholder="e.g. Shahu Smarak Bhavan"
        />
      </Field>

      <Field label="Who are you looking for?" required error={errors.category}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {CATEGORIES.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() => onChange("category", category.value)}
              className={
                "rounded-md border p-3 text-left transition " +
                (basics.category === category.value
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-200 hover:border-gray-400")
              }
            >
              <div className="text-sm font-medium text-gray-900">
                {category.label}
              </div>
              <div className="text-xs text-gray-500 mt-1">{category.hint}</div>
            </button>
          ))}
        </div>
      </Field>
    </div>
  );
}
