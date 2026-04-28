import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error('ErrorBoundary caught:', error, info);
    }
  }

  reset = () => this.setState({ error: null });

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-tinder-bg text-tinder-text">
        <div className="max-w-sm text-center">
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-sm text-tinder-muted mb-5">
            The app hit an unexpected error. Try reloading — your matches and messages are saved.
          </p>
          <button
            onClick={() => {
              this.reset();
              window.location.reload();
            }}
            className="px-5 py-3 rounded-full bg-tinder-gradient text-white font-semibold"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }
}
