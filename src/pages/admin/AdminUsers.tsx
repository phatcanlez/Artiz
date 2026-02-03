import React from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  phone?: string;
  isAdmin: boolean;
}

const AdminUsers: React.FC = () => {
  const { data, isLoading, error } = useQuery<AdminUser[]>({
    queryKey: ["admin-users"],
    queryFn: () => apiClient.request<AdminUser[]>("/admin/users"),
  });

  return (
    <Card className="bg-[#020617] border-white/10 text-white">
      <CardHeader>
        <CardTitle className="text-lg">Quản lý tài khoản</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <p className="text-sm text-white/70">
            Đang tải danh sách tài khoản...
          </p>
        )}
        {error && (
          <p className="text-sm text-red-400">
            Không thể tải danh sách tài khoản. Vui lòng thử lại sau.
          </p>
        )}
        {data && (
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead className="text-white/70">ID</TableHead>
                <TableHead className="text-white/70">Tên</TableHead>
                <TableHead className="text-white/70">Email</TableHead>
                <TableHead className="text-white/70">Số điện thoại</TableHead>
                <TableHead className="text-white/70">Vai trò</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone || "-"}</TableCell>
                  <TableCell>{user.isAdmin ? "Admin" : "User"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminUsers;
