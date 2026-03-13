import { useState } from "react";
import { useScout } from "../../hooks/useScout";
import Spinner from "../ui/Spinner";

const MONO = "'Space Mono', monospace";
const ORBITRON = "'Orbitron', monospace";

export default function SearchBar() {
  const [target, setTarget] = useState("");
  const { scout, loading, error } = useScout();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (target.trim().length >= 3) scout(target.trim());
  };

  const isReady = target.trim().length >= 3 && !loading;

  return (
    <div style={{ width: "100%" }}>
      <form onSubmit={handleSubmit}>
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          {/* Prompt symbol */}
          <div
            style={{
              position: "absolute",
              left: 15,
              fontFamily: MONO,
              fontSize: "0.72rem",
              color: "#24B3BD",
              pointerEvents: "none",
              zIndex: 2,
              opacity: 0.5,
            }}
          >
            {">_"}
          </div>

          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="0x... or project name"
            disabled={loading}
            autoComplete="off"
            spellCheck={false}
            style={{
              width: "100%",
              background: "#070707",
              border: "1px solid #1e1e1e",
              borderRadius: 2,
              padding: "15px 155px 15px 44px",
              fontFamily: MONO,
              fontSize: "0.8rem",
              color: "#ddd",
              outline: "none",
              transition: "border-color 0.2s, box-shadow 0.2s",
              letterSpacing: "0.03em",
              caretColor: "#24B3BD",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#24B3BD";
              e.target.style.boxShadow = "0 0 0 1px rgba(36,179,189,0.12), 0 0 32px rgba(36,179,189,0.06)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#1e1e1e";
              e.target.style.boxShadow = "none";
            }}
          />

          <button
            type="submit"
            disabled={!isReady}
            style={{
              position: "absolute",
              right: 7,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 7,
              background: isReady ? "#24B3BD" : "transparent",
              border: "1px solid",
              borderColor: isReady ? "#24B3BD" : "#1a1a1a",
              borderRadius: 2,
              padding: "8px 16px",
              cursor: isReady ? "pointer" : "not-allowed",
              transition: "all 0.18s",
              fontFamily: ORBITRON,
              fontWeight: 700,
              fontSize: "0.6rem",
              color: isReady ? "#000" : "#333",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              if (isReady) e.currentTarget.style.background = "#1da3ac";
            }}
            onMouseLeave={(e) => {
              if (isReady) e.currentTarget.style.background = "#24B3BD";
            }}
          >
            {loading ? (
              <>
                <Spinner size={11} color="#24B3BD" />
                <span style={{ color: "#24B3BD" }}>Running...</span>
              </>
            ) : (
              "Scout →"
            )}
          </button>
        </div>
      </form>

      {error && (
        <p
          style={{
            marginTop: 8,
            fontFamily: MONO,
            fontSize: "0.68rem",
            color: "#ef4444",
            letterSpacing: "0.02em",
          }}
        >
          ✗ {error}
        </p>
      )}
    </div>
  );
}
