import RequirementForm from "@/components/RequirementForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto max-w-2xl">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Post a requirement
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Tell us about your event and who you need.
          </p>
        </header>
        <RequirementForm />
      </div>
    </main>
  );
}
