import { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 pt-24 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
            <span className="text-2xl font-bold">!</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-navy-900">Something went wrong</h1>
          <p className="max-w-md text-sm text-navy-600">
            We encountered an unexpected error while loading this page. Please try refreshing or go back to home.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              className="rounded-full bg-gold-500 px-6 py-2.5 text-sm font-bold text-navy-950 transition-all hover:bg-gold-400"
            >
              Refresh Page
            </button>
            <Link
              to="/"
              onClick={() => this.setState({ hasError: false })}
              className="rounded-full bg-navy-900 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-navy-800"
            >
              Go to Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

