import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  ChevronUp,
  LayoutDashboardIcon,
  User2,
  NotebookPenIcon,
  Users2,
  NetworkIcon,
  LogInIcon,
} from "lucide-react"; // Icons
import routes from "@/config/routes";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { LogoutButton } from "@/components/logout-button";

type IconComponent = React.ComponentType<{
  className?: string;
  size?: number;
}>;

// Function to map route paths to icons
const routeIcons: Record<string, IconComponent> = {
  "/": LayoutDashboardIcon,
  "/register": Users2,
  "/job-post": NotebookPenIcon,
  "/admin-user": User2,
  "/job-request": NetworkIcon,
  "/login": LogInIcon,
};

export function AppSidebar() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <Sidebar className="h-screen flex flex-col bg-white">
      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold font-mono mb-4">
            JobRooster.lk
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {routes.mainNav.map((route) => {
                // Skip rendering the Login route in main nav if already authenticated
                if (route.path === "/login" && isAuthenticated) {
                  return null;
                }
                const Icon = routeIcons[route.path] || LayoutDashboardIcon; // Default icon if not found
                return (
                  <SidebarMenuItem key={route.path}>
                    <SidebarMenuButton asChild>
                      <Link to={route.path}>
                        <Icon />
                        <span>{route.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              
              {/* Show logout button in main sidebar when authenticated */}
              {isAuthenticated && (
                <SidebarMenuItem key="main-logout">
                  <LogoutButton />
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> AdminUser
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  {routes.secondNav.map((route) => {
                    // If the route is login and user is already authenticated, don't render it
                    if (route.path === "/login" && isAuthenticated) {
                      return null;
                    }
                    const Icon = routeIcons[route.path] || LayoutDashboardIcon;
                    return (
                      <SidebarMenuItem key={route.path}>
                        <SidebarMenuButton asChild>
                          <Link to={route.path}>
                            <Icon />
                            <span>{route.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                  
                  {/* Show logout option only when authenticated */}
                  {isAuthenticated && (
                    <SidebarMenuItem key="dropdown-logout">
                      <LogoutButton />
                    </SidebarMenuItem>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
