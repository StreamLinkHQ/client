import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HuddleProvider, HuddleClient } from "@huddle01/react";
import { AppRouter } from "./app-router";

export function App() {
  const queryClient = new QueryClient();

  const huddleClient = new HuddleClient({
    projectId: "qPKQkLIUug6H0EP3VQXpGDmtBTf4y7Of", 
  });

  return (
    <QueryClientProvider client={queryClient}>
      <HuddleProvider client={huddleClient}>
        <AppRouter />
      </HuddleProvider>
    </QueryClientProvider>
  );
}
