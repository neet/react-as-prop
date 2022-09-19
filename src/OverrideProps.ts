import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementRef,
  ElementType,
  ReactElement,
  RefAttributes,
} from "react";

/**
 * A utility type that accepts ElementType and props and returns props along with
 * `as` and other IntrinsicElements. Inspired by OverrideProps from Material UI
 */
// prettier-ignore
export type OverrideProps<T extends ElementType, P, K extends string> =
  & { [key in K]: T }
  & Omit<ComponentPropsWithoutRef<T>, keyof RefAttributes<T>>
  & P
  ;

/**
 * OverrideProps with { ref?: Element }. By casting forwardRef() to this type enables `ref` prop
 */
export type OverridePropsWithRef<
  T extends ElementType,
  P,
  K extends string
> = OverrideProps<T, P, K> & RefAttributes<ElementRef<T>>;

/**
 * Functional Component with `as` support
 * @params D Default ElementType
 * @params U Props Types
 * @params K Prop name used for `as`
 */
export type OverriddenComponentType<
  D extends ElementType,
  P,
  K extends string
> = {
  <T extends ElementType>(props: OverridePropsWithRef<T, P, K>): ReactElement;
  (props: ComponentPropsWithRef<D> & Omit<P, K>): ReactElement;
};
