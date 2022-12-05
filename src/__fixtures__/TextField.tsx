import { ElementType } from "react";
import { overridable } from "..";

interface TextFieldProps {
  as: ElementType;
  size: "md" | "lg";
}

const _TextField = (props: TextFieldProps) => {
  const { as: Component, size } = props;
  return <Component className={`size-${size}`} />;
};

export const TextField = overridable(_TextField, "input");
