import React from 'react';

export const AccessDenied: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Access Denied
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            This service is not available in your region
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Geographic Restriction
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p className="font-medium mb-2">Restricted Countries:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>China (CN)</li>
                    <li>Vietnam (VN)</li>
                    <li>Ukraine (UA)</li>
                    <li>Russia (RU)</li>
                    <li>North Korea (KP)</li>
                    <li>Uzbekistan (UZ)</li>
                  </ul>
                  
                  <p className="font-medium mt-4 mb-2">Restricted US States:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Pennsylvania (PA)</li>
                    <li>New York (NY)</li>
                    <li>Washington (WA)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="text-sm text-center">
            <a
              href="/privacy-policy.html"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              View our Privacy Policy for more information
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}; 