const STEP_LABELS = ["Event basics", "Requirements", "Details", "Review"];

export default function Stepper({ current }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {STEP_LABELS.map((label, index) => {
        const stepNumber = index + 1;
        const isDone = stepNumber < current;
        const isActive = stepNumber === current;

        return (
          <div key={label} className="flex items-center gap-2 flex-1">
            <div
              className={
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium " +
                (isDone
                  ? "bg-gray-900 text-white"
                  : isActive
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200 text-gray-500")
              }
            >
              {stepNumber}
            </div>
            <span
              className={
                "hidden sm:block text-xs " +
                (isActive ? "text-gray-900 font-medium" : "text-gray-500")
              }
            >
              {label}
            </span>
            {index < STEP_LABELS.length - 1 && (
              <div className="h-px flex-1 bg-gray-200" />
            )}
          </div>
        );
      })}
    </div>
  );
}
