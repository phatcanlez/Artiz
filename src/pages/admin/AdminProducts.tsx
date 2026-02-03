import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, Product } from "@/lib/api";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProductFormState {
  id?: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  description: string;
}

const emptyForm: ProductFormState = {
  name: "",
  price: 0,
  stock: 0,
  imageUrl: "",
  description: "",
};

const AdminProducts: React.FC = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["admin-products"],
    queryFn: () => apiClient.request<Product[]>("/admin/products"),
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<ProductFormState>(emptyForm);

  const handleOpenCreate = () => {
    setEditing(false);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditing(true);
    setForm({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl,
      description: product.description,
    });
    setDialogOpen(true);
  };

  const createMutation = useMutation({
    mutationFn: (payload: ProductFormState) =>
      apiClient.request<Product>("/admin/products", {
        method: "POST",
        body: JSON.stringify({
          name: payload.name,
          description: payload.description,
          price: payload.price,
          imageUrl: payload.imageUrl,
          stock: payload.stock,
          isActive: true,
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      setDialogOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: ProductFormState) =>
      apiClient.request<Product>(`/admin/products/${payload.id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: payload.name,
          description: payload.description,
          price: payload.price,
          imageUrl: payload.imageUrl,
          stock: payload.stock,
          isActive: true,
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      setDialogOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      apiClient.request<void>(`/admin/products/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing && form.id) {
      updateMutation.mutate(form);
    } else {
      createMutation.mutate(form);
    }
  };

  return (
    <Card className="bg-[#020617] border-white/10 text-white">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle className="text-lg">Quản lý sản phẩm</CardTitle>
          <p className="text-xs text-white/60 mt-1">
            Thêm mới, chỉnh sửa và quản lý danh sách sản phẩm.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10"
              onClick={handleOpenCreate}
            >
              Thêm sản phẩm
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#020617] text-white border-white/10">
            <DialogHeader>
              <DialogTitle>
                {editing ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
              </DialogTitle>
            </DialogHeader>
            <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm mb-1">Tên sản phẩm</label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Giá (VND)</label>
                  <Input
                    type="number"
                    min={0}
                    value={form.price}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        price: Number(e.target.value),
                      }))
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Tồn kho</label>
                  <Input
                    type="number"
                    min={0}
                    value={form.stock}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        stock: Number(e.target.value),
                      }))
                    }
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Ảnh sản phẩm (URL)</label>
                <Input
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      imageUrl: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Mô tả</label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={4}
                  required
                />
              </div>
              <DialogFooter className="mt-4">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-white/70"
                  onClick={() => setDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                >
                  {editing ? "Lưu thay đổi" : "Tạo sản phẩm"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <p className="text-sm text-white/70">
            Đang tải danh sách sản phẩm...
          </p>
        )}
        {error && (
          <p className="text-sm text-red-400">
            Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.
          </p>
        )}
        {data && (
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead className="text-white/70">ID</TableHead>
                <TableHead className="text-white/70">Tên</TableHead>
                <TableHead className="text-white/70">Giá</TableHead>
                <TableHead className="text-white/70">Tồn kho</TableHead>
                <TableHead className="text-white/70">Đánh giá</TableHead>
                <TableHead className="text-white/70 text-right">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    {product.price.toLocaleString("vi-VN")}₫
                  </TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    {product.averageRating.toFixed(1)} ({product.reviewCount})
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 px-3 border-white/40 text-white hover:bg-white/10"
                      onClick={() => handleOpenEdit(product)}
                    >
                      Sửa
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-8 px-3"
                      onClick={() => deleteMutation.mutate(product.id)}
                    >
                      Xóa
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

export default AdminProducts;
