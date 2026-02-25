import React from "react";

interface SegmentedRingProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
  segments?: number;
  color?: string;
  /** Nội dung đặt ở giữa vòng (vd: 3D viewer) */
  children?: React.ReactNode;
}

/**
 * Vòng tròn phân đoạn (6 cung trắng, khe hở), có thể đặt nội dung 3D ở giữa.
 */
export const SegmentedRing: React.FC<SegmentedRingProps> = ({
  className = "",
  size = 380,
  strokeWidth = 12,
  segments = 6,
  color = "white",
  children,
}) => {
  const r = size / 2 - strokeWidth / 2;
  const cx = size / 2;
  const cy = size / 2;
  const gapAngle = (2 * Math.PI) / segments;
  const arcAngle = gapAngle * 0.55;

  const paths: string[] = [];
  for (let i = 0; i < segments; i++) {
    const start = -Math.PI / 2 + i * gapAngle;
    const end = start + arcAngle;
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const large = arcAngle > Math.PI ? 1 : 0;
    paths.push(
      `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="absolute inset-0 pointer-events-none"
        style={{ color }}
      >
        <defs>
          <filter id="ring-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {paths.map((d, i) => (
          <g key={i} filter="url(#ring-glow)">
            <path
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            {/* Protrusion at segment end */}
            {i % 2 === 0 && (
              <>
                <line
                  x1={cx + r * Math.cos(-Math.PI / 2 + (i + 1) * gapAngle - 0.08)}
                  y1={cy + r * Math.sin(-Math.PI / 2 + (i + 1) * gapAngle - 0.08)}
                  x2={cx + (r + 18) * Math.cos(-Math.PI / 2 + (i + 1) * gapAngle - 0.08)}
                  y2={cy + (r + 18) * Math.sin(-Math.PI / 2 + (i + 1) * gapAngle - 0.08)}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1={cx + r * Math.cos(-Math.PI / 2 + i * gapAngle + 0.08)}
                  y1={cy + r * Math.sin(-Math.PI / 2 + i * gapAngle + 0.08)}
                  x2={cx + (r - 14) * Math.cos(-Math.PI / 2 + i * gapAngle + 0.08)}
                  y2={cy + (r - 14) * Math.sin(-Math.PI / 2 + i * gapAngle + 0.08)}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  strokeLinecap="round"
                />
              </>
            )}
          </g>
        ))}
      </svg>
      <div className="relative z-10 w-[72%] h-[72%] rounded-full overflow-hidden bg-[#0A0C13] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};
