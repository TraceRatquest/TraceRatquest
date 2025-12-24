import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { createRoot } from "react-dom/client"
import { Home } from "./Home";

function App() {
    const [count, setCount] = useState<number>(0);

    const queryClient = new QueryClient()

    return (
        <main>
            <h2>{count}</h2>
            <button onClick={() => setCount((c) => c + 1)}>Increase</button>
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>
        </main>
    )
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);