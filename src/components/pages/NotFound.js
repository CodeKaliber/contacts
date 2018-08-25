import React from "react";

const NotFound = () => {
  return (
    <div>
      <h1 className="display-4">
        Ooops <span className="text-danger">404</span> Error
      </h1>
      <p className="lead">Page Not Found, Did You Enter The Wrong URL</p>
      <p className="text-secondary">Version 1.0.0</p>
    </div>
  );
};

export default NotFound;
