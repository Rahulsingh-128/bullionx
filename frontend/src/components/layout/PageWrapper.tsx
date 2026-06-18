import type { ReactNode } from "react";

export const PageWrapper = ({ children }: { children: ReactNode }) => (
  <main className="flex-1 p-6 overflow-y-auto">{children}</main>
);
