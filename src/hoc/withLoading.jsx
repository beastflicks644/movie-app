import React from 'react';

export default function withLoading(Component) {
  return function Wrapped({ isLoading, error, ...rest }) {
    if (isLoading) {
      return <div className="center">Loading...</div>;
    }
    if (error) {
      return <div className="error">Error: {String(error)}</div>;
    }
    return <Component {...rest} />;
  };
}