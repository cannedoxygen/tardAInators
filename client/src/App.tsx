import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { BrowserRouter, Route, Routes } from "react-router";
import Chat from "./routes/chat";
import Overview from "./routes/overview";
import Home from "./routes/home";

const queryClient = new QueryClient();

function App() {
    return (
        <div
            className="dark"
            style={{
                colorScheme: "dark",
            }}
        >
            <BrowserRouter>
                <TooltipProvider delayDuration={0}>
                    <QueryClientProvider client={queryClient}>
                        <SidebarProvider>
                            <AppSidebar />
                            <SidebarInset>
                                <div className="flex flex-1 flex-col gap-4 size-full">
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route
                                            path="chat/:agentId"
                                            element={<Chat />}
                                        />
                                        <Route
                                            path="settings/:agentId"
                                            element={<Overview />}
                                        />
                                    </Routes>
                                </div>
                            </SidebarInset>
                        </SidebarProvider>
                        <Toaster />
                    </QueryClientProvider>
                </TooltipProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
