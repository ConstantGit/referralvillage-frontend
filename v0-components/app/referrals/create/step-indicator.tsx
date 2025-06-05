"use client"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const steps = [
    { id: 1, name: "Service Details" },
    { id: 2, name: "Location & Price" },
    { id: 3, name: "Sharing Options" },
  ]

  return (
    <nav aria-label="Progress" className="mb-8">
      <ol role="list" className="flex items-center justify-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : ""}`}>
            {step.id < currentStep ? (
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="h-0.5 w-full bg-purple-600" />
              </div>
            ) : step.id === currentStep ? (
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="h-0.5 w-full bg-gray-200" />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="h-0.5 w-full bg-gray-200" />
              </div>
            )}
            {step.id < currentStep ? (
              <a
                href="#"
                className="relative flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 hover:bg-purple-700"
              >
                <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">{step.name} - Completed</span>
              </a>
            ) : step.id === currentStep ? (
              <a
                href="#"
                className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-purple-600 bg-white"
                aria-current="step"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-purple-600" aria-hidden="true" />
                <span className="sr-only">{step.name} - Current</span>
              </a>
            ) : (
              <a
                href="#"
                className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" aria-hidden="true" />
                <span className="sr-only">{step.name} - Upcoming</span>
              </a>
            )}
            <p className="absolute -bottom-6 text-body-sm font-medium text-gray-700 whitespace-nowrap">{step.name}</p>
          </li>
        ))}
      </ol>
    </nav>
  )
}
