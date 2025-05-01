// Base URL for the backend API
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  login: `${API_BASE_URL}/api/users/login`,
  signup: `${API_BASE_URL}/api/users/signup`,
  jobs: `${API_BASE_URL}/api/jobs/create`,
  admin: `${API_BASE_URL}/api/admin`,

  // Password Reset Flow
  verifyEmail: `${API_BASE_URL}/api/users/verify-email`,
  verifySecurityAnswer: `${API_BASE_URL}/api/users/verify-security-answer`,
  resetPassword: `${API_BASE_URL}/api/users/reset-password`,
};
