from pydantic import BaseModel
from typing import Optional, List
from enum import Enum


class JobStatus(str, Enum):
    PENDING = "pending"
    AGENT_1_RUNNING = "agent_1_running"
    AGENT_1_COMPLETE = "agent_1_complete"
    AGENT_2_RUNNING = "agent_2_running"
    AGENT_2_COMPLETE = "agent_2_complete"
    AGENT_3_RUNNING = "agent_3_running"
    AGENT_3_COMPLETE = "agent_3_complete"
    AGENT_4_RUNNING = "agent_4_running"
    AGENT_4_COMPLETE = "agent_4_complete"
    SYNTHESIS_RUNNING = "synthesis_running"
    COMPLETE = "complete"
    FAILED = "failed"


class AgentResult(BaseModel):
    agent_id: int
    agent_name: str
    status: str  # "running" | "complete" | "error"
    findings: Optional[str] = None
    risk_score: Optional[int] = None
    flags: Optional[List[str]] = None
    payment_hash: Optional[str] = None
    transaction_hash: Optional[str] = None


class ScoutRequest(BaseModel):
    target: str
    chain: Optional[str] = "base-sepolia"


class ScoutResponse(BaseModel):
    job_id: str


class JobResponse(BaseModel):
    job_id: str
    target: str
    status: JobStatus
    agents: List[AgentResult]
    trust_score: Optional[int] = None
    report_summary: Optional[str] = None
    master_attestation: Optional[str] = None
    error: Optional[str] = None
    created_at: str
    completed_at: Optional[str] = None
