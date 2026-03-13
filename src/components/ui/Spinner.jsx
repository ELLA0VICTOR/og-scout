export default function Spinner({ size = 16, color = "#24B3BD" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}
    >
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke={color}
        strokeOpacity="0.2"
        strokeWidth="2"
      />
      <path
        d="M12 3a9 9 0 0 1 9 9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
