import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/Spinner";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  phone?: string;
  isAdmin: boolean;
  isActive: boolean;
}

const AdminUsers: React.FC = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery<AdminUser[]>({
    queryKey: ["admin-users"],
    queryFn: () => apiClient.request<AdminUser[]>("/admin/users"),
  });

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<AdminUser | null>(null);

  const updateMutation = useMutation({
    mutationFn: (payload: AdminUser) =>
      apiClient.request<AdminUser>(`/admin/users/${payload.id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          isAdmin: payload.isAdmin,
          isActive: payload.isActive,
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      setOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      apiClient.request<void>(`/admin/users/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });

  const rows = useMemo(() => data ?? [], [data]);

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
                <TableHead className="text-white/70">Trạng thái</TableHead>
                <TableHead className="text-white/70 text-right">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone || "-"}</TableCell>
                  <TableCell>
                    {user.isAdmin ? "Quản trị viên" : "Người dùng"}
                  </TableCell>
                  <TableCell>
                    {user.isActive ? "Đang hoạt động" : "Đã khóa"}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      className="h-8 px-3 bg-emerald-500 hover:bg-emerald-600 text-white text-xs"
                      onClick={() => {
                        setForm({ ...user });
                        setOpen(true);
                      }}
                    >
                      Sửa
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-8 px-3 text-xs"
                      disabled={deleteMutation.isPending}
                      onClick={() => deleteMutation.mutate(user.id)}
                    >
                      <span className="inline-flex items-center gap-2">
                        {deleteMutation.isPending && (
                          <Spinner sizeClassName="h-3 w-3" />
                        )}
                        Xóa
                      </span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-[#020617] text-white border-white/10">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa tài khoản</DialogTitle>
            </DialogHeader>
            {form && (
              <div className="space-y-4">
                <div>
                  <Label>Tên</Label>
                  <Input
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => (p ? { ...p, name: e.target.value } : p))
                    }
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => (p ? { ...p, email: e.target.value } : p))
                    }
                  />
                </div>
                <div>
                  <Label>Số điện thoại</Label>
                  <Input
                    value={form.phone ?? ""}
                    onChange={(e) =>
                      setForm((p) => (p ? { ...p, phone: e.target.value } : p))
                    }
                  />
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.isAdmin}
                      onChange={(e) =>
                        setForm((p) =>
                          p ? { ...p, isAdmin: e.target.checked } : p,
                        )
                      }
                    />
                    Quản trị viên
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) =>
                        setForm((p) =>
                          p ? { ...p, isActive: e.target.checked } : p,
                        )
                      }
                    />
                    Đang hoạt động
                  </label>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                Hủy
              </Button>
              <Button
                className="bg-emerald-500 hover:bg-emerald-600"
                disabled={!form || updateMutation.isPending}
                onClick={() => form && updateMutation.mutate(form)}
              >
                <span className="inline-flex items-center gap-2">
                  {updateMutation.isPending && (
                    <Spinner sizeClassName="h-4 w-4" />
                  )}
                  Lưu
                </span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default AdminUsers;
