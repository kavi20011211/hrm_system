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
import { API_ENDPOINTS } from "@/config/api";
import { toast } from "react-toastify";

const allowedJobTitles = [
  "Software engineer",
  "Project manager",
  "Business analyst",
  "Quality assurance",
  "Tech Ops",
  "Cyber security",
];

const formSchema = z.object({
  id: z
    .string()
    .min(1, "Job ID is required")
    .max(10, "Job ID must be at most 10 characters")
    .regex(/^[a-zA-Z0-9]+$/, "Job ID must only contain letters and numbers"),
  title: z
    .string()
    .min(1, "Job title is required")
    .max(30, "Job title must be at most 30 characters")
    .refine((val) => allowedJobTitles.includes(val), {
      message: "Invalid job title. Must be one of the allowed types.",
    }),
  description: z
    .string()
    .min(1, "Job description is required")
    .max(1000, "Job description must be at most 1000 characters"),
});
const JobPost = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      title: "",
      description: "",
    },
  });

  type FormData = z.infer<typeof formSchema>;

  const onSubmit = async (data: FormData) => {
    console.log("Job Post Data:", data);
    try {
      const response = await fetch(API_ENDPOINTS.jobs, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id: data.id,
          title: data.title,
          description: data.description,
        }),
      });

      if (response.status == 200) {
        toast.success("Job created successfully!");
      }

      if (response.status == 400) {
        const data = await response.json();
        const errorMessage = data.error;
        toast.error(errorMessage);
      }
    } catch (error: any) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      toast.error(errorMessage);
    }
  };
  return (
    <div className="w-4/5 h-4/5 bg-white rounded-2xl shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-full p-5 flex justify-between">
        <h4 className="text-2xl font-bold">Post a job</h4>
      </div>
      <div className="w-full justify-center items-center p-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Job ID field */}
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Job ID"
                      required
                      {...field}
                      className="mb-5"
                    />
                  </FormControl>
                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />

            {/* Job Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Job Title"
                      required
                      {...field}
                      className="mb-5"
                    />
                  </FormControl>
                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />

            {/* Job Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Job Description"
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

export default JobPost;
