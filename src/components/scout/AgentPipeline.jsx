import AgentStep from "./AgentStep";

const AGENT_COUNT = 5;

export default function AgentPipeline({ agents = [] }) {
  // Build indexed map for quick lookup
  const agentMap = {};
  for (const a of agents) {
    agentMap[a.agent_id] = a;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {Array.from({ length: AGENT_COUNT }, (_, i) => {
        const agentId = i + 1;
        const agent = agentMap[agentId] || null;
        return (
          <AgentStep key={agentId} agent={agent} index={i} />
        );
      })}
    </div>
  );
}
