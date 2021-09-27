import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { SWRConfig } from "swr";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const customRenderHook = (hook: any, options?: any) => {
  const AppWrapper = ({ children }: { children: JSX.Element }) => (
    // @ts-ignore
    <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
  );

  return renderHook(() => hook(), { wrapper: AppWrapper, ...options });
};

export { customRenderHook as renderHook };
