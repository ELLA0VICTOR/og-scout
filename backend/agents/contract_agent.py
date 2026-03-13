import opengradient as og
from services.og_client import get_og_client

AGENT_NAME = "Smart Contract Risk Analyzer"

SYSTEM_PROMPT = """You are a blockchain security expert specializing in smart contract auditing.
Analyze the given contract address/project for security vulnerabilities, rug pull mechanisms,
ownership concentration, suspicious functions (mint, pause, blacklist), and proxy upgrade risks.
Be specific, technical, and thorough. Your analysis will be cryptographically attested on-chain."""


def run(target: str) -> dict:
    """
    Returns: {
        findings: str,
        risk_score: int (0-100, 100=highest risk),
        flags: list[str],
        payment_hash: str,
        transaction_hash: str
    }
    """
    client = get_og_client()

    user_prompt = f"""Analyze this Web3 project/contract for smart contract security risks:

Target: {target}

Provide:
1. RISK SCORE: A number from 0-100 (100 = maximum risk, 0 = no risk)
2. KEY FLAGS: Up to 5 specific red flags or green flags found (format as bullet list)
3. FINDINGS: 2-3 paragraph detailed analysis covering:
   - Contract ownership and admin privileges
   - Suspicious or dangerous functions
   - Audit history if known
   - Upgrade/proxy patterns
   - Overall contract risk assessment

Format your response EXACTLY as:
RISK_SCORE: [number]
FLAGS:
- [flag 1]
- [flag 2]
FINDINGS:
[your detailed analysis paragraphs]"""

    result = client.llm.chat(
        model=og.TEE_LLM.GPT_4_1_2025_04_14,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ],
        max_tokens=800,
        temperature=0.0,
        x402_settlement_mode=og.x402SettlementMode.SETTLE_METADATA,
    )

    content = result.chat_output["content"]
    risk_score, flags, findings = parse_agent_response(content)

    return {
        "findings": findings,
        "risk_score": risk_score,
        "flags": flags,
        "payment_hash": result.payment_hash,
        "transaction_hash": getattr(result, "transaction_hash", None),
    }


def parse_agent_response(content: str) -> tuple:
    """Parse structured LLM response into risk_score, flags, findings"""
    lines = content.strip().split("\n")
    risk_score = 50
    flags = []
    findings = ""

    section = None
    findings_lines = []

    for line in lines:
        line = line.strip()
        if line.startswith("RISK_SCORE:"):
            try:
                risk_score = int(line.split(":")[1].strip())
                risk_score = max(0, min(100, risk_score))
            except Exception:
                pass
        elif line == "FLAGS:":
            section = "flags"
        elif line == "FINDINGS:":
            section = "findings"
        elif section == "flags" and line.startswith("-"):
            flags.append(line[1:].strip())
        elif section == "findings" and line:
            findings_lines.append(line)

    findings = " ".join(findings_lines) if findings_lines else content
    return risk_score, flags, findings
