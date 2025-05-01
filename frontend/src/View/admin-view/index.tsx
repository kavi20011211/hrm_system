import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});


interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { profile } = await response.json();
        localStorage.setItem("adminProfile", JSON.stringify(profile));

        toast.success("Logged in successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        navigate("/admin-profile");
      } else {
        const { message } = await response.json();
        setErrorMessage(message || "Login failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred, please try again");
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      {/* Sliding Sidebar */}
      <div className="w-1/3 bg-blue-200 text-blue-600 p-10 transform transition-transform duration-700 ease-in-out translate-x-0">
        <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
        <p className="text-lg">Login to manage the admin panel</p>
        <img
          src="https://t3.ftcdn.net/jpg/03/39/70/90/360_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg"
          alt="Login Illustration"
          className="w-3/4 mt-10 mx-auto "
          
        />
      </div>

      {/* Login Form */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-4/5 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label>Email</label>
              <Input placeholder="Enter your email" {...register("email")} />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="mb-5">
              <label>Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {errorMessage && (
              <div className="text-red-500 mb-3">{errorMessage}</div>
            )}

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
