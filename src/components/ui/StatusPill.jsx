import Spinner from "./Spinner";

const STATUS_STYLES = {
  queued: { color: "#555555", label: "QUEUED" },
  running: { color: "#24B3BD", label: "ANALYZING", animated: true },
  complete: { color: "#22c55e", label: "COMPLETE" },
  error: { color: "#ef4444", label: "FAILED" },
  pending: { color: "#555555", label: "PENDING" },
};

export default function StatusPill({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.queued;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.65rem",
        color: style.color,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        animation: style.animated ? "pulse-brand 2s cubic-bezier(0.4,0,0.6,1) infinite" : "none",
      }}
    >
      {style.animated && <Spinner size={10} color={style.color} />}
      {!style.animated && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: style.color,
            display: "inline-block",
          }}
        />
      )}
      {style.label}
    </span>
  );
}
