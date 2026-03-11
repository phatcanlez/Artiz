import React, { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/lib/api";
import { Spinner } from "@/components/ui/Spinner";

const fmtBytes = (n: number) => {
  if (!Number.isFinite(n) || n < 0) return "";
  const units = ["B", "KB", "MB", "GB"];
  let v = n;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(i === 0 ? 0 : 2)} ${units[i]}`;
};

const Optimate: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState<string>("model.optimized.glb");
  const [meta, setMeta] = useState<{ optimized: boolean; originalBytes?: number; outputBytes?: number } | null>(null);

  const inputSize = file?.size ?? 0;

  const savings = useMemo(() => {
    if (!meta?.originalBytes || !meta?.outputBytes) return null;
    const diff = meta.originalBytes - meta.outputBytes;
    const pct = meta.originalBytes > 0 ? (diff / meta.originalBytes) * 100 : 0;
    return { diff, pct };
  }, [meta]);

  const onPick = (f: File | null) => {
    setError(null);
    setMeta(null);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
    if (!f) {
      setFile(null);
      return;
    }
    const ext = f.name.toLowerCase().endsWith(".glb");
    if (!ext) {
      setFile(null);
      setError("Trang này hiện chỉ hỗ trợ file .glb");
      return;
    }
    setFile(f);
  };

  const run = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setMeta(null);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
    try {
      const { blob, headers } = await apiClient.optimateGlb(file);
      const url = URL.createObjectURL(blob);
      setResultUrl(url);

      const cd = headers.get("content-disposition") ?? "";
      const m = /filename="([^"]+)"/i.exec(cd);
      setResultName(m?.[1] ?? `${file.name.replace(/\.glb$/i, "")}.optimized.glb`);

      const optimized = headers.get("x-optimized") === "1";
      const originalBytes = Number(headers.get("x-original-bytes") ?? "");
      const outputBytes = Number(headers.get("x-output-bytes") ?? "");
      setMeta({
        optimized,
        originalBytes: Number.isFinite(originalBytes) ? originalBytes : undefined,
        outputBytes: Number.isFinite(outputBytes) ? outputBytes : undefined,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Tối ưu thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-1 px-4 sm:px-6 py-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Optimate 3D (.glb)</h1>
          <p className="text-white/70 text-sm mb-6">
            Upload file .glb nặng → hệ thống tối ưu để nhẹ hơn (an toàn, không làm bể model).
          </p>

          {(!isAuthenticated || !isAdmin) && (
            <div className="border border-red-500/30 bg-red-500/10 text-red-200 text-sm px-4 py-3 rounded-lg mb-6">
              Bạn cần đăng nhập bằng tài khoản <b>Admin</b> để dùng tiện ích này.
            </div>
          )}

          <div className="border border-white/10 bg-white/5 rounded-xl p-5 space-y-4">
            {error && (
              <div className="border border-red-500/30 bg-red-500/10 text-red-200 text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="optimate-file" className="text-sm font-semibold text-white/80">
                Chọn file .glb
              </label>
              <input
                id="optimate-file"
                type="file"
                accept=".glb,model/gltf-binary"
                onChange={(e) => onPick(e.target.files?.[0] ?? null)}
                className="block w-full text-sm text-white/80 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-white file:text-black file:font-semibold hover:file:bg-white/90"
                disabled={!isAuthenticated || !isAdmin}
              />
              {file && (
                <p className="text-xs text-white/60">
                  Đã chọn: <span className="text-white/80">{file.name}</span> · {fmtBytes(inputSize)}
                </p>
              )}
            </div>

            <button
              onClick={run}
              disabled={!file || loading || !isAuthenticated || !isAdmin}
              className="w-full py-3 rounded-lg bg-[#44FF00] text-black font-bold hover:bg-[#33cc00] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Spinner sizeClassName="h-4 w-4" />}
              Tối ưu & tải về
            </button>

            {meta && (
              <div className="text-sm text-white/80 space-y-1">
                <p>
                  Trạng thái:{" "}
                  <b className={meta.optimized ? "text-[#44FF00]" : "text-white/70"}>
                    {meta.optimized ? "Đã tối ưu" : "Không giảm được thêm (trả file gốc)"}
                  </b>
                </p>
                {meta.originalBytes != null && meta.outputBytes != null && (
                  <p>
                    Dung lượng: {fmtBytes(meta.originalBytes)} → {fmtBytes(meta.outputBytes)}
                    {savings && (
                      <>
                        {" "}
                        (<span className="text-[#44FF00] font-semibold">
                          -{fmtBytes(Math.max(0, savings.diff))} / {savings.pct.toFixed(1)}%
                        </span>)
                      </>
                    )}
                  </p>
                )}
              </div>
            )}

            {resultUrl && (
              <a
                href={resultUrl}
                download={resultName}
                className="inline-flex items-center justify-center w-full py-3 rounded-lg border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Tải file đã tối ưu
              </a>
            )}

            <p className="text-xs text-white/50">
              Gợi ý: file sẽ nhẹ nhất khi model có nhiều mesh/triangles; với file đã tối ưu sẵn thì có thể không giảm thêm.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Optimate;

