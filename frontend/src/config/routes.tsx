import { RouteConfig } from "@/types/route";
import AdminUserPage from "@/View/admin-view";
import Dashboard from "@/View/dashboard-view";
import EmployeeSelectionView from "@/View/employee-select-view";
import JobPost from "@/View/job-post-view";
import RegisterPage from "@/View/register-view";

const routes: RouteConfig = {
  mainNav: [
    {
      path: "/",
      name: "Dashboard",
      component: <Dashboard />,
    },
    {
      path: "/register",
      name: "Admin Register",
      component: <RegisterPage />,
    },
    {
      path: "/job-post",
      name: "Job Post",
      component: <JobPost />,
    },
    {
      path: "/job-request",
      name: "Job Requests",
      component: <EmployeeSelectionView />,
    },
  ],
  secondNav: [
    {
      path: "/admin-user",
      name: "User Profile",
      component: <AdminUserPage />,
    },
  ],
};

export default routes;
