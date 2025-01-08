import { useQuery } from "@tanstack/react-query";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { apiClient } from "@/lib/api";
import { NavLink } from "react-router";
import { type UUID } from "@elizaos/core";
import { formatAgentName } from "@/lib/utils";
import { Fragment } from "react/jsx-runtime";
import { ChevronUp, Cog, User2 } from "lucide-react";

export function AppSidebar() {
    const query = useQuery({
        queryKey: ["agents"],
        queryFn: () => apiClient.getAgents(),
    });

    const agents = query?.data?.agents;

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <NavLink to="/">
                                <img
                                    src="/elizaos-icon.png"
                                    width="100%"
                                    height="100%"
                                    className="size-7"
                                />

                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">
                                        ElizaOS
                                    </span>
                                    <span className="">v0.1.7</span>
                                </div>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Agents</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {query?.isPending ? (
                                <Fragment>
                                    {Array.from({ length: 5 }).map(
                                        (_, index) => (
                                            <SidebarMenuItem key={index}>
                                                <SidebarMenuSkeleton />
                                            </SidebarMenuItem>
                                        )
                                    )}
                                </Fragment>
                            ) : (
                                <Fragment>
                                    {agents?.map(
                                        (agent: { id: UUID; name: string }) => (
                                            <SidebarMenuItem key={agent.id}>
                                                <NavLink
                                                    to={`/chat/${agent.id}`}
                                                >
                                                    <SidebarMenuButton>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 bg-muted rounded-md uppercase aspect-square grid place-items-center">
                                                                {formatAgentName(
                                                                    agent.name
                                                                )}
                                                            </div>
                                                            <span>
                                                                {agent.name}
                                                            </span>
                                                        </div>
                                                    </SidebarMenuButton>
                                                </NavLink>
                                            </SidebarMenuItem>
                                        )
                                    )}
                                </Fragment>
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton disabled>
                            <Cog /> Settings
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
