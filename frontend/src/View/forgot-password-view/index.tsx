import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '@/config/api';
import { toast } from 'react-toastify';
import AuthFooter from '@/components/auth-footer';

/**
 * Forgot Password View
 * 
 */

const ForgotPasswordView: React.FC = () => {
  // Hook to navigate between pages
  const navigate = useNavigate();
  
  // Step management
  const [step, setStep] = useState<'email' | 'security' | 'reset' | 'success'>('email');
  
  // Form states
  const [email, setEmail] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // API interaction states
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [userId, setUserId] = useState('');
  const [resetToken, setResetToken] = useState('');
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // --- Validation Helper ---
  const validatePassword = (password: string): string | null => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter.';
    }
    return null; // Password is valid
  };

  // Step 1: Check if email exists and move to security question
  const handleCheckEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Client-side validation
    if (!email) {
      setError('Email is required');
      toast.error('Email is required');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('Submitting email to verify:', email);
      
      // Call the real backend API to verify email
      const response = await fetch(API_ENDPOINTS.verifyEmail, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      // Get response text for debugging
      const responseText = await response.text();
      console.log('Raw API response:', responseText);
      
      // Parse JSON response
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Error parsing response as JSON:', parseError);
        throw new Error(`Invalid response from server: ${responseText.substring(0, 100)}...`);
      }
      
      console.log('Email verification parsed response:', data);
      
      // Check for error response
      if (!response.ok) {
        // 404 means email not found
        if (response.status === 404) {
          const errorMsg = data.error || 'Email address not found. Please check and try again.';
          toast.error(errorMsg);
          throw new Error(errorMsg);
        } 
        // Other errors
        const errorMsg = data.error || 'Failed to verify email';
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }
      
      // Success flow - email exists
      // The backend is returning a response with userId and securityQuestion even without a success flag
      if (data.securityQuestion && data.userId) {
        // Store necessary data for next step
        setSecurityQuestion(data.securityQuestion); // This is used to display the question to the user
        setUserId(data.userId);
        console.log(`Email verified successfully. UserId: ${data.userId}, Question: ${data.securityQuestion}`);
        
        // Show success message
        const successMsg = 'Email verified! Please answer the security question.';
        setSuccess(successMsg);
        toast.success(successMsg);
        
        // Move to security question step
        setStep('security');
      } else {
        const errorMsg = 'Incomplete response from server. Please try again.';
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }
    } catch (error: unknown) {
      console.error('Error verifying email:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage || 'An error occurred. Please try again.');
      // Toast error is already shown above when it happens
    } finally {
      setIsLoading(false);
    }
  };
  
  // Step 2: Verify security answer
  const handleVerifySecurityAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!securityAnswer) {
      const errorMsg = 'Please answer the security question';
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }
    
    // Client-side tip for the SQA testing (can be removed in production)
    if (securityAnswer.trim().toLowerCase() !== 'dog') {
      toast.info('Hint: For testing purposes, the answer is "dog"');
    }
    
    // Verify we have the required userId from the previous step
    if (!userId) {
      const errorMsg = 'Session information is missing. Please verify your email again.';
      setError(errorMsg);
      toast.error(errorMsg);
      setStep('email'); // Go back to email verification
      return;
    }
    
    // Trim whitespace from security answer
    const trimmedAnswer = securityAnswer.trim();
    
    setIsLoading(true);
    
    try {
      console.log(`Verifying security answer for email: ${email}, userId: ${userId}`);
      
      // Call the backend API to verify security answer
      const response = await fetch(API_ENDPOINTS.verifySecurityAnswer, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          email, 
          securityAnswer: trimmedAnswer,
          userId
        })
      });
      
      // Log request details for debugging
      console.log('Security answer verification request sent with:', { 
        email, 
        userId,
        securityAnswer: trimmedAnswer.replace(/./g, '*') // Mask answer in logs
      });
      
      // Get response text
      const responseText = await response.text();
      console.log('Raw API response:', responseText);
      
      // Parse JSON response
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Error parsing response as JSON:', parseError);
        throw new Error(`Invalid response from server: ${responseText.substring(0, 100)}...`);
      }
      
      // Check for errors
      if (!response.ok) {
        // 401 is incorrect answer
        if (response.status === 401) {
          const errorMsg = 'Incorrect answer to security question. Please try again.';
          toast.error(errorMsg);
          throw new Error(errorMsg);
        }
        // 404 is user not found
        if (response.status === 404) {
          const errorMsg = 'User information not found. Please restart the password reset process.';
          toast.error(errorMsg);
          throw new Error(errorMsg);
        }
        // Other errors
        const errorMsg = data.error || 'Failed to verify security answer';
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }
      
      // Success case - accept response format from server
      if (data.resetToken) {
        setResetToken(data.resetToken);
        const successMsg = 'Security answer verified. Please set your new password.';
        setSuccess(successMsg);
        toast.success(successMsg);
        // Move to password reset step
        setStep('reset');
      } else {
        const errorMsg = 'Incomplete server response. Missing reset token.';
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }
    } catch (error: unknown) {
      console.error('Security answer verification error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage || 'Verification failed. Please try again.');
      // Toast already shown for specific errors
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Reset password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Verify we have the required token from previous steps
    if (!resetToken) {
      const errorMsg = 'Reset token is missing. Please restart the password reset process.';
      setError(errorMsg);
      toast.error(errorMsg);
      setStep('email'); // Go back to email verification
      return;
    }

    // --- Password Validation ---
    // Check if password is empty
    if (!newPassword) {
      const errorMsg = 'Password is required';
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }
    
    // Check password requirements
    const passwordValidationError = validatePassword(newPassword);
    if (passwordValidationError) {
      setError(passwordValidationError);
      toast.error(passwordValidationError);
      return;
    }
    
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      const errorMsg = 'Passwords do not match.';
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }
    // --- End Password Validation ---

    setIsLoading(true);
    
    try {
      console.log(`Submitting password reset for: ${email}`);
      
      // Call the backend API to reset password
      const response = await fetch(API_ENDPOINTS.resetPassword, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          email, 
          newPassword,
          resetToken 
        })
      });
      
      // Get response text
      const responseText = await response.text();
      console.log('Raw API response:', responseText);
      
      // Parse JSON response
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Error parsing response as JSON:', parseError);
        throw new Error(`Invalid response from server: ${responseText.substring(0, 100)}...`);
      }
      
      // Check for errors
      if (!response.ok) {
        // 401 is token validation failure
        if (response.status === 401) {
          const errorMsg = 'Your reset session has expired. Please restart the password reset process.';
          toast.error(errorMsg);
          throw new Error(errorMsg);
        }
        // Other errors
        const errorMsg = data.error || 'Failed to reset password';
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }
      
      // The backend is now returning just { message: "success" } without a success flag
      // Accept any 200 OK response as success
      console.log('Password reset successful');
      const successMsg = 'Password reset successful! Redirecting to login...';
      setSuccess(successMsg);
      toast.success(successMsg);
      
      // Clear all form data for security
      setEmail('');
      setSecurityAnswer('');
      setNewPassword('');
      setConfirmPassword('');
      setUserId('');
      setResetToken('');
      
      // Move to success screen instead of immediate redirect
      setStep('success');
    } catch (error: unknown) {
      console.error('Error resetting password:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage || 'Failed to reset password. Please try again.');
      // Toast messages already shown for specific errors
    } finally {
      setIsLoading(false);
    }
  };

  // Go back to login page
  const handleBackToLogin = () => {
    navigate('/login');
    toast.info('Redirected to login page');
  };

  // --- Dynamic Content based on Step ---
  let pageTitle: string;
  let pageDescription: string;

  switch (step) {
    case 'security':
      pageTitle = 'Verify Your Identity';
      pageDescription = 'Please answer the security question';
      break;
    case 'reset':
      pageTitle = 'Reset Your Password';
      pageDescription = 'Create a new password for your account';
      break;
    case 'success':
      pageTitle = 'Password Reset Successful';
      pageDescription = 'Your password has been reset successfully';
      break;
    case 'email':
    default:
      pageTitle = 'Forgot Password';
      pageDescription = 'Enter your email address to verify your account';
      break;
  }
  // --- End Dynamic Content ---

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', overflowY: 'auto', zIndex: 50 }}>
      {/* Inline header similar to login page */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-md flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-bold text-white">JobRooster.lk</h1>
          <p className="text-blue-100 text-sm">Human Resource Management System</p>
        </div>
      </header>
      <main className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {pageTitle} {/* Use extracted title */}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {pageDescription} {/* Use extracted description */}
            </p>
          </div>
          
          {/* Step 1: Email Input */}
          {step === 'email' && (
            <form onSubmit={handleCheckEmail} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  disabled={isLoading}
                >
                  Back to login
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying
                    </>
                  ) : (
                    'Continue'
                  )}
                </button>
              </div>
              
              {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
            </form>
          )}
          
          {/* Step 2: Security Question */}
          {step === 'security' && (
            <form onSubmit={handleVerifySecurityAnswer} className="space-y-6">
              {/* Security Question */}
              <div>
                <label htmlFor="security-question" className="block text-sm font-medium text-gray-700">
                  Security Question
                </label>
                <div className="mt-1 text-sm text-gray-700 bg-gray-50 p-3 rounded-md border border-gray-200">
                  {securityQuestion || "What is your favorite pet's name?"}
                </div>
              </div>
              
              {/* Security Answer Input */}
              <div>
                <label htmlFor="security-answer" className="block text-sm font-medium text-gray-700">
                  Your Answer
                </label>
                <div className="mt-1">
                  <input
                    id="security-answer"
                    type="text"
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              {/* For testing purposes - show the answer */}
             
              
              {/* Error Messages */}
              <div className="mt-4">
                {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
                {success && <p className="text-green-500 text-xs italic mt-2">{success}</p>}
              </div>
              
              {/* Buttons */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  disabled={isLoading}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying
                    </>
                  ) : (
                    'Verify & Continue'
                  )}
                </button>
              </div>
            </form>
          )}
          
          {/* Step 3: Reset Password */}
          {step === 'reset' && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
                <div className="mt-1">
                  <input
                    id="new-password"
                    name="new-password"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    disabled={isLoading}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters with one uppercase letter.</p>
              </div>
              
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="mt-1">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              {/* Error and Success Messages */}
              <div className="mt-4">
                {error && <p className="text-red-500 text-sm p-2 bg-red-50 rounded">{error}</p>}
                {success && <p className="text-green-500 text-sm p-2 bg-green-50 rounded">{success}</p>}
              </div>
              
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('security')}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  disabled={isLoading}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Resetting...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </div>
            </form>
          )}
          
          {/* Success Screen */}
          {step === 'success' && (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Password Reset Successful!</h3>
              <p className="text-sm text-gray-600 mb-6">
                Your password has been reset successfully. You can now log in with your new password.
              </p>
              <button
                onClick={() => {
                  console.log('Navigating to login page');
                  navigate('/login?resetSuccess=true');
                  toast.success('Redirected to login page');
                }}
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Continue to Login
              </button>
            </div>
          )}
          
          {/* Back to Login Link (Visible except on success screen) */}
          {step !== 'success' && (
            <div className="text-center mt-6">
              <button 
                onClick={handleBackToLogin}
                className="text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
              >
                Remember your password? Back to Login
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Authentication Footer */}
      <AuthFooter className="flex-shrink-0 mt-auto" />
    </div>
  );
};

export default ForgotPasswordView;
