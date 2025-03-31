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
import { ChevronUp, LayoutDashboardIcon, User2 } from "lucide-react"; // Icons
import routes from "@/config/routes";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

// Function to map route paths to icons
const routeIcons: Record<string, any> = {
  "/": LayoutDashboardIcon,
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Job.LK</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.mainNav.map((route) => {
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
                    return (
                      <Link to={route.path}>
                        <span>{route.name}</span>
                      </Link>
                    );
                  })}
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
