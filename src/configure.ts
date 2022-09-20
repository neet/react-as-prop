import type {
  ElementType,
  ForwardRefRenderFunction,
  FunctionComponent,
} from "react";
import { forwardRef } from "react";
import type { OverridableComponentType } from "./types";

export type OverridableFn<K extends string> = <
  D extends ElementType,
  P extends { [propName in K]: ElementType }
>(
  component: FunctionComponent<P>,
  fallback: D
) => OverridableComponentType<D, P, K>;

export type OverridableWithRefFn<K extends string> = <
  D extends ElementType,
  P extends { [propName in K]: ElementType }
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
  const overridable: OverridableFn<K> = <
    D extends ElementType,
    P extends { [propName in K]: ElementType }
  >(
    component: FunctionComponent<P>,
    fallback: D
  ) => {
    return function Overridable(props: P) {
      return component({ [propName]: fallback, ...props });
    } as OverridableComponentType<D, P, K>;
  };

  const overridableWithRef: OverridableWithRefFn<K> = <
    D extends ElementType,
    P extends { [propName in K]: ElementType }
  >(
    forwardRefRenderFunction: ForwardRefRenderFunction<unknown, P>,
    fallback: D
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return forwardRef<any, any>(function ForwardRefWithOverride(props, ref) {
      return forwardRefRenderFunction({ [propName]: fallback, ...props }, ref);
    }) as OverridableComponentType<D, P, K>;
  };

  return { overridable, overridableWithRef };
};
