export const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-900";

export default function Field({ label, required, error, hint, children }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-800 mb-1">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {hint && <p className="text-xs text-gray-500 mb-2">{hint}</p>}
      {children}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
