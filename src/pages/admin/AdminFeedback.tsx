import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient, type FeedbackDto } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/Spinner";

const AdminFeedback: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: list, isLoading, error, refetch, isFetching } = useQuery<FeedbackDto[]>({
    queryKey: ["admin-feedback"],
    queryFn: () => apiClient.request<FeedbackDto[]>("/admin/feedback"),
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const selected = list?.find((f) => f.id === selectedId);

  const replyMutation = useMutation({
    mutationFn: ({ id, adminReply }: { id: number; adminReply: string }) =>
      apiClient.request<void>(`/admin/feedback/${id}/reply`, {
        method: "PUT",
        body: JSON.stringify({ adminReply }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-feedback"] });
      setReplyText("");
      setSelectedId(null);
    },
  });

  const openDetail = (f: FeedbackDto) => {
    setSelectedId(f.id);
    setReplyText(f.adminReply ?? "");
  };

  const handleReply = () => {
    if (selectedId == null) return;
    replyMutation.mutate({ id: selectedId, adminReply: replyText });
  };

  const formatDate = (s: string) => {
    try {
      return new Date(s).toLocaleString("vi-VN");
    } catch {
      return s;
    }
  };

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold text-white mb-2">Phản hồi khách hàng</h2>
        <p className="text-sm text-white/60">
          Xem và phản hồi lại các tin nhắn từ trang Contact.
        </p>
      </section>

      <Card className="bg-[#020617] border-white/10 text-white">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-lg">Danh sách phản hồi</CardTitle>
            <Button
              size="sm"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              {isFetching && <Spinner sizeClassName="h-4 w-4" className="mr-2" />}
              Tải lại
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex items-center gap-2 text-white/70 py-8">
              <Spinner sizeClassName="h-5 w-5" />
              <span>Đang tải...</span>
            </div>
          )}
          {error && (
            <p className="text-red-400 py-4">
              Không thể tải danh sách phản hồi. {(error as Error).message}
            </p>
          )}
          {list && list.length === 0 && (
            <p className="text-white/50 py-8">Chưa có phản hồi nào.</p>
          )}
          {list && list.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white/70">Ngày</TableHead>
                  <TableHead className="text-white/70">Họ tên</TableHead>
                  <TableHead className="text-white/70">Email</TableHead>
                  <TableHead className="text-white/70">Nội dung</TableHead>
                  <TableHead className="text-white/70">Đã phản hồi</TableHead>
                  <TableHead className="text-white/70 text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {list.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell className="text-white/80 text-sm whitespace-nowrap">
                      {formatDate(f.createdAt)}
                    </TableCell>
                    <TableCell className="text-white/90">{f.name}</TableCell>
                    <TableCell className="text-white/80 text-sm">{f.email}</TableCell>
                    <TableCell className="max-w-[200px] truncate text-white/80 text-sm">
                      {f.message}
                    </TableCell>
                    <TableCell className="text-white/70">
                      {f.repliedAt ? "Có" : "Chưa"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10"
                        onClick={() => openDetail(f)}
                      >
                        Xem / Phản hồi
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={selectedId != null} onOpenChange={(open) => !open && setSelectedId(null)}>
        <DialogContent className="bg-[#020617] border-white/10 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white">Chi tiết phản hồi</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-white/50">Họ tên:</span>
                <span>{selected.name}</span>
                <span className="text-white/50">Email:</span>
                <span>{selected.email}</span>
                {selected.phone && (
                  <>
                    <span className="text-white/50">Điện thoại:</span>
                    <span>{selected.phone}</span>
                  </>
                )}
                <span className="text-white/50">Ngày gửi:</span>
                <span>{formatDate(selected.createdAt)}</span>
              </div>
              <div>
                <Label className="text-white/70 text-xs">Nội dung khách gửi</Label>
                <p className="mt-1 p-3 bg-black/30 rounded text-sm text-white/90 whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>
              <div>
                <Label className="text-white/70 text-xs">Phản hồi của bạn (gửi lại cho khách)</Label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Nhập nội dung phản hồi..."
                  rows={4}
                  className="mt-1 w-full bg-black/30 border border-white/20 rounded px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#44FF00]"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              className="border-white/30 text-white"
              onClick={() => setSelectedId(null)}
            >
              Đóng
            </Button>
            <Button
              className="bg-[#44FF00] text-black hover:bg-[#33cc00]"
              onClick={handleReply}
              disabled={replyMutation.isPending}
            >
              {replyMutation.isPending && <Spinner sizeClassName="h-4 w-4" className="mr-2" />}
              Lưu phản hồi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminFeedback;
