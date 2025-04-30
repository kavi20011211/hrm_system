// Define route structure
interface Route {
  path: string;
  name: string;
}

// Main navigation routes
const mainNav: Route[] = [
  {
    path: "/",
    name: "Dashboard",
  },
  {
    path: "/register",
    name: "Register User",
  },
  {
    path: "/job-post",
    name: "Job Posts",
  },
  {
    path: "/admin-user",
    name: "Admin Panel",
  },
];

// Secondary navigation routes (for user dropdown)
const secondNav: Route[] = [
  {
    path: "/login",
    name: "Login",
  },
];

// Export routes
export default {
  mainNav,
  secondNav,
};
