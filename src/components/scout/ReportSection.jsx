import AttestationBadge from "./AttestationBadge";
import TrustScore from "./TrustScore";

function parseReport(reportSummary) {
  if (!reportSummary) return null;
  try {
    return typeof reportSummary === "string" ? JSON.parse(reportSummary) : reportSummary;
  } catch {
    return null;
  }
}

export default function ReportSection({ job }) {
  const report = parseReport(job.report_summary);
  if (!report) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          padding: "clamp(28px, 5vw, 40px) clamp(16px, 3vw, 24px)",
          background: "#080808",
          border: "1px solid #1a1a1a",
          borderRadius: 2,
        }}
      >
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem",
            color: "#444",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          COMPOSITE TRUST SCORE
        </p>
        <TrustScore score={job.trust_score} verdict={report.verdict} />
      </div>

      {report.summary && (
        <div>
          <h3
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "0.75rem",
              color: "#555",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Executive Summary
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              color: "#ccc",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            {report.summary}
          </p>
        </div>
      )}

      <div className="report-insights-grid">
        {report.key_strengths && report.key_strengths.length > 0 && (
          <div
            style={{
              padding: "16px 18px",
              background: "#080808",
              border: "1px solid #1e1e1e",
              borderLeft: "2px solid rgba(34,197,94,0.4)",
              borderRadius: 2,
            }}
          >
            <h4
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6rem",
                color: "#22c55e",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                margin: "0 0 12px 0",
              }}
            >
              Key Strengths
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {report.key_strengths.map((s, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: 8,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    color: "#999",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: "#22c55e", flexShrink: 0, marginTop: 2 }}>+</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {report.key_risks && report.key_risks.length > 0 && (
          <div
            style={{
              padding: "16px 18px",
              background: "#080808",
              border: "1px solid #1e1e1e",
              borderLeft: "2px solid rgba(239,68,68,0.4)",
              borderRadius: 2,
            }}
          >
            <h4
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6rem",
                color: "#ef4444",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                margin: "0 0 12px 0",
              }}
            >
              Key Risks
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {report.key_risks.map((r, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: 8,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    color: "#999",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: "#ef4444", flexShrink: 0, marginTop: 2 }}>+</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {report.recommendation && (
        <div
          style={{
            padding: "16px 20px",
            background: "rgba(36,179,189,0.04)",
            border: "1px solid rgba(36,179,189,0.2)",
            borderRadius: 2,
          }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              color: "#24B3BD",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Recommendation
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              color: "#ddd",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {report.recommendation}
          </p>
        </div>
      )}

      <div
        style={{
          padding: "16px 20px",
          background: "#060606",
          border: "1px solid #141414",
          borderRadius: 2,
        }}
      >
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem",
            color: "#444",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          Attestation Chain
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {job.agents
            .filter((a) => a.payment_hash)
            .map((a) => (
              <div key={a.agent_id} className="attestation-row" style={{ alignItems: "center" }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    color: "#444",
                    minWidth: 180,
                    maxWidth: "100%",
                  }}
                >
                  Agent {a.agent_id} - {a.agent_name}
                </span>
                <AttestationBadge hash={a.payment_hash} />
              </div>
            ))}
          {job.master_attestation && (
            <div
              className="attestation-row"
              style={{
                alignItems: "center",
                paddingTop: 10,
                marginTop: 4,
                borderTop: "1px solid #1a1a1a",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  color: "#24B3BD",
                  minWidth: 180,
                  maxWidth: "100%",
                }}
              >
                Master Attestation
              </span>
              <AttestationBadge hash={job.master_attestation} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

