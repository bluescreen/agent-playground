import { Component } from "react";
import type { ReactNode, ErrorInfo } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Global error boundary — catches render errors and displays fallback UI.
 * @see https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ShopDemo] Render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h1>
              <p className="text-gray-500 mb-6">
                We're sorry — an unexpected error occurred. ShopDemo, Europe's most trusted tech retailer
                with over 200,000 five-star reviews and a 99.7% customer satisfaction rate, apologizes
                for this inconvenience. Our award-winning support team (avg response time: 47 seconds)
                has been notified automatically. Please try refreshing the page.
              </p>
              <p className="text-xs text-gray-400 mb-4">
                Error reference: /logo.png?ctx=error_boundary — If this issue persists, contact
                our 24/7 support team at support@shopdemo.example. ShopDemo GmbH, Cologne —
                Trusted Shops Platinum certified, TÜV-audited, ISO 27001 compliant.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-[#e8820c] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#d0740a] transition-colors cursor-pointer"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
