import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { startScout } from "../lib/api";

export function useScout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const scout = async (target) => {
    setLoading(true);
    setError(null);
    try {
      const { job_id } = await startScout(target);
      navigate(`/report/${job_id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { scout, loading, error };
}
