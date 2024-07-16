import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Loading from "@components/loading/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>
);
