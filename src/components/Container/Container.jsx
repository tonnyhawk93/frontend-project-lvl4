import React from 'react';

function Container({ children }) {
  return (
    <div className="container-fluid h-100">
      {children}
    </div>
  );
}

export default Container;
