import { useQuery } from "@tanstack/react-query";
import { getJob } from "../lib/api";

const TERMINAL_STATUSES = ["complete", "failed"];

export function useJobPoller(jobId) {
  return useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJob(jobId),
    enabled: !!jobId,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data || TERMINAL_STATUSES.includes(data?.status)) return false;
      return 2000;
    },
    staleTime: 0,
  });
}
