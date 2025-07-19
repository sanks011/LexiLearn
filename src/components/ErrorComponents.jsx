import { useState } from 'react';
import { AlertCircle, RefreshCw, Home, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ErrorBoundary = ({ children, fallback }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  if (hasError) {
    return fallback || <ErrorFallback error={error} resetError={() => setHasError(false)} />;
  }

  return children;
};

const ErrorFallback = ({ 
  error, 
  resetError, 
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  showDetails = false
}) => {
  const [showErrorDetails, setShowErrorDetails] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center animate-fade-in-up">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        
        <p className="text-gray-600 mb-8">
          {description}
        </p>

        <div className="space-y-4">
          <button
            onClick={resetError}
            className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
          
          <Link
            to="/"
            className="w-full flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Link>
        </div>

        {showDetails && error && (
          <div className="mt-6">
            <button
              onClick={() => setShowErrorDetails(!showErrorDetails)}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center mx-auto"
            >
              Error Details
              <ChevronRight className={`w-4 h-4 ml-1 transition-transform duration-200 ${showErrorDetails ? 'rotate-90' : ''}`} />
            </button>
            
            {showErrorDetails && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg text-left">
                <pre className="text-xs text-gray-600 whitespace-pre-wrap break-words">
                  {error?.message || 'Unknown error'}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const InlineError = ({ 
  message, 
  retry, 
  className = '',
  variant = 'default'
}) => {
  const variants = {
    default: 'bg-red-50 border-red-200 text-red-800',
    minimal: 'bg-transparent text-red-600',
    solid: 'bg-red-600 text-white'
  };

  return (
    <div className={`p-4 rounded-lg border flex items-center space-x-3 ${variants[variant]} ${className}`}>
      <AlertCircle className="w-5 h-5 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      {retry && (
        <button
          onClick={retry}
          className="text-sm font-medium hover:underline focus:outline-none"
        >
          Retry
        </button>
      )}
    </div>
  );
};

const NetworkError = ({ onRetry }) => (
  <InlineError
    message="Network error. Please check your connection and try again."
    retry={onRetry}
  />
);

const NotFound = ({ resource = 'page' }) => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">
      {resource.charAt(0).toUpperCase() + resource.slice(1)} Not Found
    </h2>
    <p className="text-gray-600 mb-6">
      The {resource} you're looking for doesn't exist.
    </p>
    <Link
      to="/"
      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
    >
      <Home className="w-4 h-4 mr-2" />
      Go Home
    </Link>
  </div>
);

export { ErrorBoundary, ErrorFallback, InlineError, NetworkError, NotFound };
