import Header from "../components/layout/Header";
import SearchBar from "../components/scout/SearchBar";

/* ── Font constants ─────────────────────────────── */
const ORBITRON = "'Orbitron', monospace";
const SYNE = "'Syne', sans-serif";
const JAKARTA = "'Plus Jakarta Sans', sans-serif";
const MONO = "'Space Mono', monospace";
const PREMIUM_MONO = "'IBM Plex Mono', 'SFMono-Regular', 'Menlo', monospace";

/* ── Marquee ticker data ────────────────────────── */
const TICKER_ITEMS = [
  { addr: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", name: "UNI", score: 82, verdict: "SAFE" },
  { addr: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9", name: "AAVE", score: 78, verdict: "SAFE" },
  { addr: "0x514910771AF9Ca656af840dff83E8264EcF986CA", name: "LINK", score: 74, verdict: "SAFE" },
  { addr: "0xD533a949740bb3306d119CC777fa900bA034cd52", name: "CRV", score: 61, verdict: "CAUTION" },
  { addr: "0x6B175474E89094C44Da98b954EedeAC495271d0F", name: "DAI", score: 91, verdict: "SAFE" },
  { addr: "0xc00e94Cb662C3520282E6f5717214004A7f26888", name: "COMP", score: 69, verdict: "CAUTION" },
  { addr: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2", name: "MKR", score: 85, verdict: "SAFE" },
  { addr: "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e", name: "YFI", score: 58, verdict: "CAUTION" },
];

function verdictColor(v) {
  if (v === "SAFE") return "#22c55e";
  if (v === "CAUTION") return "#f59e0b";
  if (v === "RISKY") return "#f97316";
  return "#ef4444";
}

/* ── Ticker row ─────────────────────────────────── */
function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      style={{
        borderTop: "1px solid #111",
        borderBottom: "1px solid #111",
        background: "#040404",
        padding: "10px 0",
        overflow: "hidden",
      }}
    >
      <div className="marquee-track" style={{ gap: 0 }}>
        {doubled.map((item, i) => (
          <div
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "0 32px",
              borderRight: "1px solid #111",
              flexShrink: 0,
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: "0.62rem", color: "#333", letterSpacing: "0.05em" }}>
              {item.addr.slice(0, 6)}...{item.addr.slice(-4)}
            </span>
            <span style={{ fontFamily: ORBITRON, fontSize: "0.62rem", fontWeight: 600, color: "#666", letterSpacing: "0.08em" }}>
              {item.name}
            </span>
            <span
              style={{
                fontFamily: MONO,
                fontSize: "0.58rem",
                fontWeight: 700,
                color: verdictColor(item.verdict),
                letterSpacing: "0.06em",
              }}
            >
              {item.score}
            </span>
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: verdictColor(item.verdict),
                boxShadow: `0 0 5px ${verdictColor(item.verdict)}`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Stats bar ──────────────────────────────────── */
const STATS = [
  { value: "5", label: "AI Agents" },
  { value: "5x", label: "TEE Attestations" },
  { value: "GPT-4.1", label: "Model" },
  { value: "Base", label: "Settlement" },
  { value: "x402", label: "Protocol" },
];

function StatsBar() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        border: "1px solid #111",
        borderRadius: 2,
        overflow: "hidden",
        background: "#060606",
      }}
    >
      {STATS.map((s, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            padding: "16px 0",
            textAlign: "center",
            borderRight: i < STATS.length - 1 ? "1px solid #111" : "none",
          }}
        >
          <div
            style={{
              fontFamily: ORBITRON,
              fontWeight: 700,
              fontSize: "1.05rem",
              color: "#24B3BD",
              letterSpacing: "0.06em",
              marginBottom: 4,
            }}
          >
            {s.value}
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: "0.55rem",
              color: "#444",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── How it works steps ─────────────────────────── */
const STEPS = [
  {
    num: "01",
    title: "Submit Target",
    desc: "Enter any token contract address or project name. OG Scout accepts both.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <line x1="7" y1="8" x2="17" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="7" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="7" y1="16" x2="11" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "5 Agents Activate",
    desc: "Contract security, tokenomics, on-chain behavior, team credibility, and synthesis run sequentially inside OpenGradient TEEs.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.5" />
        <line x1="12" y1="1" x2="12" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="23" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="12" y1="23" x2="12" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="1" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "On-Chain Attestation",
    desc: "Each agent call is settled via x402 on Base Sepolia. Every payment hash is a cryptographic proof of what the model was asked and answered.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.25C16.5 22.15 20 17.25 20 12V6L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Trust Score + Report",
    desc: "A synthesis agent reads all 4 agent outputs and produces a final composite Trust Score (0–100) with verdict, risks, strengths, and recommendation.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/* ── Agent breakdown cards ──────────────────────── */
const AGENTS = [
  {
    id: "01",
    name: "Smart Contract Risk",
    tags: ["Ownership", "Mint functions", "Blacklist", "Proxy risks", "Audits"],
    color: "#24B3BD",
  },
  {
    id: "02",
    name: "Tokenomics Integrity",
    tags: ["Supply distribution", "Vesting", "Liquidity lock", "Whale wallets", "Inflation"],
    color: "#a78bfa",
  },
  {
    id: "03",
    name: "On-Chain Behavior",
    tags: ["Wash trading", "Wallet clustering", "Honeypot", "Rug patterns", "Volume"],
    color: "#34d399",
  },
  {
    id: "04",
    name: "Narrative & Team",
    tags: ["Whitepaper", "Doxxed team", "Roadmap delivery", "Shill signals", "Bot activity"],
    color: "#fbbf24",
  },
  {
    id: "05",
    name: "Synthesis Engine",
    tags: ["Composite score", "Verdict", "Strengths", "Risks", "Recommendation"],
    color: "#f472b6",
  },
];

/* ── Mock report preview ────────────────────────── */
function ReportPreview() {
  return (
    <div
      style={{
        background: "#060606",
        border: "1px solid #1a1a1a",
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Window chrome */}
      <div
        style={{
          padding: "10px 16px",
          borderBottom: "1px solid #111",
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#040404",
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.6 }} />
          ))}
        </div>
        <span style={{ fontFamily: MONO, fontSize: "0.58rem", color: "#333", letterSpacing: "0.06em" }}>
          og-scout / report / a3f9b2c1-...
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "20px 20px 24px" }}>
        {/* Target */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{ fontFamily: MONO, fontSize: "0.68rem", color: "#24B3BD", letterSpacing: "0.04em" }}>
            0x1f9840a85d5aF5...984
          </span>
          <span
            style={{
              fontFamily: MONO,
              fontSize: "0.55rem",
              color: "#22c55e",
              letterSpacing: "0.1em",
              padding: "3px 8px",
              border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: 2,
              background: "rgba(34,197,94,0.06)",
            }}
          >
            COMPLETE
          </span>
        </div>

        {/* Agent rows */}
        {[
          { name: "Smart Contract Risk Analyzer", score: 22, status: "complete" },
          { name: "Tokenomics Integrity Agent",   score: 18, status: "complete" },
          { name: "On-Chain Behavior Agent",       score: 31, status: "complete" },
          { name: "Narrative & Team Credibility",  score: 25, status: "complete" },
          { name: "Synthesis & Trust Score Engine",score: null, status: "complete", isSynth: true },
        ].map((a, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 10px",
              marginBottom: 4,
              background: i === 4 ? "rgba(36,179,189,0.04)" : "#080808",
              border: `1px solid ${i === 4 ? "rgba(36,179,189,0.12)" : "#111"}`,
              borderLeft: `2px solid ${i === 4 ? "#24B3BD" : "#22c55e"}`,
              borderRadius: 1,
            }}
          >
            <span style={{ fontFamily: JAKARTA, fontSize: "0.72rem", color: i === 4 ? "#ccc" : "#666" }}>
              {a.name}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {a.score !== null && (
                <span style={{ fontFamily: MONO, fontSize: "0.62rem", color: a.score <= 30 ? "#22c55e" : "#f59e0b" }}>
                  {a.score}/100
                </span>
              )}
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e" }} />
            </div>
          </div>
        ))}

        {/* Score */}
        <div
          style={{
            marginTop: 16,
            padding: "14px 16px",
            background: "#040404",
            border: "1px solid #1a1a1a",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontFamily: MONO, fontSize: "0.55rem", color: "#444", letterSpacing: "0.1em", marginBottom: 4 }}>
              COMPOSITE TRUST SCORE
            </div>
            <div style={{ fontFamily: ORBITRON, fontSize: "2rem", fontWeight: 800, color: "#22c55e", lineHeight: 1 }}>
              82
            </div>
          </div>
          <div
            style={{
              padding: "6px 14px",
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: 2,
            }}
          >
            <span style={{ fontFamily: ORBITRON, fontSize: "0.7rem", fontWeight: 700, color: "#22c55e", letterSpacing: "0.1em" }}>
              SAFE
            </span>
          </div>
        </div>
      </div>

      {/* Fade overlay at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          background: "linear-gradient(transparent, #060606)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

/* ── Main Landing component ─────────────────────── */
export default function Landing() {
  return (
    <div style={{ minHeight: "100vh", background: "#000", position: "relative" }}>

      {/* Grid background */}
      <div
        className="grid-bg"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Center glow */}
      <div
        style={{
          position: "fixed",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 600,
          background: "radial-gradient(ellipse at center, rgba(36,179,189,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Full-width header */}
        <Header />

        {/* ── HERO ─────────────────────────────────── */}
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 28px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              paddingTop: "11vh",
              paddingBottom: "7vh",
            }}
          >
            {/* Eyebrow pill */}
            <div
              className="fade-up-1"
              style={{
                display: "none",
                alignItems: "center",
                gap: 8,
                padding: "5px 14px",
                border: "1px solid rgba(36,179,189,0.22)",
                borderRadius: 999,
                background: "rgba(36,179,189,0.05)",
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#24B3BD",
                  boxShadow: "0 0 6px #24B3BD",
                  animation: "pulse-brand 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: "0.6rem",
                  color: "#24B3BD",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                Verifiable AI Due Diligence · OpenGradient TEE
              </span>
            </div>

            {/* H1 */}
            <h1
              className="fade-up-1"
              style={{
                fontFamily: PREMIUM_MONO,
                fontWeight: 600,
                fontSize: "clamp(2.4rem, 5.4vw, 4.15rem)",
                color: "#fff",
                lineHeight: 1,
                letterSpacing: "-0.045em",
                marginBottom: 22,
              }}
            >
              Know before
              <br />
              <span style={{ color: "#24B3BD" }}>you ape.</span>
            </h1>

            {/* Sub */}
            <p
              className="fade-up-2"
              style={{
                fontFamily: PREMIUM_MONO,
                fontSize: "0.95rem",
                fontWeight: 400,
                color: "#666",
                maxWidth: 620,
                lineHeight: 1.8,
                letterSpacing: "-0.01em",
                marginBottom: 40,
              }}
            >
              Five AI agents analyze any Web3 project and produce a{" "}
              <span style={{ color: "#aaa", fontWeight: 500 }}>cryptographically attested</span>{" "}
              trust score  every inference settled on-chain.
            </p>

            {/* Search */}
            <div className="fade-up-4" style={{ width: "100%", maxWidth: 620, marginBottom: 16 }}>
              <SearchBar />
            </div>

            {/* Chain tagline */}
            <div
              className="fade-up-5"
              style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 4 }}
            >
              {["Base Sepolia", "x402 Protocol", "GPT-4.1 TEE"].map((tag, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: MONO,
                    fontSize: "0.58rem",
                    color: "#2a2a2a",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {i > 0 && <span style={{ marginRight: 16, color: "#1a1a1a" }}>·</span>}
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── TICKER ───────────────────────────────── */}
        <Ticker />

        {/* ── STATS BAR ────────────────────────────── */}
        <div
          className="fade-up-5"
          style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 28px 0" }}
        >
          <StatsBar />
        </div>

        {/* ── HOW IT WORKS ─────────────────────────── */}
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "80px 28px 0",
          }}
        >
          {/* Section header */}
          <div style={{ marginBottom: 40 }}>
            <div
              style={{
                fontFamily: MONO,
                fontSize: "0.58rem",
                color: "#333",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              // How it works
            </div>
            <h2
              style={{
                fontFamily: PREMIUM_MONO,
                fontWeight: 600,
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                color: "#fff",
                letterSpacing: "-0.035em",
                textAlign: "center",
              }}
            >
              From address to proof in minutes.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 1,
              background: "#0f0f0f",
              border: "1px solid #111",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="card-lift"
                style={{
                  padding: "28px 24px 32px",
                  background: "#070707",
                  borderRight: i < STEPS.length - 1 ? "1px solid #111" : "none",
                  position: "relative",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#0c0c0c";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#070707";
                }}
              >
                {/* Step number */}
                <div
                  style={{
                    fontFamily: ORBITRON,
                    fontSize: "0.58rem",
                    fontWeight: 700,
                    color: "#24B3BD",
                    letterSpacing: "0.12em",
                    marginBottom: 20,
                  }}
                >
                  {step.num}
                </div>

                {/* Icon */}
                <div style={{ color: "#333", marginBottom: 16, transition: "color 0.2s" }}>
                  {step.icon}
                </div>

                {/* Title */}
                <div
                  style={{
                    fontFamily: SYNE,
                    fontWeight: 700,
                    fontSize: "0.92rem",
                    color: "#ddd",
                    marginBottom: 10,
                    letterSpacing: "0.01em",
                  }}
                >
                  {step.title}
                </div>

                {/* Desc */}
                <div
                  style={{
                    fontFamily: JAKARTA,
                    fontSize: "0.78rem",
                    color: "#444",
                    lineHeight: 1.65,
                    fontWeight: 400,
                  }}
                >
                  {step.desc}
                </div>

                {/* Connector arrow */}
                {i < STEPS.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: -8,
                      transform: "translateY(-50%)",
                      zIndex: 2,
                      fontFamily: MONO,
                      fontSize: "0.6rem",
                      color: "#222",
                    }}
                  >
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── AGENT BREAKDOWN ──────────────────────── */}
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "80px 28px 0",
          }}
        >
          <div style={{ marginBottom: 40 }}>
            <div
              style={{
                fontFamily: MONO,
                fontSize: "0.58rem",
                color: "#333",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              // Agent architecture
            </div>
            <h2
              style={{
                fontFamily: PREMIUM_MONO,
                fontWeight: 600,
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                color: "#fff",
                letterSpacing: "-0.035em",
              }}
            >
              5 specialists. 1 verdict.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 8,
            }}
          >
            {AGENTS.map((agent, i) => (
              <div
                key={i}
                className="card-lift"
                style={{
                  background: "#070707",
                  border: "1px solid #111",
                  borderTop: `2px solid ${agent.color}22`,
                  borderRadius: 2,
                  padding: "20px 16px 22px",
                  cursor: "default",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderTopColor = agent.color + "66";
                  e.currentTarget.style.background = "#0c0c0c";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderTopColor = agent.color + "22";
                  e.currentTarget.style.background = "#070707";
                }}
              >
                {/* Agent ID */}
                <div
                  style={{
                    fontFamily: ORBITRON,
                    fontSize: "0.55rem",
                    fontWeight: 700,
                    color: agent.color,
                    letterSpacing: "0.12em",
                    marginBottom: 12,
                    opacity: 0.8,
                  }}
                >
                  AGENT_{agent.id}
                </div>

                {/* Name */}
                <div
                  style={{
                    fontFamily: SYNE,
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    color: "#ccc",
                    marginBottom: 16,
                    lineHeight: 1.3,
                  }}
                >
                  {agent.name}
                </div>

                {/* Tags */}
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {agent.tags.map((tag, j) => (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                      }}
                    >
                      <div
                        style={{
                          width: 3,
                          height: 3,
                          borderRadius: "50%",
                          background: agent.color,
                          opacity: 0.5,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: JAKARTA,
                          fontSize: "0.7rem",
                          color: "#444",
                          fontWeight: 400,
                        }}
                      >
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── REPORT PREVIEW ───────────────────────── */}
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "80px 28px 0",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 48,
              alignItems: "center",
            }}
          >
            {/* Left: copy */}
            <div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: "0.58rem",
                  color: "#333",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                // Sample output
              </div>
              <h2
                style={{
                  fontFamily: PREMIUM_MONO,
                  fontWeight: 600,
                  fontSize: "clamp(1.6rem, 3vw, 2.1rem)",
                  color: "#fff",
                  letterSpacing: "-0.035em",
                  marginBottom: 20,
                  lineHeight: 1.2,
                }}
              >
                Every report is independently verifiable.
              </h2>
              <p
                style={{
                  fontFamily: JAKARTA,
                  fontSize: "0.9rem",
                  color: "#555",
                  lineHeight: 1.75,
                  marginBottom: 28,
                }}
              >
                Each agent's inference is cryptographically settled on Base Sepolia using the x402
                protocol. The payment hash is your proof — scan it on Basescan, verify the input,
                verify the output. No black box.
              </p>

              {/* Proof points */}
              {[
                "5 independent payment hashes per report",
                "Full prompt + response settled on-chain",
                "SETTLE_METADATA mode — nothing hidden",
                "Shareable permalink for every scan",
              ].map((pt, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#24B3BD",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: JAKARTA,
                      fontSize: "0.82rem",
                      color: "#777",
                      fontWeight: 400,
                    }}
                  >
                    {pt}
                  </span>
                </div>
              ))}
            </div>

            {/* Right: mock report */}
            <ReportPreview />
          </div>
        </div>

        {/* ── CTA BANNER ───────────────────────────── */}
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "80px 28px 0",
          }}
        >
          <div
            style={{
              background: "#060606",
              border: "1px solid #1a1a1a",
              borderRadius: 2,
              padding: "52px 48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 40,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* BG glow */}
            <div
              style={{
                position: "absolute",
                left: -100,
                top: "50%",
                transform: "translateY(-50%)",
                width: 400,
                height: 300,
                background: "radial-gradient(ellipse, rgba(36,179,189,0.04) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative" }}>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: "0.58rem",
                  color: "#333",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                // Start scouting
              </div>
              <h2
                style={{
                  fontFamily: PREMIUM_MONO,
                  fontWeight: 600,
                  fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                  color: "#fff",
                  letterSpacing: "-0.035em",
                  marginBottom: 8,
                }}
              >
                Don't trust. Verify.
              </h2>
              <p
                style={{
                  fontFamily: JAKARTA,
                  fontSize: "0.88rem",
                  color: "#555",
                }}
              >
                Paste any contract address or project name above to run a free scout.
              </p>
            </div>

            <div style={{ flexShrink: 0, minWidth: 320, position: "relative" }}>
              <SearchBar />
            </div>
          </div>
        </div>

        {/* ── FOOTER ───────────────────────────────── */}
        <footer
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "48px 28px 40px",
            borderTop: "1px solid #0d0d0d",
            marginTop: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="2.5" stroke="#24B3BD" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="7.5" stroke="#24B3BD" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
              <line x1="12" y1="1" x2="12" y2="4.5" stroke="#24B3BD" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="23" y1="12" x2="19.5" y2="12" stroke="#24B3BD" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="12" y1="23" x2="12" y2="19.5" stroke="#24B3BD" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="1" y1="12" x2="4.5" y2="12" stroke="#24B3BD" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span
              style={{
                fontFamily: ORBITRON,
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "#333",
                letterSpacing: "0.1em",
              }}
            >
              OG SCOUT
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {["OpenGradient", "Base Sepolia", "x402 Protocol", "FastAPI", "React"].map((t, i) => (
              <span
                key={i}
                style={{
                  fontFamily: MONO,
                  fontSize: "0.56rem",
                  color: "#2a2a2a",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <span
            style={{
              fontFamily: MONO,
              fontSize: "0.55rem",
              color: "#1e1e1e",
              letterSpacing: "0.06em",
            }}
          >
            Built for OpenGradient Builder Program
          </span>
        </footer>

      </div>
    </div>
  );
}
