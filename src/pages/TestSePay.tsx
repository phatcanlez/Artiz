import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { apiClient } from "@/lib/api";
import { Spinner } from "@/components/ui/Spinner";

// Thứ tự input PHẢI đúng theo form mẫu SePay (không có payment_method)
const formFieldOrder = [
  "merchant",
  "currency",
  "order_amount",
  "operation",
  "order_description",
  "order_invoice_number",
  "customer_id",
  "success_url",
  "error_url",
  "cancel_url",
  "signature",
];

const TestSePay: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("Test thanh toan SePay");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const num = parseInt(amount.replace(/\D/g, ""), 10) || 0;
    if (num <= 0) {
      setError("Vui lòng nhập số tiền lớn hơn 0 (VND)");
      return;
    }

    setLoading(true);
    try {
      const orderInvoiceNumber = `TEST-${Date.now()}`;
      const sepay = await apiClient.createSePayCheckout({
        OrderInvoiceNumber: orderInvoiceNumber,
        OrderAmount: num,
        Currency: "VND",
        OrderDescription: description || `Test ${orderInvoiceNumber}`,
      });

      const form = document.createElement("form");
      form.method = "POST";
      form.action = sepay.checkoutUrl;
      for (const name of formFieldOrder) {
        const value = sepay.fields[name];
        if (value == null) continue;
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
      }
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gọi API SePay thất bại");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (value: string) => {
    const n = value.replace(/\D/g, "");
    if (!n) return "";
    return new Intl.NumberFormat("vi-VN").format(parseInt(n, 10));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setAmount(raw === "" ? "" : formatPrice(raw));
  };

  return (
    <div className="flex flex-col overflow-x-hidden items-stretch bg-black min-h-screen">
      <Header />

      <main className="flex flex-col items-center flex-1 py-12 px-4">
        <div className="w-full max-w-md">
          <h1 className="text-[#F3FAF4] text-2xl font-bold mb-2 text-center">
            Test API SePay
          </h1>
          <p className="text-[#F3FAF4]/70 text-sm mb-6 text-center">
            Nhập số tiền (VND) để chuyển sang trang thanh toán SePay Sandbox
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4"
          >
            <div>
              <label className="text-[#F3FAF4] text-sm font-medium mb-2 block">
                Số tiền (VND) *
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={amount}
                onChange={handleAmountChange}
                placeholder="VD: 100000"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-[#F3FAF4] placeholder-[#F3FAF4]/40 outline-none focus:ring-1 focus:ring-[#44FF00]/50 focus:border-[#44FF00]"
              />
            </div>

            <div>
              <label className="text-[#F3FAF4] text-sm font-medium mb-2 block">
                Mô tả (tùy chọn)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả đơn hàng"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-[#F3FAF4] placeholder-[#F3FAF4]/40 outline-none focus:ring-1 focus:ring-[#44FF00]/50 focus:border-[#44FF00]"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-[#44FF00] text-[#102314] font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              <span className="inline-flex items-center justify-center gap-2">
                {loading && <Spinner sizeClassName="h-5 w-5" />}
                {loading ? "Đang xử lý..." : "Chuyển đến SePay"}
              </span>
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TestSePay;
