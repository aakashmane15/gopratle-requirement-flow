import Field, { inputClass } from "../ui/Field";

const EQUIPMENT_OPTIONS = ["Host", "Performer", "Shared"];

const BUDGETS = [
  "Under 50,000",
  "50,000 - 2,00,000",
  "2,00,000 - 5,00,000",
  "Above 5,00,000",
];

export default function PerformerStep3({ details, onChange, errors }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">
        Performance logistics
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Timing, equipment and budget.
      </p>

      <Field
        label="Performance duration (minutes)"
        required
        error={errors.durationMinutes}
      >
        <input
          type="number"
          min="1"
          className={inputClass}
          value={details.durationMinutes}
          onChange={(e) => onChange("durationMinutes", e.target.value)}
          placeholder="e.g. 90"
        />
      </Field>

      <Field
        label="Sound and equipment provided by"
        required
        error={errors.equipmentProvidedBy}
      >
        <div className="flex flex-wrap gap-3">
          {EQUIPMENT_OPTIONS.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm cursor-pointer hover:bg-gray-50"
            >
              <input
                type="radio"
                name="equipmentProvidedBy"
                checked={details.equipmentProvidedBy === option}
                onChange={() => onChange("equipmentProvidedBy", option)}
                className="h-4 w-4"
              />
              {option}
            </label>
          ))}
        </div>
      </Field>

      <Field label="Budget range (INR)" required error={errors.budgetRange}>
        <select
          className={inputClass}
          value={details.budgetRange}
          onChange={(e) => onChange("budgetRange", e.target.value)}
        >
          <option value="">Select a budget range</option>
          {BUDGETS.map((budget) => (
            <option key={budget} value={budget}>
              {budget}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Additional notes" hint="Optional">
        <textarea
          rows={3}
          className={inputClass}
          value={details.notes}
          onChange={(e) => onChange("notes", e.target.value)}
          placeholder="Set list preferences, reference artists, anything else"
        />
      </Field>
    </div>
  );
}
