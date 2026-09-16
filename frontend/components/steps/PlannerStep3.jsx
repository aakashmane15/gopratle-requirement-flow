import Field, { inputClass } from "../ui/Field";

const EXPERIENCE = ["0 - 1 years", "1 - 3 years", "3 - 5 years", "5+ years"];

export default function PlannerStep3({ details, onChange, errors }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">
        Working details
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        How you want the planner to work with you.
      </p>

      <Field
        label="Planning should start from"
        required
        error={errors.planningStartsFrom}
      >
        <input
          type="date"
          className={inputClass}
          value={details.planningStartsFrom}
          onChange={(e) => onChange("planningStartsFrom", e.target.value)}
        />
      </Field>

      <Field
        label="Experience required"
        required
        error={errors.experienceRequired}
      >
        <select
          className={inputClass}
          value={details.experienceRequired}
          onChange={(e) => onChange("experienceRequired", e.target.value)}
        >
          <option value="">Select experience level</option>
          {EXPERIENCE.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </Field>

      <div className="mb-5">
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={details.onSiteCoordination}
            onChange={(e) => onChange("onSiteCoordination", e.target.checked)}
            className="h-4 w-4"
          />
          Planner must be present on-site on the event day
        </label>
      </div>

      <Field label="Additional notes" hint="Optional">
        <textarea
          rows={3}
          className={inputClass}
          value={details.notes}
          onChange={(e) => onChange("notes", e.target.value)}
          placeholder="Anything else the planner should know"
        />
      </Field>
    </div>
  );
}
