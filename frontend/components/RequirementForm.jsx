"use client";

import { useState } from "react";
import axios from "axios";

import Stepper from "./Stepper";
import Step1EventBasics from "./steps/Step1EventBasics";
import PlannerStep2 from "./steps/PlannerStep2";
import PlannerStep3 from "./steps/PlannerStep3";
import PerformerStep2 from "./steps/PerformerStep2";
import PerformerStep3 from "./steps/PerformerStep3";
import CrewStep2 from "./steps/CrewStep2";
import CrewStep3 from "./steps/CrewStep3";
import Step4Review from "./steps/Step4Review";
import { detailDefaults } from "@/lib/defaults";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const emptyBasics = {
  eventName: "",
  eventType: "",
  isDateRange: false,
  startDate: "",
  endDate: "",
  location: "",
  venue: "",
  category: "",
};

export default function RequirementForm() {
  const [step, setStep] = useState(1);
  const [basics, setBasics] = useState(emptyBasics);
  const [details, setDetails] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [saved, setSaved] = useState(null);

  function updateBasics(field, value) {
    // Changing the category swaps in a fresh set of Step 2 / 3 fields.
    if (field === "category") {
      setDetails(detailDefaults[value]);
    }
    setBasics((prev) => ({ ...prev, [field]: value }));
    setErrors({});
  }

  function updateDetails(field, value) {
    setDetails((prev) => ({ ...prev, [field]: value }));
    setErrors({});
  }

  function validateStep() {
    const found = {};

    if (step === 1) {
      if (!basics.eventName.trim()) found.eventName = "Event name is required";
      if (!basics.eventType) found.eventType = "Select an event type";
      if (!basics.startDate) found.startDate = "Date is required";
      if (basics.isDateRange && !basics.endDate) {
        found.endDate = "End date is required for a multi-day event";
      }
      if (
        basics.isDateRange &&
        basics.endDate &&
        basics.endDate < basics.startDate
      ) {
        found.endDate = "End date cannot be before the start date";
      }
      if (!basics.location.trim()) found.location = "Location is required";
      if (!basics.category) found.category = "Select who you are looking for";
    }

    if (step === 2 && basics.category === "planner") {
      if (details.servicesNeeded.length === 0)
        found.servicesNeeded = "Select at least one service";
      if (!details.expectedGuests)
        found.expectedGuests = "Guest count is required";
      if (!details.budgetRange) found.budgetRange = "Select a budget range";
    }

    if (step === 3 && basics.category === "planner") {
      if (!details.planningStartsFrom)
        found.planningStartsFrom = "Start date is required";
      if (!details.experienceRequired)
        found.experienceRequired = "Select an experience level";
    }

    if (step === 2 && basics.category === "performer") {
      if (!details.performanceType)
        found.performanceType = "Select a performance type";
      if (!details.genre.trim()) found.genre = "Genre or style is required";
      if (!details.teamSize)
        found.teamSize = "Number of performers is required";
      if (details.languages.length === 0)
        found.languages = "Select at least one language";
    }

    if (step === 3 && basics.category === "performer") {
      if (!details.durationMinutes)
        found.durationMinutes = "Duration is required";
      if (!details.equipmentProvidedBy)
        found.equipmentProvidedBy = "Select who provides equipment";
      if (!details.budgetRange) found.budgetRange = "Select a budget range";
    }

    if (step === 2 && basics.category === "crew") {
      if (details.rolesNeeded.length === 0)
        found.rolesNeeded = "Select at least one role";
      if (!details.headcount) found.headcount = "Headcount is required";
      if (!details.experienceLevel)
        found.experienceLevel = "Select an experience level";
    }

    if (step === 3 && basics.category === "crew") {
      if (!details.callTime) found.callTime = "Call time is required";
      if (!details.wrapTime) found.wrapTime = "Wrap time is required";
      if (!details.payPerPerson) found.payPerPerson = "Select a pay range";
    }

    return found;
  }

  function handleNext() {
    const found = validateStep();
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }
    setErrors({});
    setStep(step + 1);
  }

  function handleBack() {
    setErrors({});
    setStep(step - 1);
  }

  // Number inputs give us strings. Zod on the backend expects real numbers,
  // so we convert here before sending.
  function buildPayload() {
    const payload = {
      eventName: basics.eventName.trim(),
      eventType: basics.eventType,
      isDateRange: basics.isDateRange,
      startDate: basics.startDate,
      location: basics.location.trim(),
      venue: basics.venue.trim(),
      category: basics.category,
      details: { ...details },
    };

    if (basics.isDateRange) {
      payload.endDate = basics.endDate;
    }

    if (basics.category === "planner") {
      payload.details.expectedGuests = Number(details.expectedGuests);
    }
    if (basics.category === "performer") {
      payload.details.teamSize = Number(details.teamSize);
      payload.details.durationMinutes = Number(details.durationMinutes);
    }
    if (basics.category === "crew") {
      payload.details.headcount = Number(details.headcount);
    }

    return payload;
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await axios.post(
        `${API_URL}/api/requirements`,
        buildPayload(),
      );
      setSaved(response.data);
      setStep(5);
    } catch (err) {
      if (err.response && err.response.data) {
        setSubmitError(
          err.response.data.message || "The server rejected the request",
        );
        console.log("Server validation errors:", err.response.data.errors);
      } else {
        setSubmitError(
          "Could not reach the server. Check that the backend is running.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  function startOver() {
    setStep(1);
    setBasics(emptyBasics);
    setDetails({});
    setErrors({});
    setSaved(null);
    setSubmitError("");
  }

  // Picks the right Step 2 / Step 3 component for the chosen category.
  function renderCategoryStep() {
    const stepMap = {
      planner: { 2: PlannerStep2, 3: PlannerStep3 },
      performer: { 2: PerformerStep2, 3: PerformerStep3 },
      crew: { 2: CrewStep2, 3: CrewStep3 },
    };

    const StepComponent = stepMap[basics.category][step];

    return (
      <StepComponent
        details={details}
        onChange={updateDetails}
        errors={errors}
      />
    );
  }

  if (step === 5 && saved) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Requirement posted
        </h2>
        <p className="text-sm text-gray-600 mb-4">{saved.message}</p>

        <div className="rounded-md bg-gray-50 p-4 text-sm mb-4">
          <div className="flex justify-between py-1">
            <span className="text-gray-500">Saved under category</span>
            <span className="font-medium text-gray-900">{saved.category}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-500">MongoDB document ID</span>
            <span className="font-mono text-xs text-gray-900">
              {saved.requirementId}
            </span>
          </div>
        </div>

        <details className="mb-4">
          <summary className="cursor-pointer text-sm text-gray-600">
            View the saved document
          </summary>
          <pre className="mt-2 overflow-x-auto rounded-md bg-gray-900 p-3 text-xs text-gray-100">
            {JSON.stringify(saved.data, null, 2)}
          </pre>
        </details>

        <button
          onClick={startOver}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800"
        >
          Post another requirement
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <Stepper current={step} />

      {step === 1 && (
        <Step1EventBasics
          basics={basics}
          onChange={updateBasics}
          errors={errors}
        />
      )}
      {(step === 2 || step === 3) && renderCategoryStep()}
      {step === 4 && <Step4Review basics={basics} details={details} />}

      {submitError && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {submitError}
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <button
          onClick={handleBack}
          disabled={step === 1}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 disabled:opacity-40"
        >
          Back
        </button>

        {step < 4 ? (
          <button
            onClick={handleNext}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit requirement"}
          </button>
        )}
      </div>
    </div>
  );
}
