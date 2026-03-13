from fastapi import APIRouter, HTTPException, BackgroundTasks
from models.schemas import ScoutRequest, ScoutResponse, JobResponse, JobStatus
from services import job_store
from agents import contract_agent, tokenomics_agent, onchain_agent, narrative_agent, synthesis_agent
from datetime import datetime, timezone
import asyncio

router = APIRouter(prefix="/api")

AGENT_CONFIGS = [
    (1, "Smart Contract Risk Analyzer", contract_agent),
    (2, "Tokenomics Integrity Agent", tokenomics_agent),
    (3, "On-Chain Behavior Agent", onchain_agent),
    (4, "Narrative & Team Credibility", narrative_agent),
]

STATUS_RUNNING = {
    1: JobStatus.AGENT_1_RUNNING,
    2: JobStatus.AGENT_2_RUNNING,
    3: JobStatus.AGENT_3_RUNNING,
    4: JobStatus.AGENT_4_RUNNING,
}
STATUS_COMPLETE = {
    1: JobStatus.AGENT_1_COMPLETE,
    2: JobStatus.AGENT_2_COMPLETE,
    3: JobStatus.AGENT_3_COMPLETE,
    4: JobStatus.AGENT_4_COMPLETE,
}


async def run_pipeline(job_id: str, target: str):
    """Background task: runs all 5 agents sequentially, updates job store after each."""
    agent_results = []

    try:
        # Run agents 1-4 sequentially
        for agent_id, agent_name, agent_module in AGENT_CONFIGS:
            await job_store.update_job(job_id, status=STATUS_RUNNING[agent_id])
            await job_store.update_agent(
                job_id,
                {
                    "agent_id": agent_id,
                    "agent_name": agent_name,
                    "status": "running",
                    "findings": None,
                    "risk_score": None,
                    "flags": [],
                    "payment_hash": None,
                    "transaction_hash": None,
                },
            )

            # Run inference in thread pool (SDK is sync)
            loop = asyncio.get_event_loop()
            result = await loop.run_in_executor(None, agent_module.run, target)

            agent_data = {
                "agent_id": agent_id,
                "agent_name": agent_name,
                "status": "complete",
                "findings": result["findings"],
                "risk_score": result["risk_score"],
                "flags": result["flags"],
                "payment_hash": result["payment_hash"],
                "transaction_hash": result.get("transaction_hash"),
            }
            agent_results.append(agent_data)

            await job_store.update_agent(job_id, agent_data)
            await job_store.update_job(job_id, status=STATUS_COMPLETE[agent_id])

        # Run synthesis agent
        await job_store.update_job(job_id, status=JobStatus.SYNTHESIS_RUNNING)
        await job_store.update_agent(
            job_id,
            {
                "agent_id": 5,
                "agent_name": "Synthesis & Trust Score Engine",
                "status": "running",
                "findings": None,
                "risk_score": None,
                "flags": [],
                "payment_hash": None,
                "transaction_hash": None,
            },
        )

        loop = asyncio.get_event_loop()
        synth_result = await loop.run_in_executor(
            None, synthesis_agent.run, target, agent_results
        )

        synth_data = {
            "agent_id": 5,
            "agent_name": "Synthesis & Trust Score Engine",
            "status": "complete",
            "findings": synth_result["report_summary"],
            "risk_score": synth_result["trust_score"],
            "flags": [],
            "payment_hash": synth_result["payment_hash"],
            "transaction_hash": synth_result.get("transaction_hash"),
        }
        await job_store.update_agent(job_id, synth_data)

        await job_store.update_job(
            job_id,
            status=JobStatus.COMPLETE,
            trust_score=synth_result["trust_score"],
            report_summary=synth_result["report_summary"],
            master_attestation=synth_result["payment_hash"],
            completed_at=datetime.now(timezone.utc).isoformat(),
        )

    except Exception as e:
        await job_store.update_job(
            job_id,
            status=JobStatus.FAILED,
            error=str(e),
            completed_at=datetime.now(timezone.utc).isoformat(),
        )


@router.post("/scout", response_model=ScoutResponse)
async def start_scout(request: ScoutRequest, background_tasks: BackgroundTasks):
    if not request.target or len(request.target.strip()) < 3:
        raise HTTPException(
            status_code=400, detail="Target must be at least 3 characters"
        )

    job_id = job_store.create_job(request.target.strip())
    background_tasks.add_task(run_pipeline, job_id, request.target.strip())

    return ScoutResponse(job_id=job_id)


@router.get("/job/{job_id}", response_model=JobResponse)
async def get_job(job_id: str):
    job = job_store.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return JobResponse(**job)


@router.get("/health")
async def health():
    return {"status": "ok", "service": "og-scout-backend"}
