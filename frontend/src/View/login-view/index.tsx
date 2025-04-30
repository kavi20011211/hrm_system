import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// No need for ForgotPasswordModal as we're using a separate page
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '@/store/authSlice';
import { RootState } from '@/store/store';
import { API_ENDPOINTS } from '@/config/api';
import { toast } from 'react-toastify';
import AuthFooter from '@/components/auth-footer';

interface LoginResponse {
  token: string;
  role: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface LoginRequest {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  // Check if redirected from password reset with success message
  const [searchParams] = useState(new URLSearchParams(window.location.search));
  const resetSuccess = searchParams.get('resetSuccess') === 'true';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const { isLoading: loading, error: authError } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  // Show toast for reset success message
  useEffect(() => {
    if (resetSuccess) {
      toast.success('Password reset successful! You can now log in with your new password.');
    }
  }, [resetSuccess]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    dispatch(loginStart());

    // Comprehensive Validation
    if (!email) {
      const errorMsg = 'Email is required.';
      setError(errorMsg);
      dispatch(loginFailure(errorMsg));
      toast.error(errorMsg);
      return;
    }
    
    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const errorMsg = 'Please enter a valid email address.';
      setError(errorMsg);
      dispatch(loginFailure(errorMsg));
      toast.error(errorMsg);
      return;
    }
    
    if (!password) {
      const errorMsg = 'Password is required.';
      setError(errorMsg);
      dispatch(loginFailure(errorMsg));
      toast.error(errorMsg);
      return;
    }
    
    // Validate password minimum length
    if (password.length < 6) {
      const errorMsg = 'Password must be at least 6 characters.';
      setError(errorMsg);
      dispatch(loginFailure(errorMsg));
      toast.error(errorMsg);
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password } as LoginRequest),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Login failed';

        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }

        // Provide specific error messages based on status code
        if (response.status === 401) {
          errorMessage = 'Invalid email or password. Please try again.';
        } else if (response.status === 404) {
          errorMessage = 'User not found. Please check your email address.';
        } else if (response.status === 429) {
          errorMessage = 'Too many login attempts. Please try again later.';
        } else if (response.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        }
        
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json() as LoginResponse;

      if (data.token) {
        if (rememberMe) {
          localStorage.setItem('token', data.token);
        } else {
          sessionStorage.setItem('token', data.token);
        }

        dispatch(loginSuccess({
          user: {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.role
          },
          token: data.token
        }));

        toast.success(`Welcome back, ${data.user.name || 'User'}!`);
        navigate('/');
      } else {
        const errorMsg = 'Login successful, but no token received.';
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      dispatch(loginFailure(errorMessage));
      setError(errorMessage);
      // Toast error might have been shown above where specific errors are caught
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', overflowY: 'auto', zIndex: 50 }}>
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-md flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-bold text-white">JobRooster.lk</h1>
          <p className="text-blue-100 text-sm">Human Resource Management System</p>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center py-8 flex-grow">
        <div className="w-full max-w-md mx-auto space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <div className="mx-auto h-14 w-14 flex items-center justify-center rounded-full bg-blue-100">
              <svg className="h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-1 text-sm text-gray-500">Sign in to your account</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {error && (
              <div 
                className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <div className="mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  disabled={loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
            
            <div className="text-center mt-3">
              <button
                type="button"
                onClick={() => {
                  navigate('/forgot-password');
                  toast.info('Redirected to password reset page');
                }}
                className="text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
              >
                Forgot password?
              </button>
            </div>
          </form>

          <div className="text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none">
                Sign up
              </button>
            </p>
          </div>

          <div className="pt-4 text-center text-xs text-gray-500 border-t border-gray-100">
            <div className="flex items-center justify-center mb-1">
              <svg className="mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Secure Login
            </div>
            <p>Your connection to this site is secure</p>
          </div>
        </div>
      </main>

      {/* Authentication Footer */}
      <AuthFooter className="flex-shrink-0 mt-auto" />

      {/* We've removed the modal dialog and now only show toast notifications */}
    </div>
  );
};

export default LoginPage;