import { ElementType, ForwardRefRenderFunction } from "react";
import { overridableWithRef } from "..";

interface TextFieldWithRefProps {
  as: ElementType;
  size: "md" | "lg";
}

const _TextFieldWithRef: ForwardRefRenderFunction<
  unknown,
  TextFieldWithRefProps
> = (props) => {
  const { as: Component, size } = props;
  return <Component className={`size-${size}`} />;
};

export const TextFieldWithRef = overridableWithRef(_TextFieldWithRef, "input");
