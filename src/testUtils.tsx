import {
  Renderer,
  renderHook,
  RenderHookOptions,
  RenderHookResult,
} from "@testing-library/react-hooks";
import React, { FunctionComponent } from "react";
import { SWRConfig } from "swr";

function customRenderHook<T, R>(
  callback: (props: T) => R,
  options?: RenderHookOptions<T> | undefined,
): RenderHookResult<T, R, Renderer<T>> {
  const AppWrapper: FunctionComponent<T> = ({ children }) => (
    <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
  );

  return renderHook(callback, { wrapper: AppWrapper, ...options });
}

export { customRenderHook as renderHook };
