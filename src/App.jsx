import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Landing from "./pages/Landing";
import Report from "./pages/Report";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/report/:jobId" element={<Report />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
