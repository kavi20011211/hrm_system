import { RouteConfig } from "@/types/route";
import AdminUserPage from "@/View/admin-view";
import Dashboard from "@/View/dashboard-view";
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
      path: "/register",
      name: "Admin Register",
      component: <RegisterPage />,
    },
  ],
  secondNav: [
    {
      path: "/admin-user",
      name: "Admin User",
      component: <AdminUserPage />,
    },
  ],
};

export default routes;
