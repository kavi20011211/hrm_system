import { RouteConfig } from "@/types/route";
import Dashboard from "@/View/dashboard-view";

const routes: RouteConfig = {
  mainNav: [
    {
      path: "/",
      name: "Dashboard",
      component: <Dashboard />,
    },
  ],
  secondNav: [],
};

export default routes;
