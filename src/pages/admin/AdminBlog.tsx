import React, { useMemo, useRef, useState } from "react";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/Spinner";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  thumbnailUrl?: string;
  createdAt: string;
  isPublished: boolean;
  isDeleted?: boolean;
  deletedAt?: string | null;
}

interface BlogFormState {
  id?: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  thumbnailUrl: string;
  isPublished: boolean;
}

const emptyBlogForm: BlogFormState = {
  title: "",
  slug: "",
  summary: "",
  content: "",
  thumbnailUrl: "",
  isPublished: true,
};

const AdminBlog: React.FC = () => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["admin-blog"],
    queryFn: () => apiClient.request<BlogPost[]>("/admin/blog"),
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<BlogFormState>(emptyBlogForm);
  const [showDeleted, setShowDeleted] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [uploadingThumb, setUploadingThumb] = useState(false);

  const openCreate = () => {
    setEditing(false);
    setForm(emptyBlogForm);
    setDialogOpen(true);
  };

  const openEdit = async (post: BlogPost) => {
    setEditing(true);
    setLoadingPost(true);
    try {
      const detail = await apiClient.request<BlogPost>(`/admin/blog/${post.id}`);
      setForm({
        id: detail.id,
        title: detail.title,
        slug: detail.slug,
        summary: detail.summary,
        content: (detail as any).content ?? detail.summary,
        thumbnailUrl: detail.thumbnailUrl ?? "",
        isPublished: detail.isPublished,
      });
    } finally {
      setLoadingPost(false);
    }
    setDialogOpen(true);
  };

  const handlePickThumb = () => {
    fileInputRef.current?.click();
  };

  const handleThumbFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingThumb(true);
      const { url } = await apiClient.uploadBlogImage(file);
      setForm((prev) => ({ ...prev, thumbnailUrl: url }));
    } finally {
      setUploadingThumb(false);
      // allow re-select same file
      e.target.value = "";
    }
  };

  const createMutation = useMutation({
    mutationFn: (payload: BlogFormState) =>
      apiClient.request<BlogPost>("/admin/blog", {
        method: "POST",
        body: JSON.stringify({
          title: payload.title,
          slug: payload.slug,
          summary: payload.summary,
          content: payload.content,
          thumbnailUrl: payload.thumbnailUrl,
          isPublished: payload.isPublished,
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog"] });
      setDialogOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: BlogFormState) =>
      apiClient.request<BlogPost>(`/admin/blog/${payload.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: payload.title,
          slug: payload.slug,
          summary: payload.summary,
          content: payload.content,
          thumbnailUrl: payload.thumbnailUrl,
          isPublished: payload.isPublished,
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog"] });
      setDialogOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      apiClient.request<void>(`/admin/blog/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog"] });
    },
  });

  const restoreMutation = useMutation({
    mutationFn: (id: number) =>
      apiClient.request<void>(`/admin/blog/${id}/restore`, {
        method: "POST",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog"] });
    },
  });

  const rows = useMemo(() => {
    const list = data ?? [];
    return showDeleted ? list : list.filter((p) => !p.isDeleted);
  }, [data, showDeleted]);

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
          <CardTitle className="text-lg">Quản lý blog</CardTitle>
          <p className="text-xs text-white/60 mt-1">
            Thêm mới, chỉnh sửa và quản lý bài viết blog.
          </p>
          <label className="inline-flex items-center gap-2 text-xs text-white/70 mt-2 select-none">
            <input
              type="checkbox"
              checked={showDeleted}
              onChange={(e) => setShowDeleted(e.target.checked)}
            />
            Hiện cả bài đã xóa mềm
          </label>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10"
              onClick={openCreate}
            >
              Thêm bài viết
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#020617] text-white border-white/10 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editing ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
              </DialogTitle>
            </DialogHeader>
            <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
              {loadingPost && (
                <p className="text-xs text-white/60">Đang tải nội dung bài viết...</p>
              )}
              <div>
                <label className="block text-sm mb-1">Tiêu đề</label>
                <Input
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Slug</label>
                <Input
                  value={form.slug}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Tóm tắt</label>
                <Textarea
                  value={form.summary}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, summary: e.target.value }))
                  }
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Nội dung</label>
                <Textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, content: e.target.value }))
                  }
                  rows={6}
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Ảnh thumbnail</label>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      aria-label="Chọn ảnh thumbnail"
                      onChange={handleThumbFileChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="border-white/40 text-white hover:bg-white/10"
                      onClick={handlePickThumb}
                      disabled={uploadingThumb}
                    >
                      <span className="inline-flex items-center gap-2">
                        {uploadingThumb && <Spinner sizeClassName="h-3 w-3" />}
                        Chọn ảnh từ máy
                      </span>
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-white/70"
                      onClick={() => setForm((prev) => ({ ...prev, thumbnailUrl: "" }))}
                      disabled={!form.thumbnailUrl}
                    >
                      Xóa ảnh
                    </Button>
                  </div>

                  {/* Preview */}
                  {form.thumbnailUrl ? (
                    <div className="border border-white/10 rounded-md p-2 bg-black/20">
                      <img
                        src={form.thumbnailUrl}
                        alt="Thumbnail preview"
                        className="w-full max-h-[220px] object-contain rounded"
                      />
                      <p className="mt-2 text-[11px] text-white/50 break-all">
                        {form.thumbnailUrl}
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-white/50">
                      Chưa có ảnh thumbnail. Hãy chọn ảnh từ máy để upload.
                    </p>
                  )}
                </div>
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
                  {editing ? "Lưu thay đổi" : "Tạo bài viết"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <p className="text-sm text-white/70">
            Đang tải danh sách bài viết...
          </p>
        )}
        {error && (
          <p className="text-sm text-red-400">
            Không thể tải danh sách bài viết. Vui lòng thử lại sau.
          </p>
        )}
        {data && (
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead className="text-white/70">ID</TableHead>
                <TableHead className="text-white/70">Tiêu đề</TableHead>
                <TableHead className="text-white/70">Slug</TableHead>
                <TableHead className="text-white/70">Xuất bản</TableHead>
                <TableHead className="text-white/70">Trạng thái</TableHead>
                <TableHead className="text-white/70">Ngày tạo</TableHead>
                <TableHead className="text-white/70 text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((post) => (
                <TableRow key={post.id} className={post.isDeleted ? "opacity-60" : ""}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.slug}</TableCell>
                  <TableCell>
                    {post.isPublished ? "Đã xuất bản" : "Nháp"}
                  </TableCell>
                  <TableCell>{post.isDeleted ? "Đã xóa mềm" : "Bình thường"}</TableCell>
                  <TableCell>
                    {new Date(post.createdAt).toLocaleString("vi-VN")}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      className="h-8 px-3 bg-sky-500 hover:bg-sky-600 text-white text-xs"
                      disabled={!!post.isDeleted}
                      onClick={() => void openEdit(post)}
                    >
                      Sửa
                    </Button>
                    {post.isDeleted ? (
                      <Button
                        size="sm"
                        className="h-8 px-3 bg-emerald-500 hover:bg-emerald-600 text-white text-xs"
                        disabled={restoreMutation.isPending}
                        onClick={() => restoreMutation.mutate(post.id)}
                      >
                        <span className="inline-flex items-center gap-2">
                          {restoreMutation.isPending && <Spinner sizeClassName="h-3 w-3" />}
                          Khôi phục
                        </span>
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-8 px-3 text-xs"
                        disabled={deleteMutation.isPending}
                        onClick={() => deleteMutation.mutate(post.id)}
                      >
                        <span className="inline-flex items-center gap-2">
                          {deleteMutation.isPending && <Spinner sizeClassName="h-3 w-3" />}
                          Xóa (mềm)
                        </span>
                      </Button>
                    )}
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

export default AdminBlog;
