import { z } from "zod";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, Button, Paper, Title, Text } from "@mantine/core";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "@/config/api";

// Simple mock database for existing employee IDs
const existingEmployeeIds = new Set(["EMP001"]);

const employeeSchema = z.object({
  id: z
    .string()
    .min(1, "ID is required")
    .max(10, "ID must be at most 10 characters")
    .regex(/^[a-zA-Z0-9]+$/, "ID must be alphanumeric"),
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be at most 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .max(50, "Email must be at most 50 characters")
    .email("Invalid email"),
  category: z.string().min(1, "Category is required"),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

const EmployeeSelectionView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      id: "",
      name: "",
      email: "",
      category: "",
    },
  });

  const onSubmit = async (data: EmployeeFormData) => {
    const trimmedData = {
      id: data.id.trim(),
      name: data.name.trim(),
      email: data.email.trim(),
      category: data.category.trim(),
    };

    try {
      const response = await fetch(API_ENDPOINTS.employee, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(trimmedData),
      });

      console.log(localStorage.getItem("token"));

      if (response.status !== 200) {
        const error = await response.text();
        let errorMessage = error;

        try {
          const errorData = JSON.parse(error);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = error || errorMessage;
        }

        if (response.status === 400) {
          errorMessage = "Required fields must be filled with values";
        }

        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      toast.success("Employee added successfully!");
      reset();
    } catch (error: any) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      toast.error(errorMessage);
    }
  };

  const onInvalid = (errors: FieldErrors<EmployeeFormData>) => {
    const firstError = Object.values(errors)[0]?.message as string | undefined;
    if (firstError) toast.error(firstError);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <Title order={2} mb="md">
        Employee Section
      </Title>
      <Paper p="md" shadow="sm" radius="md" withBorder>
        <Text size="lg" mb="sm">
          Add Employees
        </Text>
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <TextInput
            label="ID"
            placeholder="Enter ID"
            {...register("id")}
            error={errors.id?.message}
            mb="sm"
          />
          <TextInput
            label="Name"
            placeholder="Enter name"
            {...register("name")}
            error={errors.name?.message}
            mb="sm"
          />
          <TextInput
            label="Email"
            placeholder="Enter email"
            {...register("email")}
            error={errors.email?.message}
            mb="sm"
          />
          <TextInput
            label="Category"
            placeholder="Enter category"
            {...register("category")}
            error={errors.category?.message}
            mb="md"
          />
          <Button fullWidth type="submit">
            Add
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default EmployeeSelectionView;
