import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Todo from "./todo";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Todo />
    </QueryClientProvider>
  );
};

export default App;
