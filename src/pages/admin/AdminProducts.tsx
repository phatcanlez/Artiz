import React, { useState, useCallback } from "react";
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
import { Label } from "@/components/ui/label";

interface ProductFormState {
  id?: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  thumbnailUrls: string[];
  model3DUrls: string[];
  description: string;
  size: string;
  material: string;
  productPolicy: string;
  productPreservation: string;
  deliveryTax: string;
}

const emptyForm: ProductFormState = {
  name: "",
  price: 0,
  stock: 0,
  imageUrl: "",
  thumbnailUrls: [],
  model3DUrls: [],
  description: "",
  size: "",
  material: "",
  productPolicy: "",
  productPreservation: "",
  deliveryTax: "",
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
  const [uploading, setUploading] = useState(false);
  const [uploading3D, setUploading3D] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [dragActive3D, setDragActive3D] = useState(false);

  const allImageUrls = form.imageUrl
    ? [form.imageUrl, ...form.thumbnailUrls]
    : form.thumbnailUrls;

  const setImageUrls = useCallback(
    (urls: string[]) => {
      if (urls.length === 0) {
        setForm((prev) => ({ ...prev, imageUrl: "", thumbnailUrls: [] }));
        return;
      }
      setForm((prev) => ({
        ...prev,
        imageUrl: urls[0],
        thumbnailUrls: urls.slice(1),
      }));
    },
    []
  );

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files?.length) return;
      const imageFiles = Array.from(files).filter((f) =>
        /^image\/(jpeg|png|gif|webp)$/i.test(f.type)
      );
      if (imageFiles.length === 0) {
        alert("Vui lòng chọn file ảnh (JPEG, PNG, GIF, WebP).");
        return;
      }
      setUploading(true);
      try {
        const newUrls: string[] = [];
        for (const file of imageFiles) {
          const { url } = await apiClient.uploadProductImage(file);
          newUrls.push(url);
        }
        setImageUrls([...allImageUrls, ...newUrls]);
      } catch (e) {
        alert((e as Error).message ?? "Tải ảnh lên thất bại");
      } finally {
        setUploading(false);
      }
    },
    [allImageUrls, setImageUrls]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const removeImage = useCallback(
    (index: number) => {
      const next = allImageUrls.filter((_, i) => i !== index);
      setImageUrls(next);
    },
    [allImageUrls, setImageUrls]
  );

  const handle3DFiles = useCallback(
    async (files: FileList | null) => {
      if (!files?.length) return;
      const valid = Array.from(files).filter((f) => {
        const n = f.name.toLowerCase();
        return n.endsWith(".glb") || n.endsWith(".gltf");
      });
      if (valid.length === 0) {
        alert("Vui lòng chọn file .glb hoặc .gltf");
        return;
      }
      setUploading3D(true);
      try {
        const newUrls: string[] = [];
        for (const file of valid) {
          const { url } = await apiClient.uploadProduct3D(file);
          newUrls.push(url);
        }
        setForm((prev) => ({
          ...prev,
          model3DUrls: [...prev.model3DUrls, ...newUrls],
        }));
      } catch (e) {
        alert((e as Error).message ?? "Tải file 3D lên thất bại");
      } finally {
        setUploading3D(false);
      }
    },
    []
  );

  const remove3D = useCallback((index: number) => {
    setForm((prev) => ({
      ...prev,
      model3DUrls: prev.model3DUrls.filter((_, i) => i !== index),
    }));
  }, []);

  const handleOpenCreate = () => {
    setEditing(false);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    const thumb = product.thumbnailUrls ?? [];
    const models = product.model3DUrls ?? [];
    setEditing(true);
    setForm({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl,
      thumbnailUrls: thumb,
      model3DUrls: models,
      description: product.description,
      size: product.size ?? "",
      material: product.material ?? "",
      productPolicy: product.productPolicy ?? "",
      productPreservation: product.productPreservation ?? "",
      deliveryTax: product.deliveryTax ?? "",
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
          thumbnailUrls: payload.thumbnailUrls,
          model3DUrls: payload.model3DUrls?.length ? payload.model3DUrls : null,
          stock: payload.stock,
          size: payload.size || null,
          material: payload.material || null,
          productPolicy: payload.productPolicy || null,
          productPreservation: payload.productPreservation || null,
          deliveryTax: payload.deliveryTax || null,
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
          thumbnailUrls: payload.thumbnailUrls,
          model3DUrls: payload.model3DUrls?.length ? payload.model3DUrls : null,
          stock: payload.stock,
          size: payload.size || null,
          material: payload.material || null,
          productPolicy: payload.productPolicy || null,
          productPreservation: payload.productPreservation || null,
          deliveryTax: payload.deliveryTax || null,
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
    if (!form.imageUrl) {
      alert("Vui lòng thêm ít nhất một ảnh sản phẩm.");
      return;
    }
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
            Thêm mới, chỉnh sửa và quản lý danh sách sản phẩm. Kéo thả ảnh hoặc chọn nhiều ảnh cùng lúc.
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
          <DialogContent className="bg-[#020617] text-white border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editing ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
              </DialogTitle>
            </DialogHeader>
            <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
              {/* Ảnh: kéo thả + nhiều ảnh */}
              <div className="space-y-2">
                <Label>Ảnh sản phẩm</Label>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive ? "border-emerald-500 bg-white/5" : "border-white/30"
                  } ${uploading ? "opacity-70 pointer-events-none" : ""}`}
                >
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    multiple
                    className="hidden"
                    id="product-images-input"
                    onChange={(e) => {
                      handleFiles(e.target.files);
                      e.target.value = "";
                    }}
                  />
                  <label
                    htmlFor="product-images-input"
                    className="cursor-pointer block text-sm text-white/80"
                  >
                    Kéo thả ảnh vào đây hoặc <span className="text-emerald-400 underline">chọn nhiều ảnh</span>
                  </label>
                  <p className="text-xs text-white/50 mt-1">JPEG, PNG, GIF, WebP. Ảnh đầu tiên = ảnh đại diện.</p>
                  {uploading && <p className="text-xs text-emerald-400 mt-2">Đang tải lên...</p>}
                </div>
                {allImageUrls.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {allImageUrls.map((url, i) => (
                      <div key={url} className="relative group">
                        <img
                          src={url}
                          alt=""
                          className="w-16 h-16 object-cover rounded border border-white/20"
                        />
                        {i === 0 && (
                          <span className="absolute bottom-0 left-0 right-0 text-[10px] bg-black/70 text-emerald-400 text-center rounded-b">
                            Đại diện
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs opacity-0 group-hover:opacity-100"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* File 3D */}
              <div className="space-y-2">
                <Label>File 3D (mô hình .glb / .gltf)</Label>
                <div
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragActive3D(false);
                    handle3DFiles(e.dataTransfer.files);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive3D(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setDragActive3D(false);
                  }}
                  className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                    dragActive3D ? "border-cyan-500 bg-white/5" : "border-white/30"
                  } ${uploading3D ? "opacity-70 pointer-events-none" : ""}`}
                >
                  <input
                    type="file"
                    accept=".glb,.gltf"
                    multiple
                    className="hidden"
                    id="product-3d-input"
                    onChange={(e) => {
                      handle3DFiles(e.target.files);
                      e.target.value = "";
                    }}
                  />
                  <label
                    htmlFor="product-3d-input"
                    className="cursor-pointer block text-sm text-white/80"
                  >
                    Kéo thả file 3D vào đây hoặc <span className="text-cyan-400 underline">chọn file</span>
                  </label>
                  <p className="text-xs text-white/50 mt-1">Chỉ hỗ trợ .glb, .gltf. Có thể thêm nhiều file.</p>
                  {uploading3D && <p className="text-xs text-cyan-400 mt-2">Đang tải lên...</p>}
                </div>
                {form.model3DUrls.length > 0 && (
                  <ul className="flex flex-wrap gap-2 mt-2">
                    {form.model3DUrls.map((url, i) => (
                      <li
                        key={url}
                        className="flex items-center gap-2 bg-white/5 rounded px-2 py-1.5 text-xs text-white/80"
                      >
                        <span className="truncate max-w-[180px]" title={url}>
                          File {i + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => remove3D(i)}
                          className="text-red-400 hover:text-red-300"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <Label htmlFor="name">Tên sản phẩm</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  required
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Giá (VND)</Label>
                  <Input
                    id="price"
                    type="number"
                    min={0}
                    value={form.price || ""}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, price: Number(e.target.value) || 0 }))
                    }
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="stock">Tồn kho</Label>
                  <Input
                    id="stock"
                    type="number"
                    min={0}
                    value={form.stock}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, stock: Number(e.target.value) || 0 }))
                    }
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Mô tả sản phẩm</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="size">Kích thước / Phù hợp (Size)</Label>
                <Textarea
                  id="size"
                  value={form.size}
                  onChange={(e) => setForm((prev) => ({ ...prev, size: e.target.value }))}
                  placeholder="VD: Phù hợp: AirPods Pro 1 & 2. Kích thước: 60 x 45 x 25 mm. Trọng lượng: ~18g"
                  rows={2}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="material">Chất liệu (Material)</Label>
                <Textarea
                  id="material"
                  value={form.material}
                  onChange={(e) => setForm((prev) => ({ ...prev, material: e.target.value }))}
                  placeholder="VD: Chất liệu chính: TPU cao cấp. Lớp phủ: Sơn mờ chống vân tay. Màu sắc: Đen & Bạc"
                  rows={2}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="productPolicy">Chính sách sản phẩm</Label>
                <Textarea
                  id="productPolicy"
                  value={form.productPolicy}
                  onChange={(e) => setForm((prev) => ({ ...prev, productPolicy: e.target.value }))}
                  rows={2}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="productPreservation">Bảo quản sản phẩm</Label>
                <Textarea
                  id="productPreservation"
                  value={form.productPreservation}
                  onChange={(e) => setForm((prev) => ({ ...prev, productPreservation: e.target.value }))}
                  rows={2}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="deliveryTax">Giao hàng & Thuế</Label>
                <Textarea
                  id="deliveryTax"
                  value={form.deliveryTax}
                  onChange={(e) => setForm((prev) => ({ ...prev, deliveryTax: e.target.value }))}
                  rows={2}
                  className="mt-1"
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
                  disabled={createMutation.isPending || updateMutation.isPending}
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
          <p className="text-sm text-white/70">Đang tải danh sách sản phẩm...</p>
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
                <TableHead className="text-white/70 text-right">Hành động</TableHead>
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
