import { Link } from "react-router-dom";
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
import { LayoutDashboardIcon } from "lucide-react"; // Icons
import routes from "@/config/routes";

// Function to map route paths to icons
const routeIcons: Record<string, any> = {
  "/": LayoutDashboardIcon,
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.mainNav.concat(routes.secondNav).map((route) => {
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>{/* user profile */}</SidebarFooter>
    </Sidebar>
  );
}
