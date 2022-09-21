import type {
  ElementType,
  ForwardRefRenderFunction,
  FunctionComponent,
} from "react";
import { forwardRef } from "react";
import type { OverrideProp, OverridableComponentType } from "./types";

export type OverridableFn<K extends string> = <
  D extends ElementType,
  P extends OverrideProp<K>
>(
  component: FunctionComponent<P>,
  fallback: D
) => OverridableComponentType<D, P, K>;

export type OverridableWithRefFn<K extends string> = <
  D extends ElementType,
  P extends OverrideProp<K>
>(
  forwardRefRenderFunction: ForwardRefRenderFunction<unknown, P>,
  fallback: D
) => OverridableComponentType<D, P, K>;

export type ConfigureResult<K extends string> = {
  overridable: OverridableFn<K>;
  overridableWithRef: OverridableWithRefFn<K>;
};

export const configure = <K extends string>(
  propName: K
): ConfigureResult<K> => {
  const overridable: OverridableFn<K> = (component, fallback) => {
    return function Overridable(props: any) {
      return component({ [propName]: fallback, ...props });
    };
  };

  const overridableWithRef: OverridableWithRefFn<K> = (
    forwardRefRenderFunction,
    fallback
  ) => {
    return forwardRef<any, any>(function ForwardRefWithOverride(props, ref) {
      return forwardRefRenderFunction({ [propName]: fallback, ...props }, ref);
    });
  };

  return { overridable, overridableWithRef };
};
