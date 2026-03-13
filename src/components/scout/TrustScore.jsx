import { useEffect, useState } from "react";

const CIRCUMFERENCE = 2 * Math.PI * 54; // 339.29

function getScoreColor(score) {
  if (score >= 70) return "#22c55e";
  if (score >= 40) return "#f59e0b";
  return "#ef4444";
}

function getVerdictStyle(verdict) {
  switch (verdict?.toUpperCase()) {
    case "SAFE":
      return { color: "#22c55e", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.25)" };
    case "CAUTION":
      return { color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)" };
    case "RISKY":
      return { color: "#f97316", bg: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.25)" };
    case "DANGER":
      return { color: "#ef4444", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.25)" };
    default:
      return { color: "#888", bg: "rgba(136,136,136,0.08)", border: "rgba(136,136,136,0.25)" };
  }
}

export default function TrustScore({ score, verdict }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  const color = getScoreColor(score);
  const offset = animated ? CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE : CIRCUMFERENCE;
  const vStyle = getVerdictStyle(verdict);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      {/* Ring */}
      <div style={{ position: "relative", width: 160, height: 160 }}>
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${color}12 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <svg
          width="160"
          height="160"
          viewBox="0 0 120 120"
          style={{ transform: "rotate(-90deg)", display: "block" }}
        >
          {/* Track */}
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="6"
          />
          {/* Progress */}
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{
              transition: "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1), stroke 0.3s ease",
              filter: `drop-shadow(0 0 6px ${color}88)`,
            }}
          />
        </svg>
        {/* Score number in center */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "2.6rem",
              color: "#fff",
              lineHeight: 1,
            }}
          >
            {score}
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              color: "#555",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            TRUST
          </span>
        </div>
      </div>

      {/* Verdict badge */}
      {verdict && (
        <div
          style={{
            padding: "6px 18px",
            border: `1px solid ${vStyle.border}`,
            background: vStyle.bg,
            borderRadius: 2,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: vStyle.color,
              boxShadow: `0 0 6px ${vStyle.color}`,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              color: vStyle.color,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {verdict}
          </span>
        </div>
      )}
    </div>
  );
}
