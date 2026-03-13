import opengradient as og
from services.og_client import get_og_client
import json

AGENT_NAME = "Synthesis & Trust Score Engine"

SYSTEM_PROMPT = """You are a senior Web3 investment risk analyst. You receive the findings
from 4 specialized AI agents that have analyzed a Web3 project from different angles.
Your job is to synthesize all findings into a final comprehensive trust report with a
composite Trust Score. Be authoritative, precise, and conclusive. Your synthesis is
cryptographically attested on the OpenGradient network."""


def run(target: str, agent_results: list) -> dict:
    """
    agent_results: list of 4 AgentResult dicts
    Returns: {
        trust_score: int,
        report_summary: str,
        payment_hash: str,
        transaction_hash: str
    }
    """
    client = get_og_client()

    # Build context from all 4 agents
    context_parts = []
    for agent in agent_results:
        context_parts.append(
            f"""
=== {agent['agent_name']} ===
Risk Score: {agent['risk_score']}/100
Flags: {', '.join(agent.get('flags', []))}
Findings: {agent['findings']}
Attestation: {agent['payment_hash']}
"""
        )

    full_context = "\n".join(context_parts)

    user_prompt = f"""Synthesize the following 4 agent analyses for: {target}

{full_context}

Based on all agent findings, provide:

TRUST_SCORE: [0-100, where 100 = completely trustworthy, 0 = certain scam/rug]
VERDICT: [one of: SAFE | CAUTION | RISKY | DANGER]
SUMMARY: [3-4 paragraph executive summary of the overall risk profile]
KEY_STRENGTHS:
- [up to 3 positive points if any]
KEY_RISKS:
- [top 3-5 risk factors]
RECOMMENDATION: [1-2 sentence actionable recommendation for investors/users]

Format EXACTLY as shown above."""

    result = client.llm.chat(
        model=og.TEE_LLM.GPT_4_1_2025_04_14,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ],
        max_tokens=1000,
        temperature=0.0,
        x402_settlement_mode=og.x402SettlementMode.SETTLE_METADATA,
    )

    content = result.chat_output["content"]
    trust_score, verdict, summary, strengths, risks, recommendation = parse_synthesis(
        content
    )

    report_summary = json.dumps(
        {
            "verdict": verdict,
            "summary": summary,
            "key_strengths": strengths,
            "key_risks": risks,
            "recommendation": recommendation,
        }
    )

    return {
        "trust_score": trust_score,
        "report_summary": report_summary,
        "payment_hash": result.payment_hash,
        "transaction_hash": getattr(result, "transaction_hash", None),
    }


def parse_synthesis(content: str) -> tuple:
    lines = content.strip().split("\n")
    trust_score = 50
    verdict = "CAUTION"
    summary_lines = []
    strengths = []
    risks = []
    recommendation = ""
    section = None

    for line in lines:
        line = line.strip()
        if line.startswith("TRUST_SCORE:"):
            try:
                trust_score = int(line.split(":")[1].strip())
                trust_score = max(0, min(100, trust_score))
            except Exception:
                pass
        elif line.startswith("VERDICT:"):
            verdict = line.split(":", 1)[1].strip()
        elif line == "SUMMARY:":
            section = "summary"
        elif line == "KEY_STRENGTHS:":
            section = "strengths"
        elif line == "KEY_RISKS:":
            section = "risks"
        elif line.startswith("RECOMMENDATION:"):
            section = None
            recommendation = line.replace("RECOMMENDATION:", "").strip()
        elif section == "summary" and line:
            summary_lines.append(line)
        elif section == "strengths" and line.startswith("-"):
            strengths.append(line[1:].strip())
        elif section == "risks" and line.startswith("-"):
            risks.append(line[1:].strip())

    summary = " ".join(summary_lines)
    return trust_score, verdict, summary, strengths, risks, recommendation
