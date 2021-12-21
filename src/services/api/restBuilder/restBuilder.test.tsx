import { Suspense } from "react";
import { SWRConfig } from "swr";

export const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
  </Suspense>
);
