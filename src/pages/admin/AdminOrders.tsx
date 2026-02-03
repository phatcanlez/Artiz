import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdminOrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

interface AdminOrder {
  id: number;
  userId: number;
  userName: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: AdminOrderItem[];
}

const AdminOrders: React.FC = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery<AdminOrder[]>({
    queryKey: ["admin-orders"],
    queryFn: () => apiClient.request<AdminOrder[]>("/admin/orders"),
  });

  const [statusEditing, setStatusEditing] = useState<Record<number, string>>(
    {}
  );

  const updateStatusMutation = useMutation({
    mutationFn: (payload: { id: number; status: string }) =>
      apiClient.request<void>(`/admin/orders/${payload.id}/status`, {
        method: "PUT",
        body: JSON.stringify({ status: payload.status }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
  });

  return (
    <Card className="bg-[#020617] border-white/10 text-white">
      <CardHeader>
        <CardTitle className="text-lg">Quản lý đơn hàng</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <p className="text-sm text-white/70">
            Đang tải danh sách đơn hàng...
          </p>
        )}
        {error && (
          <p className="text-sm text-red-400">
            Không thể tải danh sách đơn hàng. Vui lòng thử lại sau.
          </p>
        )}
        {data && (
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead className="text-white/70">ID</TableHead>
                <TableHead className="text-white/70">Khách hàng</TableHead>
                <TableHead className="text-white/70">Tổng tiền</TableHead>
                <TableHead className="text-white/70">Trạng thái</TableHead>
                <TableHead className="text-white/70">Ngày tạo</TableHead>
                <TableHead className="text-white/70 text-right">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.userName}</TableCell>
                  <TableCell>
                    {order.totalAmount.toLocaleString("vi-VN")}₫
                  </TableCell>
                  <TableCell>
                    <Select
                      value={statusEditing[order.id] ?? order.status}
                      onValueChange={(value) =>
                        setStatusEditing((prev) => ({
                          ...prev,
                          [order.id]: value,
                        }))
                      }
                    >
                      <SelectTrigger className="h-8 w-32 bg-transparent border-white/30 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#020617] text-white border-white/20">
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Processing">Processing</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleString("vi-VN")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      className="h-8 px-3 bg-emerald-500 hover:bg-emerald-600 text-white text-xs"
                      disabled={updateStatusMutation.isPending}
                      onClick={() =>
                        updateStatusMutation.mutate({
                          id: order.id,
                          status: statusEditing[order.id] ?? order.status,
                        })
                      }
                    >
                      Lưu
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminOrders;
