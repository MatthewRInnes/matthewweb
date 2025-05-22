// Import hooks from react-router-dom and React
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

// NotFound component displays a 404 error page for non-existent routes
const NotFound = () => {
  // Get the current location from the router
  const location = useLocation();

  // Log the 404 error to the console for debugging
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    // Main container for the 404 page, centred on the screen
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        {/* Large 404 heading */}
        <h1 className="text-4xl font-bold mb-4">404</h1>
        {/* Friendly error message */}
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        {/* Link to return to the homepage */}
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
