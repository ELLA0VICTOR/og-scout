export default function MonoAddress({ address, truncate = true }) {
  if (!address) return null;

  const display =
    truncate && address.length > 20
      ? `${address.slice(0, 10)}...${address.slice(-8)}`
      : address;

  return (
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.75rem",
        color: "#24B3BD",
        letterSpacing: "0.02em",
      }}
    >
      {display}
    </span>
  );
}
