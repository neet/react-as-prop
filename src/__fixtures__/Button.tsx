import { ElementType, ForwardRefRenderFunction, ReactNode } from "react";
import { overridableWithRef } from "..";

interface ButtonProps {
  as: ElementType;
  children?: ReactNode;
}

const _Button: ForwardRefRenderFunction<unknown, ButtonProps> = (props) => {
  const { as: As, children, ...rest } = props;
  return <As {...rest}>{children}</As>;
};

export const Button = overridableWithRef(_Button, "button");
