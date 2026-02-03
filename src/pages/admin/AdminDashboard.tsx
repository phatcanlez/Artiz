import React from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";

interface MonthlyRevenue {
  year: number;
  month: number;
  revenue: number;
  ordersCount: number;
}

interface DashboardSummary {
  totalUsers: number;
  totalActiveUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  monthlyRevenue: MonthlyRevenue[];
}

const AdminDashboard: React.FC = () => {
  const { data, isLoading, error } = useQuery<DashboardSummary>({
    queryKey: ["admin-dashboard-summary"],
    queryFn: () =>
      apiClient.request<DashboardSummary>("/admin/dashboard/summary"),
  });

  const monthlyData =
    data?.monthlyRevenue.map((m) => ({
      name: `${m.month}/${m.year.toString().slice(-2)}`,
      revenue: m.revenue,
      orders: m.ordersCount,
    })) ?? [];

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold text-white mb-2">Tổng quan</h2>
        <p className="text-sm text-white/60">
          Số liệu tổng quan về người dùng, sản phẩm, đơn hàng và doanh thu.
        </p>
      </section>

      {isLoading && (
        <div className="text-white/70 text-sm">
          Đang tải dữ liệu dashboard...
        </div>
      )}
      {error && (
        <div className="text-red-400 text-sm">
          Không thể tải dữ liệu dashboard. Vui lòng thử lại sau.
        </div>
      )}

      {data && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <Card className="bg-[#020617] border-white/10 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-white/70">
                  Người dùng
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-baseline justify-between pt-0">
                <span className="text-3xl font-bold">{data.totalUsers}</span>
                <span className="text-xs text-emerald-400">
                  {data.totalActiveUsers} đang hoạt động
                </span>
              </CardContent>
            </Card>

            <Card className="bg-[#020617] border-white/10 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-white/70">
                  Sản phẩm
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-baseline justify-between pt-0">
                <span className="text-3xl font-bold">{data.totalProducts}</span>
              </CardContent>
            </Card>

            <Card className="bg-[#020617] border-white/10 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-white/70">
                  Đơn hàng
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-baseline justify-between pt-0">
                <span className="text-3xl font-bold">{data.totalOrders}</span>
              </CardContent>
            </Card>

            <Card className="bg-[#020617] border-white/10 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-white/70">
                  Doanh thu
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-baseline justify-between pt-0">
                <span className="text-3xl font-bold">
                  {data.totalRevenue.toLocaleString("vi-VN")}₫
                </span>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-[#020617] border-white/10 text-white mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Doanh thu theo tháng</CardTitle>
            </CardHeader>
            <CardContent className="h-[320px]">
              {monthlyData.length === 0 ? (
                <div className="text-sm text-white/60 flex items-center justify-center h-full">
                  Chưa có dữ liệu doanh thu.
                </div>
              ) : (
                <ChartContainer
                  config={{
                    revenue: { label: "Doanh thu", color: "#38bdf8" },
                    orders: { label: "Đơn hàng", color: "#22c55e" },
                  }}
                  className={cn("w-full h-full")}
                >
                  <LineChart data={monthlyData}>
                    <CartesianGrid stroke="#1f2937" strokeDasharray="4 4" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis
                      stroke="#9ca3af"
                      tickFormatter={(v) =>
                        v >= 1_000_000
                          ? `${(v / 1_000_000).toFixed(0)}M`
                          : v.toLocaleString("vi-VN")
                      }
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-revenue)"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="var(--color-orders)"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
