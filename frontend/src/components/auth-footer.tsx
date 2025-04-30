import React from 'react';

interface AuthFooterProps {
  // Optional props for customization
  companyName?: string;
  year?: number;
  className?: string;
}

/**
 * Consistent footer component for authentication screens (login, forgot password, etc.)
 */
const AuthFooter: React.FC<AuthFooterProps> = ({ 
  companyName = "JobRooster.lk",
  year = new Date().getFullYear(),
  className = ""
}) => {
  return (
    <footer className={`py-4 border-t border-gray-200 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              &copy; {year} {companyName}. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Human Resource Management System 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AuthFooter;
