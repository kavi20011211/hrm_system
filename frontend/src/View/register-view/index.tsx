import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, "Admin user first name is required")
    .max(50, "Admin's firsname length should be maximum 50 characters"),
  lastName: z
    .string()
    .min(1, "Admin user last name is required")
    .max(50, "Admin's lastname length should be maximum 50 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required")
    .max(100, "Email must be at most 100 characters long"),

  contact: z
    .string()
    .min(10, "Contact number must be at least 10 digits")
    .max(15, "Contact number must be at most 15 digits")
    .regex(/^\d+$/, "Contact number must contain only digits"),
  nic: z
    .string()
    .min(10, "Admin user valied NIC is required")
    .max(15, "Admin's NIC length should be maximum 15 characters"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be at most 50 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    ),

  confirm_password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be at most 50 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    ),
});

const RegisterPage = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      nic: "",
      email: "",
      contact: "",
      password: "",
      confirm_password: "",
    },
  });

  type FormData = z.infer<typeof formSchema>;

  const onSubmit = (data: FormData) => {
    console.log("Admin Data:", data);
  };
  return (
    <div className="w-4/5 h-4/5 bg-white rounded-2xl shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-full p-5 flex justify-between">
        <h4 className="text-2xl font-bold">Register an admin user</h4>
      </div>
      <div className="w-full justify-center items-center p-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* First name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter first name"
                      required
                      {...field}
                      className="mb-5"
                    />
                  </FormControl>
                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />

            {/* Last name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter last name"
                      required
                      {...field}
                      className="mb-5"
                    />
                  </FormControl>
                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />

            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter email"
                      required
                      {...field}
                      className="mb-5"
                    />
                  </FormControl>
                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />

            {/* NIC */}
            <FormField
              control={form.control}
              name="nic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIC</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter NIC"
                      required
                      {...field}
                      className="mb-5"
                    />
                  </FormControl>
                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />

            {/* contact */}
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact number</FormLabel>
                  <FormControl>
                    <Input
                      type="numbers"
                      placeholder="Enter contact number"
                      required
                      {...field}
                      className="mb-5"
                    />
                  </FormControl>
                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />

            {/* password */}
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      required
                      {...field}
                      className="mb-5"
                    />
                  </FormControl>
                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />

            {/* confirm password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter confirm password"
                      required
                      {...field}
                      className="mb-5"
                    />
                  </FormControl>
                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
