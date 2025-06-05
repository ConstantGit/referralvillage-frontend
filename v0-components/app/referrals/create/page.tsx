"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { StepIndicator } from "./step-indicator"
import { StepServiceDetails } from "./step-service-details"
import { StepLocationPrice } from "./step-location-price"
import { StepSharingOptions } from "./step-sharing-options"
import { ChevronLeft, ChevronRight, Save, Trash2, CheckCircle, AlertTriangle } from "lucide-react"
import { Breadcrumbs, generateBreadcrumbsFromPath } from "@/components/breadcrumbs"
import { usePathname, useRouter } from "next/navigation" // useRouter for beforeunload
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export type ReferralFormData = {
  serviceType: string
  description: string
  location: string
  price: string
  customPrice: string
  sharingType: "private" | "public" | "direct"
  generatedLink: string
  invitedProviderId?: string
  invitedProviderName?: string
}

const initialFormData: ReferralFormData = {
  serviceType: "",
  description: "",
  location: "",
  price: "100",
  customPrice: "",
  sharingType: "public",
  generatedLink: "",
  invitedProviderId: undefined,
  invitedProviderName: undefined,
}

const TOTAL_STEPS = 3
const LOCAL_STORAGE_KEY = "referralDraft"

interface SavedDraft {
  formData: ReferralFormData
  currentStep: number
  savedAt: string
}

export default function CreateReferralPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ReferralFormData>(initialFormData)
  const [isQuickCreateMode, setIsQuickCreateMode] = useState(false)
  const { toast } = useToast()
  const pathname = usePathname()
  const router = useRouter() // For beforeunload handling
  const breadcrumbItems = generateBreadcrumbsFromPath(pathname)

  const [showRestoreDraftBanner, setShowRestoreDraftBanner] = useState(false)
  const [draftToRestore, setDraftToRestore] = useState<SavedDraft | null>(null)
  const [lastSavedTimestamp, setLastSavedTimestamp] = useState<string | null>(null)
  const [saveIndicatorVisible, setSaveIndicatorVisible] = useState(false)

  const autoSaveIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const saveDraftToLocalStorage = useCallback(() => {
    try {
      const draft: SavedDraft = {
        formData,
        currentStep,
        savedAt: new Date().toISOString(),
      }
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(draft))
      const savedTime = new Date(draft.savedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      setLastSavedTimestamp(savedTime)
      setSaveIndicatorVisible(true)
      setTimeout(() => setSaveIndicatorVisible(false), 2000) // Hide indicator after 2s
      console.log("Draft saved locally at", savedTime)
      return true // Indicate success
    } catch (error) {
      console.error("Error saving draft to localStorage:", error)
      if (
        error instanceof DOMException &&
        (error.name === "QuotaExceededError" || error.name === "NS_ERROR_DOM_QUOTA_REACHED")
      ) {
        toast({
          title: "Save Failed",
          description: "Could not save draft. Local storage might be full.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Save Failed",
          description: "An unexpected error occurred while saving your draft.",
          variant: "destructive",
        })
      }
      return false // Indicate failure
    }
  }, [formData, currentStep, toast])

  const handleSaveDraft = () => {
    if (saveDraftToLocalStorage()) {
      toast({
        title: "Draft Saved Locally!",
        description: `Your referral progress was saved at ${new Date().toLocaleTimeString()}.`,
      })
    }
  }

  // Load draft on mount
  useEffect(() => {
    try {
      const savedDraftString = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (savedDraftString) {
        const savedDraft = JSON.parse(savedDraftString) as SavedDraft
        setDraftToRestore(savedDraft)
        setShowRestoreDraftBanner(true)
      }
    } catch (error) {
      console.error("Error loading draft from localStorage:", error)
      localStorage.removeItem(LOCAL_STORAGE_KEY) // Clear corrupted draft
    }
  }, [])

  // Auto-save every 10 seconds
  useEffect(() => {
    autoSaveIntervalRef.current = setInterval(() => {
      console.log("Auto-saving draft...")
      saveDraftToLocalStorage() // Save without toast for auto-save
    }, 10000) // 10 seconds

    return () => {
      if (autoSaveIntervalRef.current) {
        clearInterval(autoSaveIntervalRef.current)
      }
    }
  }, [saveDraftToLocalStorage])

  // Save before unload
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Don't show confirmation dialog, just save
      // For some browsers, to ensure it runs, you might need to set returnValue
      // event.preventDefault(); // Standard
      // event.returnValue = ''; // For older browsers
      console.log("Attempting to save draft before unload...")
      saveDraftToLocalStorage()
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      // Ensure final save if component unmounts (e.g. route change)
      // This might be redundant if beforeunload always fires, but good for safety
      // saveDraftToLocalStorage();
    }
  }, [saveDraftToLocalStorage, router])

  const updateFormData = (data: Partial<ReferralFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
      saveDraftToLocalStorage() // Save on step change
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      saveDraftToLocalStorage() // Save on step change
    }
  }

  const handleCreateReferral = () => {
    console.log("Referral Data:", formData)
    // ... (existing referral creation logic)
    let descriptionMessage = "Your referral has been created and is now live."
    if (formData.sharingType === "direct" && formData.invitedProviderName) {
      descriptionMessage = `Your referral has been created and an invitation sent directly to ${formData.invitedProviderName}.`
    } else if (formData.sharingType === "private") {
      descriptionMessage = "Your private referral has been created. Share the link to invite providers."
    }

    toast({
      title: "Referral Created!",
      description: descriptionMessage,
    })

    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY)
      setLastSavedTimestamp(null) // Clear save indicator
      console.log("Local draft cleared after successful referral creation.")
    } catch (error) {
      console.error("Error clearing draft from localStorage:", error)
    }
    // Optionally reset form:
    // setFormData(initialFormData);
    // setCurrentStep(1);
  }

  const handleRestoreDraft = () => {
    if (draftToRestore) {
      setFormData(draftToRestore.formData)
      setCurrentStep(draftToRestore.currentStep)
      setLastSavedTimestamp(
        new Date(draftToRestore.savedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      )
      setShowRestoreDraftBanner(false)
      setDraftToRestore(null)
      toast({
        title: "Draft Restored",
        description: "You're back where you left off!",
      })
    }
  }

  const handleStartFresh = () => {
    setFormData(initialFormData)
    setCurrentStep(1)
    setShowRestoreDraftBanner(false)
    setDraftToRestore(null)
    setLastSavedTimestamp(null)
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY)
    } catch (error) {
      console.error("Error clearing draft from localStorage:", error)
    }
    toast({
      title: "Started Fresh",
      description: "Previous draft discarded.",
    })
  }

  const handleClearDraft = () => {
    setFormData(initialFormData)
    setCurrentStep(1)
    setLastSavedTimestamp(null)
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY)
    } catch (error) {
      console.error("Error clearing draft from localStorage:", error)
    }
    toast({
      title: "Draft Cleared",
      description: "The current form has been reset and the local draft removed.",
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground lg:pl-0">
      {showRestoreDraftBanner && draftToRestore && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-100 dark:bg-yellow-700 border-b border-yellow-300 dark:border-yellow-600 p-4 text-center shadow-md">
          <div className="container mx-auto flex flex-col sm:flex-row justify-center items-center gap-4">
            <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-200" />
            <p className="text-sm text-yellow-800 dark:text-yellow-100">
              You have an unsaved draft from {new Date(draftToRestore.savedAt).toLocaleDateString()} at{" "}
              {new Date(draftToRestore.savedAt).toLocaleTimeString()}. Would you like to continue?
            </p>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <Button
                onClick={handleRestoreDraft}
                size="sm"
                variant="outline"
                className="bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                Restore Draft
              </Button>
              <Button onClick={handleStartFresh} size="sm" variant="destructive">
                Start Fresh
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className={`max-w-4xl mx-auto p-4 space-y-6 ${showRestoreDraftBanner ? "pt-24 sm:pt-20" : ""}`}>
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-center justify-center space-x-2 my-4">
          <Label htmlFor="quick-create-mode" className="text-sm font-medium text-muted-foreground">
            Standard Create
          </Label>
          <Switch id="quick-create-mode" checked={isQuickCreateMode} onCheckedChange={setIsQuickCreateMode} />
          <Label htmlFor="quick-create-mode" className="text-sm font-medium text-primary">
            Quick Create
          </Label>
        </div>

        <div className="text-center py-6 relative">
          <h1 className="text-heading-2xl text-foreground mb-2">Create New Referral</h1>
          <p className="text-body-md text-muted-foreground">Connect your customers with trusted service providers</p>
          {lastSavedTimestamp && (
            <div
              className={`absolute top-0 right-0 text-xs text-muted-foreground transition-opacity duration-500 ${saveIndicatorVisible ? "opacity-100" : "opacity-0"}`}
            >
              <CheckCircle className="h-3 w-3 inline mr-1 text-green-500" />
              Saved: {lastSavedTimestamp}
            </div>
          )}
        </div>

        <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} isQuickCreateMode={isQuickCreateMode} />

        <div className="space-y-8">
          {currentStep === 1 && (
            <StepServiceDetails
              formData={formData}
              updateFormData={updateFormData}
              isQuickCreateMode={isQuickCreateMode}
            />
          )}
          {currentStep === 2 && <StepLocationPrice formData={formData} updateFormData={updateFormData} />}
          {currentStep === 3 && <StepSharingOptions formData={formData} updateFormData={updateFormData} />}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 mt-8 border-t border-border">
          <div className="mb-4 sm:mb-0">
            {currentStep > 1 && (
              <Button variant="outline" onClick={prevStep} size="lg">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
            )}
          </div>
          <div className="flex flex-wrap items-center space-x-2 sm:space-x-4">
            <Button
              variant="ghost"
              onClick={handleClearDraft}
              size="sm"
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-1" /> Clear Draft
            </Button>
            {currentStep === TOTAL_STEPS && (
              <Button variant="outline" size="lg" onClick={handleSaveDraft}>
                <Save className="h-4 w-4 mr-2" /> Save Draft Manually
              </Button>
            )}
            {currentStep < TOTAL_STEPS ? (
              <Button onClick={nextStep} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleCreateReferral}
                disabled={formData.sharingType === "direct" && !formData.invitedProviderId}
              >
                {formData.sharingType === "direct" ? "Create & Invite Provider" : "Create & Share Referral"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
