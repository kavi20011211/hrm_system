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
import {
  ChevronUp,
  LayoutDashboardIcon,
  User2,
  NotebookPenIcon,
  Users2,
  NetworkIcon,
} from "lucide-react"; // Icons
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
  "/register": Users2,
  "/job-post": NotebookPenIcon,
  "/admin-user": User2,
  "/job-request": NetworkIcon,
};

export function AppSidebar() {
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
