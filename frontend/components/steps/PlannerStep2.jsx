import Field, { inputClass } from "../ui/Field";
import CheckboxGroup from "../ui/CheckboxGroup";

const SERVICES = [
  "Full event planning",
  "Vendor coordination",
  "Decor and styling",
  "Catering coordination",
  "Logistics and transport",
  "Guest management",
];

const BUDGETS = [
  "Under 50,000",
  "50,000 - 2,00,000",
  "2,00,000 - 5,00,000",
  "Above 5,00,000",
];

export default function PlannerStep2({ details, onChange, errors }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">
        What do you need planned?
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Scope of work for the event planner.
      </p>

      <Field label="Services needed" required error={errors.servicesNeeded}>
        <CheckboxGroup
          options={SERVICES}
          selected={details.servicesNeeded}
          onChange={(value) => onChange("servicesNeeded", value)}
        />
      </Field>

      <Field
        label="Expected number of guests"
        required
        error={errors.expectedGuests}
      >
        <input
          type="number"
          min="1"
          className={inputClass}
          value={details.expectedGuests}
          onChange={(e) => onChange("expectedGuests", e.target.value)}
          placeholder="e.g. 250"
        />
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
    </div>
  );
}
