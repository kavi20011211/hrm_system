import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  firstName: z.string().min(1, "Admin user first name is required"),
  lastName: z.string().min(1, "Admin user last name is required"),
  nic: z.string().min(1, "Admin user NIC is required"),
});

const RegisterPage = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      nic: "",
    },
  });
  const onSubmit = (data: any) => {
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
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
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
