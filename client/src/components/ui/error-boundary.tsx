
import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Game error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-notebook p-4">
          <div className="bg-white border-3 border-ink rounded-lg p-8 max-w-md text-center">
            <h1 className="font-bangers text-3xl text-red-600 mb-4">Oops! 🐛</h1>
            <p className="font-caveat text-lg mb-4">
              Something went wrong with your startup journey!
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-highlighter hover:bg-blue-600 text-white font-caveat px-4 py-2 rounded"
            >
              🔄 Restart Game
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
