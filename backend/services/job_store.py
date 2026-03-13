import asyncio
from typing import Dict, Optional
from datetime import datetime, timezone
import uuid
from models.schemas import JobStatus

jobs: Dict[str, dict] = {}
_lock = asyncio.Lock()


def create_job(target: str) -> str:
    job_id = str(uuid.uuid4())
    jobs[job_id] = {
        "job_id": job_id,
        "target": target,
        "status": JobStatus.PENDING,
        "agents": [],
        "trust_score": None,
        "report_summary": None,
        "master_attestation": None,
        "error": None,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "completed_at": None,
    }
    return job_id


def get_job(job_id: str) -> Optional[dict]:
    return jobs.get(job_id)


async def update_job(job_id: str, **kwargs):
    async with _lock:
        if job_id in jobs:
            jobs[job_id].update(kwargs)


async def update_agent(job_id: str, agent_result: dict):
    async with _lock:
        if job_id in jobs:
            agents = jobs[job_id]["agents"]
            for i, a in enumerate(agents):
                if a["agent_id"] == agent_result["agent_id"]:
                    agents[i] = agent_result
                    return
            agents.append(agent_result)
