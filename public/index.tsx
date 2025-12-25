import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { createRoot } from "react-dom/client"
import { Home } from "./Home";

function App() {

    const queryClient = new QueryClient()

    return (
        <main>
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>
        </main>
    )
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);