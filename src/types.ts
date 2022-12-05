import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  ForwardRefRenderFunction,
  FunctionComponent,
  ReactElement,
} from "react";

type ComponentPropsWithRef__OmitUserDefinedProps<
  T extends ElementType,
  P
> = Omit<ComponentPropsWithRef<T>, keyof P>;

// prettier-ignore
type OverridePropsWithRef__WithoutOverride<D extends ElementType, P, K extends string> = (
  & ComponentPropsWithRef__OmitUserDefinedProps<D, P>
  & Omit<ComponentPropsWithoutRef<D>, keyof P>
  & Omit<P, K>
);

// prettier-ignore
type OverridePropsWithRef__WithOverride<T extends ElementType, P, K extends string> = (
  & { [key in K]: T }
  & ComponentPropsWithRef__OmitUserDefinedProps<T, P>
  & Omit<ComponentPropsWithoutRef<T>, keyof P>
  & P
);

// prettier-ignore
export type OverridableComponentTypeWithRef<
  D extends ElementType,
  P,
  K extends string
> = {
  // with as
  <T extends ElementType>(props: OverridePropsWithRef__WithOverride<T, P, K>): ReactElement | null;
  // without as
  (props: OverridePropsWithRef__WithoutOverride<D, P, K>): ReactElement | null;
};

export type OverrideProp<K extends string> = {
  readonly [propName in K]: ElementType;
};

// TODO: Returned component should not include `ref` prop
export type OverridableFn<K extends string> = <
  D extends ElementType,
  P extends OverrideProp<K>
>(
  component: FunctionComponent<P>,
  fallback: D
) => OverridableComponentTypeWithRef<D, P, K>;

export type OverridableWithRefFn<K extends string> = <
  D extends ElementType,
  P extends OverrideProp<K>
>(
  forwardRefRenderFunction: ForwardRefRenderFunction<unknown, P>,
  fallback: D
) => OverridableComponentTypeWithRef<D, P, K>;
