import { useParams } from "react-router-dom";
import { useState } from "react";
import { useJobPoller } from "../hooks/useJobPoller";
import Header from "../components/layout/Header";
import AgentPipeline from "../components/scout/AgentPipeline";
import ReportSection from "../components/scout/ReportSection";

function getStatusLabel(status) {
  if (!status || status === "pending") return { label: "PENDING", color: "#555" };
  if (status === "complete") return { label: "COMPLETE", color: "#22c55e" };
  if (status === "failed") return { label: "FAILED", color: "#ef4444" };
  return { label: "SCANNING", color: "#24B3BD", pulse: true };
}

function ProgressBar({ status, agents = [] }) {
  const totalAgents = 5;
  const completeAgents = agents.filter((a) => a.status === "complete").length;
  const pct =
    status === "complete"
      ? 100
      : Math.round((completeAgents / totalAgents) * 100);

  return (
    <div
      style={{
        height: 2,
        background: "#111",
        borderRadius: 1,
        overflow: "hidden",
        marginBottom: 28,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background: status === "complete" ? "#22c55e" : "#24B3BD",
          transition: "width 0.6s ease",
          boxShadow: status === "complete"
            ? "0 0 8px rgba(34,197,94,0.4)"
            : "0 0 8px rgba(36,179,189,0.4)",
        }}
      />
    </div>
  );
}

export default function Report() {
  const { jobId } = useParams();
  const { data: job, isLoading, error } = useJobPoller(jobId);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const statusInfo = getStatusLabel(job?.status);
  const isComplete = job?.status === "complete";
  const isFailed = job?.status === "failed";

  return (
    <div style={{ minHeight: "100vh", background: "#000" }}>
      <div className="report-shell">
        <Header showBack onShare={isComplete ? handleShare : undefined} />

        {isLoading && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "40vh",
              gap: 12,
              flexDirection: "column",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              style={{ animation: "spin 0.8s linear infinite" }}
            >
              <style>{`@keyframes spin { to { transform: rotate(360deg); }}`}</style>
              <circle cx="12" cy="12" r="9" stroke="#1a1a1a" strokeWidth="2" />
              <path d="M12 3a9 9 0 0 1 9 9" stroke="#24B3BD" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                color: "#444",
                letterSpacing: "0.08em",
              }}
            >
              LOADING JOB...
            </span>
          </div>
        )}

        {error && (
          <div
            style={{
              padding: 24,
              border: "1px solid #3a1e1e",
              borderRadius: 2,
              background: "#0a0000",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "#ef4444",
                fontSize: "0.85rem",
                margin: 0,
              }}
            >
              {error.message || "Job not found"}
            </p>
          </div>
        )}

        {job && (
          <>
            <div
              className="report-target-row"
              style={{
                alignItems: "flex-start",
                marginBottom: 24,
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    color: "#444",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Target
                </p>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "clamp(0.95rem, 1vw + 0.7rem, 1.2rem)",
                    color: "#fff",
                    letterSpacing: "0.02em",
                    margin: 0,
                    wordBreak: "break-word",
                  }}
                >
                  {job.target}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "6px 12px",
                  border: `1px solid ${statusInfo.color}33`,
                  borderRadius: 2,
                  background: `${statusInfo.color}08`,
                  flexShrink: 0,
                  animation: statusInfo.pulse
                    ? "pulse-brand 2s cubic-bezier(0.4,0,0.6,1) infinite"
                    : "none",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: statusInfo.color,
                    boxShadow: `0 0 5px ${statusInfo.color}`,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    color: statusInfo.color,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {statusInfo.label}
                </span>
              </div>
            </div>

            <ProgressBar status={job.status} agents={job.agents} />

            {copied && (
              <div
                className="report-toast"
                style={{
                  padding: "10px 16px",
                  background: "#111",
                  border: "1px solid #24B3BD44",
                  borderRadius: 2,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.72rem",
                  color: "#24B3BD",
                  zIndex: 100,
                  letterSpacing: "0.05em",
                }}
              >
                URL copied to clipboard
              </div>
            )}

            <div className="report-section-head" style={{ marginBottom: 12 }}>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  color: "#444",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                Agent Pipeline
              </h2>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  color: "#333",
                  letterSpacing: "0.05em",
                }}
              >
                {job.agents.filter((a) => a.status === "complete").length} / 5 complete
              </span>
            </div>

            <AgentPipeline agents={job.agents} />

            {isFailed && job.error && (
              <div
                style={{
                  marginTop: 20,
                  padding: "16px 20px",
                  background: "#0a0000",
                  border: "1px solid #3a1e1e",
                  borderLeft: "2px solid #ef4444",
                  borderRadius: 2,
                }}
              >
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.62rem",
                    color: "#ef4444",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Pipeline Error
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    color: "#888",
                    margin: 0,
                    lineHeight: 1.5,
                    wordBreak: "break-word",
                  }}
                >
                  {job.error}
                </p>
              </div>
            )}

            {isComplete && (
              <div style={{ marginTop: 40 }}>
                <h2
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    color: "#444",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: 20,
                  }}
                >
                  Intelligence Report
                </h2>
                <ReportSection job={job} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
