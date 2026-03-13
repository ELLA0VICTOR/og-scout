# OG Scout

OG Scout is a verifiable multi-agent Web3 due diligence app built on OpenGradient. A user submits a token contract address or project name, and five AI agents generate a trust report with per-step attestations, a final trust score, and OpenGradient-backed settlement metadata.

## What It Does

- Accepts a contract address or project name as input
- Runs 4 specialist agents plus 1 synthesis agent sequentially
- Produces a final trust score from 0-100
- Returns agent findings, flags, risk scores, and attestation hashes
- Uses OpenGradient TEE inference with x402 payments on Base Sepolia

## Architecture

```text
User input -> POST /api/scout -> background pipeline

Agent 1: Smart Contract Risk Analyzer
Agent 2: Tokenomics Integrity Agent
Agent 3: On-Chain Behavior Agent
Agent 4: Narrative & Team Credibility
Agent 5: Synthesis & Trust Score Engine

-> GET /api/job/{job_id} for live polling and final report
```

Each agent makes its own OpenGradient LLM call and stores:

- findings
- risk score
- flags
- payment hash
- transaction hash when available

## Stack

- Frontend: React 19 + Vite + Tailwind CSS
- Routing: React Router
- Wallet/UI libs: RainbowKit, wagmi, viem
- Data polling: TanStack Query
- Backend: FastAPI + uvicorn
- AI inference: OpenGradient Python SDK
- Model: `openai/gpt-4.1-2025-04-14` via OpenGradient TEE
- Payment: x402 with `$OPG` on Base Sepolia
- Settlement mode: `SETTLE_METADATA`

## Prerequisites

- Node.js 18+
- Python 3.12 recommended
- A Base Sepolia wallet funded with:
  - Base Sepolia ETH for approval gas
  - OPG testnet tokens for inference payments
- OpenGradient faucet: `https://faucet.opengradient.ai/`

Python 3.14 caused dependency/build issues during setup, so Python 3.12 is the safe choice for this repo.

## Local Development

### 1. Install frontend dependencies

From the project root:

```bash
npm install
```

### 2. Set up the backend

On Windows:

```bash
cd backend
py -3.12 -m venv venv
venv\Scripts\activate
python -m pip install --upgrade pip
pip install -r requirements
```

On macOS/Linux:

```bash
cd backend
python3.12 -m venv venv
source venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements
```

### 3. Configure environment variables

Create `backend/.env`:

```env
OG_PRIVATE_KEY=your_base_sepolia_private_key
FRONTEND_URL=http://localhost:5173
```

If the documented OpenGradient hostname is not resolving in your environment, you may also need the working endpoint override used in local testing:

```env
OG_LLM_SERVER_URL=https://3.15.214.21:443
OG_LLM_STREAMING_SERVER_URL=https://3.15.214.21:443
```

### 4. Run the backend

```bash
cd backend
venv\Scripts\activate   # Windows
python main.py
```

Backend runs on `http://localhost:8000`.

### 5. Run the frontend

From the project root:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Environment Variables

### Backend: `backend/.env`

- `OG_PRIVATE_KEY`: required; Base Sepolia wallet private key
- `FRONTEND_URL`: allowed frontend origin for CORS
- `OG_LLM_SERVER_URL`: optional OpenGradient LLM endpoint override
- `OG_LLM_STREAMING_SERVER_URL`: optional streaming endpoint override

### Frontend

This app currently defaults to `http://localhost:8000` for the backend. If you wire in environment-based API config later, document it here before deployment.

## API

### `POST /api/scout`

Start a new scout job.

Request:

```json
{
  "target": "Uniswap",
  "chain": "base-sepolia"
}
```

Response:

```json
{
  "job_id": "uuid"
}
```

### `GET /api/job/{job_id}`

Get the current job state and results.

Response shape:

```json
{
  "job_id": "...",
  "target": "...",
  "status": "agent_2_running",
  "agents": [
    {
      "agent_id": 1,
      "agent_name": "Smart Contract Risk Analyzer",
      "status": "complete",
      "findings": "...",
      "risk_score": 42,
      "flags": ["No audit found"],
      "payment_hash": "0x...",
      "transaction_hash": "0x..."
    }
  ],
  "trust_score": null,
  "report_summary": null,
  "master_attestation": null,
  "error": null,
  "created_at": "...",
  "completed_at": null
}
```

### `GET /api/health`

Health check:

```json
{
  "status": "ok",
  "service": "og-scout-backend"
}
```

## Job Status Lifecycle

```text
pending
-> agent_1_running -> agent_1_complete
-> agent_2_running -> agent_2_complete
-> agent_3_running -> agent_3_complete
-> agent_4_running -> agent_4_complete
-> synthesis_running
-> complete | failed
```

## Verification Notes

Each agent call uses OpenGradient TEE inference and `SETTLE_METADATA`, so the pipeline returns attestation/payment metadata for every step.

Important practical note:
- `payment_hash` may not always appear immediately
- `transaction_hash` may also be absent depending on settlement timing
- if present, hashes can be inspected on Base Sepolia explorers

## Deployment

### Backend on Render

Use these settings:

- Root Directory: `backend`
- Build Command: `pip install -r requirements`
- Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

Render environment variables:

```env
OG_PRIVATE_KEY=your_private_key
FRONTEND_URL=https://your-vercel-domain.vercel.app
OG_LLM_SERVER_URL=https://3.15.214.21:443
OG_LLM_STREAMING_SERVER_URL=https://3.15.214.21:443
```

If OpenGradient restores or confirms a stable hostname, replace the raw IP override with the official endpoint.

### Frontend on Vercel

- Framework: Vite
- Root Directory: project root
- Build Command: `npm run build`
- Output Directory: `dist`

If you add a frontend env variable for the backend URL, set it in Vercel and point it to your Render service URL.

## Project Structure

```text
og-scout/
|-- backend/
|   |-- agents/
|   |   |-- contract_agent.py
|   |   |-- tokenomics_agent.py
|   |   |-- onchain_agent.py
|   |   |-- narrative_agent.py
|   |   |-- synthesis_agent.py
|   |-- models/
|   |   |-- schemas.py
|   |-- routers/
|   |   |-- scout.py
|   |-- services/
|   |   |-- job_store.py
|   |   |-- og_client.py
|   |-- main.py
|   |-- requirements
|   |-- Procfile
|   |-- .env
|-- public/
|-- src/
|   |-- components/
|   |-- pages/
|   |   |-- Landing.jsx
|   |   |-- Report.jsx
|   |-- main.jsx
|   |-- index.css
|-- package.json
|-- README.md
```

## Notes

- This repo uses a root-level frontend, not a separate `frontend/` folder.
- The backend dependency file is `backend/requirements`, not `requirements.txt`.
- `backend/.env` and root `.env` should stay gitignored.

Built as a more advanced OpenGradient demo focused on verifiable, multi-step Web3 due diligence.
