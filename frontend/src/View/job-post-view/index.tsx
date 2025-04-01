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
  jobID: z.string().min(1, "Job ID is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  jobDescription: z.string().min(1, "Job description is required"),
});
const JobPost = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobID: "",
      jobTitle: "",
      jobDescription: "",
    },
  });
  const onSubmit = (data: any) => {
    console.log("Job Post Data:", data);
  };
  return (
    <div className="w-4/5 h-4/5 bg-white rounded-2xl shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-full p-5 flex justify-between">
        <h4 className="text-2xl font-bold">Post a Job</h4>
      </div>
      <div className="w-full justify-center items-center p-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Job ID field */}
            <FormField
              control={form.control}
              name="jobID"
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
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Job Title */}
            <FormField
              control={form.control}
              name="jobTitle"
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
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Job Description */}
            <FormField
              control={form.control}
              name="jobDescription"
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

export default JobPost;
