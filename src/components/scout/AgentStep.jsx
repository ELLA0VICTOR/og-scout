import AttestationBadge from "./AttestationBadge";
import StatusPill from "../ui/StatusPill";

const AGENT_ICONS = {
  1: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="12" y1="4" x2="12" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="20" x2="12" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="12" x2="1" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  2: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.25C16.5 22.15 20 17.25 20 12V6L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  3: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  4: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  5: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

function getRiskColor(score) {
  if (score == null) return "#555";
  if (score <= 30) return "#22c55e";
  if (score <= 60) return "#f59e0b";
  return "#ef4444";
}

export default function AgentStep({ agent, index }) {
  const agentNum = index + 1;
  const isQueued = !agent;
  const isRunning = agent?.status === "running";
  const isComplete = agent?.status === "complete";
  const isError = agent?.status === "error";

  const AGENT_NAMES = [
    "Smart Contract Risk Analyzer",
    "Tokenomics Integrity Agent",
    "On-Chain Behavior Agent",
    "Narrative & Team Credibility",
    "Synthesis & Trust Score Engine",
  ];

  const agentName = agent?.agent_name || AGENT_NAMES[index];
  const riskColor = getRiskColor(agent?.risk_score);

  const borderColor = isRunning
    ? "#24B3BD"
    : isComplete
    ? "#1e3a1e"
    : isError
    ? "#3a1e1e"
    : "#1e1e1e";

  const borderLeftColor = isRunning
    ? "#24B3BD"
    : isComplete
    ? "#22c55e"
    : isError
    ? "#ef4444"
    : "#2a2a2a";

  const truncatedFindings =
    agent?.findings && agent.findings.length > 220
      ? agent.findings.slice(0, 220) + "..."
      : agent?.findings;

  return (
    <div
      style={{
        position: "relative",
        background: "#0c0c0c",
        border: `1px solid ${borderColor}`,
        borderLeft: `2px solid ${borderLeftColor}`,
        borderRadius: 2,
        padding: "14px 18px",
        overflow: "hidden",
        transition: "border-color 0.3s ease",
      }}
    >
      {isRunning && <div className="agent-scan-line" />}

      <div className="agent-step-header">
        <div className="agent-step-main" style={{ minWidth: 0 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              color: isRunning ? "#24B3BD" : isComplete ? "#22c55e" : "#444",
              letterSpacing: "0.05em",
              minWidth: 20,
            }}
          >
            {String(agentNum).padStart(2, "0")}
          </span>

          <span
            style={{
              color: isRunning ? "#24B3BD" : isComplete ? "#22c55e" : "#444",
              display: "flex",
              alignItems: "center",
              transition: "color 0.3s",
              flexShrink: 0,
            }}
          >
            {AGENT_ICONS[agentNum]}
          </span>

          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(0.82rem, 0.3vw + 0.75rem, 0.98rem)",
              color: isQueued ? "#444" : "#ccc",
              letterSpacing: "0.01em",
              minWidth: 0,
            }}
          >
            {agentName}
          </span>
        </div>

        <div className="agent-step-meta" style={{ flexShrink: 0, justifyContent: "flex-end" }}>
          {isComplete && agent?.risk_score != null && (
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                color: riskColor,
                fontWeight: 500,
              }}
            >
              {agent.risk_score}
              <span style={{ color: "#444", fontSize: "0.6rem" }}>/100</span>
            </span>
          )}
          <StatusPill
            status={isQueued ? "queued" : isRunning ? "running" : isError ? "error" : "complete"}
          />
        </div>
      </div>

      {isComplete && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #1a1a1a" }}>
          {agent?.flags && agent.flags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
              {agent.flags.map((flag, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.7rem",
                    color: "#aaa",
                    padding: "2px 8px",
                    border: "1px solid #2a2a2a",
                    borderRadius: 2,
                    background: "#111",
                  }}
                >
                  {flag}
                </span>
              ))}
            </div>
          )}

          {truncatedFindings && (
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.78rem",
                color: "#888",
                lineHeight: 1.6,
                margin: "0 0 10px 0",
              }}
            >
              {truncatedFindings}
            </p>
          )}

          {agent?.payment_hash && (
            <div className="attestation-row">
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  color: "#444",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                attestation
              </span>
              <AttestationBadge hash={agent.payment_hash} />
            </div>
          )}
        </div>
      )}

      {isError && (
        <p
          style={{
            marginTop: 8,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem",
            color: "#ef4444",
          }}
        >
          {agent?.findings || "Agent inference failed"}
        </p>
      )}
    </div>
  );
}
