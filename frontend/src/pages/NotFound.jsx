// src/NotFound.js
import React from "react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page Not Found</p>
        <p className="text-gray-500 mb-6">
          We can't seem to find the page you're looking for.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
