function ExternalLinkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ display: "inline", marginLeft: 3 }}>
      <path
        d="M5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 1h3v3M11 1 6 6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AttestationBadge({ hash, label }) {
  if (!hash) return null;

  const truncated =
    hash.length > 20 ? `${hash.slice(0, 10)}...${hash.slice(-8)}` : hash;

  const explorerUrl = `https://sepolia.basescan.org/tx/${hash}`;

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      {label && (
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            color: "#555",
            letterSpacing: "0.05em",
          }}
        >
          {label}:
        </span>
      )}
      <a
        href={explorerUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.7rem",
          color: "#24B3BD",
          textDecoration: "none",
          letterSpacing: "0.02em",
          display: "inline-flex",
          alignItems: "center",
          transition: "opacity 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        {truncated}
        <ExternalLinkIcon />
      </a>
    </span>
  );
}
