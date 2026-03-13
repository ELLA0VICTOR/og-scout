import { Link } from "react-router-dom";

const MONO = "'Space Mono', monospace";
const BRAND = "'Orbitron', monospace";

export default function Header({ showBack = false, onShare }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #111",
      }}
    >
      <div className="app-header-inner">
        <div className="app-header-left">
          {showBack && (
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: MONO,
                fontSize: "0.62rem",
                color: "#444",
                textDecoration: "none",
                letterSpacing: "0.08em",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#24B3BD")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
            >
              {"<- BACK"}
            </Link>
          )}

          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="2.5" stroke="#24B3BD" strokeWidth="1.8" fill="rgba(36,179,189,0.15)" />
              <circle cx="12" cy="12" r="7.5" stroke="#24B3BD" strokeWidth="1.1" strokeDasharray="2.5 2" opacity="0.6" />
              <line x1="12" y1="1" x2="12" y2="4.5" stroke="#24B3BD" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="23" y1="12" x2="19.5" y2="12" stroke="#24B3BD" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="12" y1="23" x2="12" y2="19.5" stroke="#24B3BD" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="1" y1="12" x2="4.5" y2="12" stroke="#24B3BD" strokeWidth="1.8" strokeLinecap="round" />
            </svg>

            <span
              style={{
                fontFamily: BRAND,
                fontWeight: 700,
                fontSize: "0.82rem",
                color: "#fff",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              OG Scout
            </span>
          </Link>
        </div>

        <div className="app-header-right">
          {onShare && (
            <button
              onClick={onShare}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "transparent",
                border: "1px solid #222",
                borderRadius: 2,
                padding: "6px 13px",
                cursor: "pointer",
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: "0.62rem",
                color: "#555",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#24B3BD";
                e.currentTarget.style.color = "#24B3BD";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#222";
                e.currentTarget.style.color = "#555";
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <polyline points="16 6 12 2 8 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="12" y1="2" x2="12" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Share
            </button>
          )}

          <div className="app-header-divider" />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "5px 11px",
              border: "1px solid rgba(36,179,189,0.18)",
              borderRadius: 2,
              background: "rgba(36,179,189,0.04)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#24B3BD",
                boxShadow: "0 0 6px #24B3BD",
                animation: "pulse-brand 2.5s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: MONO,
                fontSize: "0.6rem",
                color: "#24B3BD",
                letterSpacing: "0.08em",
                fontWeight: 700,
              }}
            >
              OpenGradient
            </span>
            <span
              style={{
                fontFamily: MONO,
                fontSize: "0.55rem",
                color: "rgba(36,179,189,0.4)",
                letterSpacing: "0.05em",
              }}
            >
              TEE
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}


