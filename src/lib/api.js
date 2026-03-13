const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function startScout(target) {
  const res = await fetch(`${API_BASE}/api/scout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ target }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to start scout");
  }
  return res.json(); // { job_id: string }
}

export async function getJob(jobId) {
  const res = await fetch(`${API_BASE}/api/job/${jobId}`);
  if (!res.ok) throw new Error("Job not found");
  return res.json();
}
