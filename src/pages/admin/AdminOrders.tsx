import React, { useMemo, useState } from "react";
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
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/Spinner";
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
  orderInvoiceNumber: string;
  totalAmount: number;
  status: string;
  shippingAddress?: string;
  phone?: string;
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
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminOrder | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentJson, setPaymentJson] = useState<string>("");
  const [paymentSummary, setPaymentSummary] = useState<Record<string, string>>({});

  const pick = (obj: any, paths: string[]): any => {
    for (const p of paths) {
      const parts = p.split(".");
      let cur: any = obj;
      let ok = true;
      for (const part of parts) {
        if (cur && typeof cur === "object" && part in cur) cur = cur[part];
        else {
          ok = false;
          break;
        }
      }
      if (ok && cur != null) return cur;
    }
    return undefined;
  };

  const buildPaymentSummary = (data: any) => {
    const status =
      pick(data, ["data.order_status", "order_status", "data.status", "status"]) ?? "";
    const amount =
      pick(data, ["data.order_amount", "order_amount", "data.amount", "amount"]) ?? "";
    const currency =
      pick(data, ["data.currency", "currency"]) ?? "VND";
    const method =
      pick(data, ["data.payment_method", "payment_method", "data.method", "method"]) ?? "";
    const paidAt =
      pick(data, ["data.paid_at", "paid_at", "data.updated_at", "updated_at", "data.created_at", "created_at"]) ?? "";
    const invoice =
      pick(data, ["data.order_invoice_number", "order_invoice_number", "data.invoice", "invoice"]) ?? "";
    const txn =
      pick(data, ["data.transaction_id", "transaction_id", "data.txn_id", "txn_id", "data.order_id", "order_id"]) ?? "";

    const fmtAmount = (() => {
      const n = typeof amount === "number" ? amount : parseFloat(String(amount));
      if (!Number.isFinite(n)) return String(amount);
      return `${new Intl.NumberFormat("vi-VN").format(n)} ${currency}`;
    })();

    const fmtTime = (() => {
      if (!paidAt) return "";
      const d = new Date(String(paidAt));
      return isNaN(d.getTime()) ? String(paidAt) : d.toLocaleString("vi-VN");
    })();

    const s: Record<string, string> = {};
    if (invoice) s["Mã đơn (invoice)"] = String(invoice);
    if (status) s["Trạng thái payment"] = String(status);
    if (amount) s["Số tiền"] = fmtAmount;
    if (method) s["Phương thức"] = String(method);
    if (txn) s["Transaction/Order ID"] = String(txn);
    if (fmtTime) s["Thời gian"] = fmtTime;
    return s;
  };

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

  const updateInfoMutation = useMutation({
    mutationFn: (payload: AdminOrder) =>
      apiClient.request<void>(`/admin/orders/${payload.id}`, {
        method: "PUT",
        body: JSON.stringify({
          shippingAddress: payload.shippingAddress ?? "",
          phone: payload.phone ?? "",
          status: payload.status,
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      setOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      apiClient.request<void>(`/admin/orders/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
  });

  const fetchPayment = useMutation({
    mutationFn: (orderInvoiceNumber: string) =>
      apiClient.request<any>(`/admin/payments/sepay/order/${orderInvoiceNumber}`),
    onSuccess: (data) => {
      setPaymentSummary(buildPaymentSummary(data));
      setPaymentJson(JSON.stringify(data, null, 2));
      setPaymentOpen(true);
    },
  });

  const rows = useMemo(() => data ?? [], [data]);

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
                <TableHead className="text-white/70">Mã đơn</TableHead>
                <TableHead className="text-white/70">Tổng tiền</TableHead>
                <TableHead className="text-white/70">Trạng thái</TableHead>
                <TableHead className="text-white/70">Ngày tạo</TableHead>
                <TableHead className="text-white/70 text-right">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.userName}</TableCell>
                  <TableCell>{order.orderInvoiceNumber}</TableCell>
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
                        {/* Trạng thái tiếng Việt đang dùng trong BE */}
                        <SelectItem value="Chờ thanh toán">Chờ thanh toán</SelectItem>
                        <SelectItem value="Chờ xác nhận">Chờ xác nhận</SelectItem>
                        <SelectItem value="Đã xác nhận và đang chuẩn bị">Đã xác nhận và đang chuẩn bị</SelectItem>
                        <SelectItem value="Đang giao hàng">Đang giao hàng</SelectItem>
                        <SelectItem value="Thành công">Thành công</SelectItem>
                        <SelectItem value="Đã hủy">Đã hủy</SelectItem>

                        {/* Backward compatibility (trạng thái cũ) */}
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
                    <div className="flex gap-2 justify-end">
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
                        Lưu status
                      </Button>
                      <Button
                        size="sm"
                        className="h-8 px-3 bg-sky-500 hover:bg-sky-600 text-white text-xs"
                        onClick={() => {
                          setEditing({ ...order, status: statusEditing[order.id] ?? order.status });
                          setOpen(true);
                        }}
                      >
                        Sửa đơn
                      </Button>
                      <Button
                        size="sm"
                        className="h-8 px-3 bg-zinc-700 hover:bg-zinc-600 text-white text-xs"
                        disabled={fetchPayment.isPending}
                        onClick={() => fetchPayment.mutate(order.orderInvoiceNumber)}
                      >
                        <span className="inline-flex items-center gap-2">
                          {fetchPayment.isPending && <Spinner sizeClassName="h-3 w-3" />}
                          Payment
                        </span>
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-8 px-3 text-xs"
                        disabled={deleteMutation.isPending}
                        onClick={() => deleteMutation.mutate(order.id)}
                      >
                        Hủy (mềm)
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-[#020617] text-white border-white/10">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa đơn hàng</DialogTitle>
            </DialogHeader>
            {editing && (
              <div className="space-y-4">
                <div className="text-sm text-white/70">
                  #{editing.id} — {editing.orderInvoiceNumber}
                </div>
                <div>
                  <Label>Địa chỉ giao hàng</Label>
                  <Input
                    value={editing.shippingAddress ?? ""}
                    onChange={(e) => setEditing((p) => (p ? { ...p, shippingAddress: e.target.value } : p))}
                  />
                </div>
                <div>
                  <Label>Số điện thoại</Label>
                  <Input
                    value={editing.phone ?? ""}
                    onChange={(e) => setEditing((p) => (p ? { ...p, phone: e.target.value } : p))}
                  />
                </div>
                <div>
                  <Label>Trạng thái</Label>
                  <Input
                    value={editing.status}
                    onChange={(e) => setEditing((p) => (p ? { ...p, status: e.target.value } : p))}
                  />
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
                className="bg-sky-500 hover:bg-sky-600"
                disabled={!editing || updateInfoMutation.isPending}
                onClick={() => editing && updateInfoMutation.mutate(editing)}
              >
                <span className="inline-flex items-center gap-2">
                  {updateInfoMutation.isPending && <Spinner sizeClassName="h-4 w-4" />}
                  Lưu
                </span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
          <DialogContent className="bg-[#020617] text-white border-white/10 max-w-3xl">
            <DialogHeader>
              <DialogTitle>SePay Payment</DialogTitle>
            </DialogHeader>
            {Object.keys(paymentSummary).length > 0 && (
              <div className="bg-black/30 border border-white/10 rounded-md p-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  {Object.entries(paymentSummary).map(([k, v]) => (
                    <div key={k} className="flex gap-2">
                      <span className="text-white/60 min-w-[140px]">{k}:</span>
                      <span className="text-white break-words">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <details className="bg-black/20 border border-white/10 rounded-md p-3">
              <summary className="cursor-pointer text-sm text-white/80 select-none">
                Raw JSON
              </summary>
              <pre className="mt-3 text-xs whitespace-pre-wrap break-words bg-black/40 border border-white/10 rounded-md p-4 max-h-[55vh] overflow-auto">
                {paymentJson || "Không có dữ liệu"}
              </pre>
            </details>
            <DialogFooter>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => setPaymentOpen(false)}
              >
                Đóng
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default AdminOrders;
