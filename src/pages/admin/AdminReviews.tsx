import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type AdminReviewDto = {
  id: number;
  productId: number;
  productName: string;
  reviewerName: string;
  reviewerEmail: string;
  rating: number;
  comment: string;
  isHidden: boolean;
  createdAt: string;
};

const fmtDate = (s: string) => {
  try {
    return new Date(s).toLocaleString("vi-VN");
  } catch {
    return s;
  }
};

const AdminReviews: React.FC = () => {
  const queryClient = useQueryClient();
  const [productId, setProductId] = useState<string>("");
  const [includeHidden, setIncludeHidden] = useState(true);

  const queryKey = useMemo(
    () => [
      "admin-reviews",
      productId || "all",
      includeHidden ? "all" : "visible",
    ],
    [productId, includeHidden],
  );

  const { data, isLoading, error, refetch, isFetching } = useQuery<
    AdminReviewDto[]
  >({
    queryKey,
    queryFn: () => {
      const params = new URLSearchParams();
      if (productId.trim()) params.set("productId", productId.trim());
      params.set("includeHidden", includeHidden ? "true" : "false");
      return apiClient.request<AdminReviewDto[]>(
        `/admin/reviews?${params.toString()}`,
      );
    },
    refetchOnMount: "always",
  });

  const setHiddenMutation = useMutation({
    mutationFn: ({ id, isHidden }: { id: number; isHidden: boolean }) =>
      apiClient.request<void>(`/admin/reviews/${id}/hidden`, {
        method: "PUT",
        body: JSON.stringify({ isHidden }),
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      await queryClient.invalidateQueries({ queryKey });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      apiClient.request<void>(`/admin/reviews/${id}`, { method: "DELETE" }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      await queryClient.invalidateQueries({ queryKey });
    },
  });

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          Đánh giá sản phẩm
        </h2>
        <p className="text-sm text-white/60">
          Xem, ẩn/hiện hoặc xóa đánh giá của người dùng theo từng sản phẩm.
        </p>
      </section>

      <Card className="bg-[#020617] border-white/10 text-white">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-lg">Danh sách đánh giá</CardTitle>
            <Button
              size="sm"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              {isFetching && (
                <Spinner sizeClassName="h-4 w-4" className="mr-2" />
              )}
              Tải lại
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/70">Mã sản phẩm:</span>
              <input
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="(bỏ trống = tất cả)"
                className="bg-black/30 border border-white/20 rounded px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#44FF00] w-[220px]"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-white/80 select-none">
              <input
                type="checkbox"
                checked={includeHidden}
                onChange={(e) => setIncludeHidden(e.target.checked)}
              />
              Hiển thị cả đánh giá đã ẩn
            </label>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="flex items-center gap-2 text-white/70 py-8">
              <Spinner sizeClassName="h-5 w-5" />
              <span>Đang tải...</span>
            </div>
          ) : error ? (
            <p className="text-red-400 py-4">
              Không thể tải đánh giá. {(error as Error).message}
            </p>
          ) : !data || data.length === 0 ? (
            <p className="text-white/50 py-8">Chưa có đánh giá nào.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white/70">Ngày</TableHead>
                  <TableHead className="text-white/70">Sản phẩm</TableHead>
                  <TableHead className="text-white/70">Người gửi</TableHead>
                  <TableHead className="text-white/70">Sao</TableHead>
                  <TableHead className="text-white/70">Nội dung</TableHead>
                  <TableHead className="text-white/70">Trạng thái</TableHead>
                  <TableHead className="text-white/70 text-right">
                    Thao tác
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="text-white/80 text-sm whitespace-nowrap">
                      {fmtDate(r.createdAt)}
                    </TableCell>
                    <TableCell className="text-white/90">
                      <div className="flex flex-col">
                        <span className="font-semibold">{r.productName}</span>
                        <span className="text-xs text-white/50">
                          Mã: #{r.productId}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-white/80 text-sm">
                      <div className="flex flex-col">
                        <span className="text-white/90">{r.reviewerName}</span>
                        <span className="text-white/50 text-xs">
                          {r.reviewerEmail}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-white/80 text-sm">
                      {r.rating}/5
                    </TableCell>
                    <TableCell className="max-w-[260px] truncate text-white/80 text-sm">
                      {r.comment}
                    </TableCell>
                    <TableCell
                      className={
                        r.isHidden ? "text-yellow-300" : "text-emerald-400"
                      }
                    >
                      {r.isHidden ? "Đã ẩn" : "Hiển thị"}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10"
                        onClick={() =>
                          setHiddenMutation.mutate({
                            id: r.id,
                            isHidden: !r.isHidden,
                          })
                        }
                        disabled={setHiddenMutation.isPending}
                      >
                        {r.isHidden ? "Hiện" : "Ẩn"}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          if (confirm("Xóa đánh giá này?"))
                            deleteMutation.mutate(r.id);
                        }}
                        disabled={deleteMutation.isPending}
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
    </div>
  );
};

export default AdminReviews;
