import React from 'react';

interface ErrorDisplayProps {
  errorMessage: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errorMessage }) => {
  return <p>Error: {errorMessage}</p>;
};

export default ErrorDisplay;
