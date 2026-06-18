import { QueryProvider } from "./QueryProvider";
import { RouterProvider } from "./RouterProvider";

export const App = () => (
  <QueryProvider>
    <RouterProvider />
  </QueryProvider>
);
