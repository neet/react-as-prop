import { forwardRef } from "react";
import { OverridableFn, OverridableWithRefFn } from "./types";

export type ConfigureResult<K extends string> = {
  overridable: OverridableFn<K>;
  overridableWithRef: OverridableWithRefFn<K>;
};

export const configure = <K extends string>(
  propName: K
): ConfigureResult<K> => {
  const overridable: OverridableFn<K> = (component, fallback) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function Overridable(props: any) {
      return component({ [propName]: fallback, ...props });
    };
  };

  const overridableWithRef: OverridableWithRefFn<K> = (
    forwardRefRenderFunction,
    fallback
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return forwardRef<any, any>(function ForwardRefWithOverride(props, ref) {
      return forwardRefRenderFunction({ [propName]: fallback, ...props }, ref);
    });
  };

  return { overridable, overridableWithRef };
};
