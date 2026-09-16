const CATEGORY_LABELS = {
  planner: "Event Planner",
  performer: "Performer",
  crew: "Crew",
};

function formatLabel(key) {
  const spaced = key.replace(/([A-Z])/g, " $1");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function formatValue(value) {
  if (Array.isArray(value)) return value.length > 0 ? value.join(", ") : "-";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (value === "" || value === undefined || value === null) return "-";
  return String(value);
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-gray-100 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-900 text-right">{value}</span>
    </div>
  );
}

export default function Step4Review({ basics, details }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">
        Review and submit
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Check everything before this gets posted.
      </p>

      <h3 className="text-sm font-semibold text-gray-900 mb-2">Event basics</h3>
      <div className="mb-6">
        <Row label="Event name" value={basics.eventName} />
        <Row label="Event type" value={basics.eventType} />
        <Row
          label={basics.isDateRange ? "Dates" : "Date"}
          value={
            basics.isDateRange
              ? `${basics.startDate} to ${basics.endDate}`
              : basics.startDate
          }
        />
        <Row label="Location" value={basics.location} />
        <Row label="Venue" value={formatValue(basics.venue)} />
        <Row label="Looking for" value={CATEGORY_LABELS[basics.category]} />
      </div>

      <h3 className="text-sm font-semibold text-gray-900 mb-2">
        {CATEGORY_LABELS[basics.category]} requirements
      </h3>
      <div>
        {Object.entries(details).map(([key, value]) => (
          <Row key={key} label={formatLabel(key)} value={formatValue(value)} />
        ))}
      </div>
    </div>
  );
}
