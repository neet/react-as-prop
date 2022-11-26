import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementRef,
  ElementType,
  ReactElement,
  RefAttributes,
} from "react";

export type OverrideProp<K extends string> = {
  readonly [propName in K]: ElementType;
};

// prettier-ignore
export type OverrideProps<T extends ElementType, P, K extends string> = (
  & { [key in K]: T }
  & Omit<ComponentPropsWithoutRef<T>, keyof P>
  & P
);

export type OverridePropsWithRef<
  T extends ElementType,
  P,
  K extends string
> = OverrideProps<T, P, K> & RefAttributes<ElementRef<T>>;

// prettier-ignore
export type OverridableComponentType<
  D extends ElementType,
  P,
  K extends string
> = {
  <T extends ElementType>(props: OverridePropsWithRef<T, P, K>): ReactElement | null;
  (props: ComponentPropsWithRef<D> & Omit<P, K>): ReactElement | null;
};
