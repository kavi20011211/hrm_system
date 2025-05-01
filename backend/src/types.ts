export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
  role?: string; // Add optional role field
  securityAnswer?: string; // Add optional security answer field
}

export interface LoginRequest {
  email: string;
  password: string;
}

// Password Reset Flow Interfaces
export interface VerifyEmailRequest {
  email: string;
}

export interface VerifySecurityAnswerRequest {
  email: string;
  securityAnswer: string;
  userId?: string; // Optional userId from email verification step
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
  resetToken: string;
}

<<<<<<< HEAD
=======
export interface employeeRequest {
  name: string;
  email: string;
  category: string;
  id: string;
}
>>>>>>> 8e048c3901b71626ec9e68ba34f4d5806ed226a6
