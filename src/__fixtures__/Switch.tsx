import { ElementType, FC, ReactNode } from "react";
import { overridable } from "..";

interface SwitchProps {
  as: ElementType;
  children?: ReactNode;
}

const _Switch: FC<SwitchProps> = (props) => {
  const { as: As, children, ...rest } = props;
  return <As {...rest}>{children}</As>;
};

export const Switch = overridable(_Switch, "button");
