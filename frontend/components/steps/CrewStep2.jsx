import Field, { inputClass } from "../ui/Field";
import CheckboxGroup from "../ui/CheckboxGroup";

const ROLES = [
  "Sound engineer",
  "Lighting technician",
  "Stage hands",
  "Camera / Video",
  "Photographer",
  "Security",
  "Ushers / Registration",
];

const EXPERIENCE = ["Fresher", "1 - 3 years", "3+ years"];

export default function CrewStep2({ details, onChange, errors }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">
        Which roles do you need?
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Pick every role you want to hire for.
      </p>

      <Field label="Roles needed" required error={errors.rolesNeeded}>
        <CheckboxGroup
          options={ROLES}
          selected={details.rolesNeeded}
          onChange={(value) => onChange("rolesNeeded", value)}
        />
      </Field>

      <Field label="Total headcount" required error={errors.headcount}>
        <input
          type="number"
          min="1"
          className={inputClass}
          value={details.headcount}
          onChange={(e) => onChange("headcount", e.target.value)}
          placeholder="e.g. 12"
        />
      </Field>

      <Field label="Experience level" required error={errors.experienceLevel}>
        <select
          className={inputClass}
          value={details.experienceLevel}
          onChange={(e) => onChange("experienceLevel", e.target.value)}
        >
          <option value="">Select experience level</option>
          {EXPERIENCE.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </Field>
    </div>
  );
}
