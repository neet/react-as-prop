import {
  ElementType,
  forwardRef,
  ForwardRefRenderFunction,
  FunctionComponent,
} from "react";
import { OverriddenComponentType } from "./OverrideProps";

export const configure = <K extends string>(propName: K) => {
  const withOverride = <
    D extends ElementType,
    P extends { [propName in K]: ElementType }
  >(
    component: FunctionComponent<P>,
    fallback: D
  ) => {
    return function Overridable(props: P) {
      return component({ [propName]: fallback, ...props });
    } as OverriddenComponentType<D, P, K>;
  };

  const forwardRefWithOverride = <
    D extends ElementType,
    P extends { [propName in K]: ElementType }
  >(
    forwardRefRenderFunction: ForwardRefRenderFunction<HTMLElement, P>,
    fallback: D
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return forwardRef<any, any>(function ForwardRefWithOverride(props, ref) {
      return forwardRefRenderFunction({ [propName]: fallback, ...props }, ref);
    }) as OverriddenComponentType<D, P, K>;
  };

  return { forwardRefWithOverride, withOverride };
};
