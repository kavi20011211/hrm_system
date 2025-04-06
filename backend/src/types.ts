export interface signUpRequest {
  email: string;
  password: string;
  name: string;
}

export interface loginRequest {
  email: string;
  password: string;
}

export interface jobRequest {
  title: string;
  description: string;
  id: string;
}
export interface employeeRequest {
  name: string;
  email: string;
  category: string;
  id: string;
}
