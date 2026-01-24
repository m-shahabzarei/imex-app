/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
interface LoadingSpinnerProps {
  message?: string;
  error?: any;
  onRetry?: () => void;
}
const LoadingSpinner = ({
  message = 'در حال بارگذاری...',
  error = null,
  onRetry,
}: LoadingSpinnerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (error) {
      setIsLoading(false);
    }
  }, [error]);
if (error) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 text-center`}>
        <svg
          className="w-16 h-16 text-red-800 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-red-800 mb-2">خطایی رخ داده است</h3>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
          >
            دوباره تلاش کنید
          </button>
        )}
      </div>
    );
  }
return (
    <div className={`flex flex-col items-center justify-center p-8 text-center`}>
      {/* <div className="relative w-16 h-16 mb-4">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin" style={{ animationDuration: '1s' }}></div>
      </div> */}
      {/* <p className="text-gray-700 font-medium text-lg">{message}</p> */}
      <div className="mt-20 flex space-x-2">
        <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
        <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
        <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
      </div>
    </div>
  );
};
export default LoadingSpinner;