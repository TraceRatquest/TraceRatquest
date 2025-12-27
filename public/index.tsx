import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { createRoot } from "react-dom/client"
import { Home } from "./Home";
import { NavContext } from "./contexts/navContext";
import { NavContextT } from "./types/types";

function App() {

    const queryClient = new QueryClient()

    const url = useRef<NavContextT>("home")

    return (
        <main>
            <QueryClientProvider client={queryClient}>
                <NavContext value={url.current} >
                    <Home />
                </NavContext>
            </QueryClientProvider>
        </main>
    )
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);