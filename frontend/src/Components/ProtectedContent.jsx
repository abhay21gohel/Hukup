import React, { useState, useEffect } from "react";

const ProtectedContent = ({ children }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    const requestLocationPermission = () => {
      if (navigator.geolocation) {
      

        navigator.geolocation.getCurrentPosition(
          (data) => {
            

            setHasPermission(true);
            setLocationError(null);
          },
          (err) => {
            setLocationError(err.message);
            setHasPermission(false);
          }
        );
      } else {
        setLocationError("Geolocation is not supported by your browser.");
      }
    };

    requestLocationPermission();
  }, []);

  return (
    <div className="protected-content">
      {hasPermission ? (
        // Render the protected content if permission is granted
        <div>
          {children}
          hihihihihih
        </div>
      ) : (
        // Show a message if permission is not granted
        <div className="location-error">
          <p>
            Location access is required to view this content. Please grant
            location permission.
          </p>
          <button
            onClick={() => {
              window.location.reload(); // Reload the page to re-trigger the location request
            }}
            className="grant-permission-button"
          >
            Grant Permission
          </button>
          {locationError && <p>Error: {locationError}</p>}
        </div>
      )}
    </div>
  );
};

export default ProtectedContent;
