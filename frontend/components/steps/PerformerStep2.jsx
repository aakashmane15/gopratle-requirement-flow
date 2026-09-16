import Field, { inputClass } from "../ui/Field";
import CheckboxGroup from "../ui/CheckboxGroup";

const PERFORMANCE_TYPES = [
  "Live band",
  "DJ",
  "Solo singer",
  "Dance troupe",
  "Stand-up comedian",
  "Magician",
  "Anchor / Emcee",
  "Other",
];

const LANGUAGES = ["Hindi", "English", "Marathi", "Punjabi", "Tamil", "Other"];

export default function PerformerStep2({ details, onChange, errors }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">
        What kind of performance?
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Describe the act you are looking for.
      </p>

      <Field label="Performance type" required error={errors.performanceType}>
        <select
          className={inputClass}
          value={details.performanceType}
          onChange={(e) => onChange("performanceType", e.target.value)}
        >
          <option value="">Select a performance type</option>
          {PERFORMANCE_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Genre or style" required error={errors.genre}>
        <input
          className={inputClass}
          value={details.genre}
          onChange={(e) => onChange("genre", e.target.value)}
          placeholder="e.g. Bollywood retro, Sufi, EDM, Kathak"
        />
      </Field>

      <Field label="Number of performers" required error={errors.teamSize}>
        <input
          type="number"
          min="1"
          className={inputClass}
          value={details.teamSize}
          onChange={(e) => onChange("teamSize", e.target.value)}
          placeholder="e.g. 5"
        />
      </Field>

      <Field label="Languages" required error={errors.languages}>
        <CheckboxGroup
          options={LANGUAGES}
          selected={details.languages}
          onChange={(value) => onChange("languages", value)}
        />
      </Field>
    </div>
  );
}
