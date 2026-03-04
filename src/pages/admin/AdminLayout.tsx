import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BarChart2, Users, Package, FileText, ShoppingBag } from "lucide-react";

const AdminLayout: React.FC = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Commented out authentication check to allow viewing admin page without login
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //     return;
  //   }
  //   if (!isAdmin) {
  //     navigate("/");
  //     return;
  //   }
  // }, [isAuthenticated, isAdmin, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  // Commented out authentication check to allow viewing admin page without login
  // if (!isAuthenticated || !isAdmin) {
  //   return null;
  // }

  return (
    <div className="min-h-screen bg-black text-white">
      <SidebarProvider defaultOpen>
        <Sidebar
          collapsible="icon"
          className="bg-[#020617] text-white border-r border-white/10"
        >
          <SidebarHeader className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-wide">
                Artiz Admin
              </span>
              <Badge variant="secondary" className="text-xs">
                Dashboard
              </Badge>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActive("/admin")}
                  onClick={() => navigate("/admin")}
                  className="text-sm"
                >
                  <BarChart2 />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActive("/admin/users")}
                  onClick={() => navigate("/admin/users")}
                  className="text-sm"
                >
                  <Users />
                  <span>Tài khoản</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActive("/admin/products")}
                  onClick={() => navigate("/admin/products")}
                  className="text-sm"
                >
                  <Package />
                  <span>Sản phẩm</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActive("/admin/orders")}
                  onClick={() => navigate("/admin/orders")}
                  className="text-sm"
                >
                  <ShoppingBag />
                  <span>Đơn hàng</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActive("/admin/blog")}
                  onClick={() => navigate("/admin/blog")}
                  className="text-sm"
                >
                  <FileText />
                  <span>Blog</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-white/10 px-3 py-2 text-xs text-white/70">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="truncate">{user?.email || "Khách"}</span>
                <span className="text-[10px] uppercase tracking-wide text-emerald-400">
                  Admin
                </span>
              </div>
              <div className="flex gap-2 mt-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-3 text-xs border-white/30 text-white bg-transparent hover:bg-white/10"
                  onClick={() => navigate("/")}
                >
                  Về trang khách
                </Button>
                {isAuthenticated && (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-7 px-3 text-xs"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </Button>
                )}
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className={cn("bg-[#020617] text-white")}>
          <header className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-black/80 backdrop-blur">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-white border border-white/10 bg-transparent hover:bg-white/10" />
              <div>
                <h1 className="text-xl font-semibold tracking-wide">
                  Dashboard Admin
                </h1>
                <p className="text-xs text-white/60">
                  Quản lý tài khoản, sản phẩm, đơn hàng, blog và xem doanh thu.
                </p>
              </div>
            </div>
          </header>

          <main className="flex-1 px-6 py-6">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;
