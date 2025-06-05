"use client" // Error Boundaries must be Client Components

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface Props {
  children: ReactNode
  fallbackMessage?: string
  showErrorMessage?: boolean // For development, might want to show the actual error
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null } // errorInfo is set in componentDidCatch
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo)
    this.setState({ error, errorInfo })

    // Example: Send error to a reporting service
    // reportErrorToService(error, errorInfo);
  }

  private handleReportIssue = () => {
    // Replace with your actual issue reporting mechanism
    // This could be a mailto link, a link to a support page, or an API call to a bug tracker
    const subject = encodeURIComponent("Issue Report - ReferralVillage")
    let body = encodeURIComponent(
      `Please describe the issue you encountered.\n\nError Details (optional, for debugging):\n`,
    )
    if (this.state.error) {
      body += encodeURIComponent(`Message: ${this.state.error.message}\n`)
    }
    if (this.state.errorInfo && this.state.errorInfo.componentStack) {
      body += encodeURIComponent(`Component Stack: ${this.state.errorInfo.componentStack}\n`)
    }
    window.location.href = `mailto:support@referralvillage.example.com?subject=${subject}&body=${body}`
    console.log("Report Issue clicked. Error:", this.state.error, "Info:", this.state.errorInfo)
  }

  private handleTryAgain = () => {
    // Attempt to recover by resetting the error state
    // This will re-render the children. If the error persists, it will be caught again.
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  public render() {
    if (this.state.hasError) {
      const {
        fallbackMessage = "Oops! Something went wrong.",
        showErrorMessage = process.env.NODE_ENV === "development",
      } = this.props

      return (
        <div
          className="flex flex-col items-center justify-center min-h-[300px] p-6 border border-destructive/30 bg-destructive/5 dark:bg-destructive/10 rounded-lg text-center text-destructive dark:text-red-400"
          role="alert"
        >
          <AlertTriangle className="h-12 w-12 text-destructive dark:text-red-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">{fallbackMessage}</h2>
          <p className="mb-4 text-sm text-destructive/80 dark:text-red-400/80">
            An unexpected error occurred. Please try again, or report this issue if it persists.
          </p>
          {showErrorMessage && this.state.error && (
            <details className="mb-4 text-left w-full max-w-md bg-destructive/10 dark:bg-destructive/20 p-3 rounded text-xs">
              <summary className="cursor-pointer font-medium">Error Details</summary>
              <pre className="mt-2 whitespace-pre-wrap break-all">
                {this.state.error.toString()}
                {this.state.errorInfo &&
                  this.state.errorInfo.componentStack &&
                  `\n\nComponent Stack:\n${this.state.errorInfo.componentStack}`}
              </pre>
            </details>
          )}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={this.handleTryAgain}
              className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive dark:border-red-400/50 dark:text-red-400 dark:hover:bg-red-400/10"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button
              variant="destructive"
              onClick={this.handleReportIssue}
              className="bg-destructive hover:bg-destructive/90 dark:bg-red-600 dark:hover:bg-red-700"
            >
              Report Issue
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
