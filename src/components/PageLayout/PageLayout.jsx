import React from 'react';
import Header from '../Header';

function PageLayout({ children }) {
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      {children}
    </div>
  );
}

export default PageLayout;
