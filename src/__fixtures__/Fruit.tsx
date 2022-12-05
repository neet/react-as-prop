import { ForwardedRef, forwardRef, ReactNode } from "react";

interface FruitProps {
  className?: string;
  color: "red" | "blue";
  children: ReactNode;
}

export const Fruit = (
  props: FruitProps,
  ref?: ForwardedRef<HTMLDivElement>
) => {
  return (
    <div className={props.className} style={{ color: props.color }} ref={ref}>
      🍎
    </div>
  );
};

export const FruitWithRef = forwardRef<HTMLDivElement, FruitProps>(Fruit);
