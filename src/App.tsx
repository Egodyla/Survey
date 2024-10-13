import React, { ErrorInfo, ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';
import FeedbackPage from './components/FeedbackPage';
import ResultsPage from './components/ResultsPage';
import DetailsPage from './components/DetailsPage';

class ErrorBoundary extends React.Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<FeedbackPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/details" element={<DetailsPage />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;