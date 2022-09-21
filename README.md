# react-as-prop

React utility for adding a type-safe `as` prop to make flexible and semantic UI components.

Inspired by [styled-component's `as` prop](https://styled-components.com/docs/basics#extending-styles) and [Material UI's `component` prop](https://mui.com/material-ui/guides/composition/#component-prop).

## Install

```
yarn add react-as-prop
```

## Usage

### `overridable(component: FC, fallback: ElementType): FC`

Adds `as` prop to the component specified in the argument.

- `component` ― Component to add `as` prop
- `fallback` ─ Default element, such as `button` or `div`

Here is an example of your component definition.

```tsx
import { overridable } from "react-as-prop";

interface InternalButtonProps {
  // ⚠️ NOTE: This prop is always needed
  as: ElementType;
  size: "small" | "large";
  children?: ReactNode;
}

const InternalButton: FC<InternalButtonProps> = (props) => {
  const { as: Component, size, children, ...rest } = props;

  return (
    // You always have to add {...rest} in the end to accept other props from the component overriding this one
    <Component className={`button blue button-${size}`} {...rest}>
      {children}
    </Component>
  );
};

// It is recommended to export only this part
export const Button = overridable(Button, "button");
export type ButtonProps = ComponentProps<typeof Button>;
```

Now then, it can be override with any other component

```tsx
<Button as="a" href="/" />
<Button as={PinkButton} />
```

### `overridableWithRef(fn: ForwardRefRenderFunction, fallback: ElementType): FC`

Almost same as `overridable`, but also supports type-safe `forwardRef`.

- `fn` ― A function that accepts `props` and `forwardedRef`
- `fallback` ─ Default element, such as `button` or `div`

Here is an example of your component definition.

```tsx
import { overridableWithRef } from "react-as-prop";

interface InternalButtonProps {
  as: ElementType;
  size: "small" | "large";
  children?: ReactNode;
}

const InternalButton: ForwardRefRenderFunction<
  InternalButtonProps,
  // Use `unknown` because you can override it
  unknown
> = (props, forwardedRef) => {
  const { as: Component, size, children, ...rest } = props;

  return (
    <Component
      className={`button blue button-${size}`}
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </Component>
  );
};

export const Button = overridableWithRef(Button, "button");
export type ButtonProps = ComponentProps<typeof Button>;
```

Now then, it can be override with any other component

```tsx
const ref = useRef<HTMLAnchorElement | null>(null);
<Button as="a" href="/" ref={ref} />;
```

### `configure(propName: string): ConfigureResult`

A factory function that returns `override` and `overridableWithRef` with customized name for `as` prop.

```tsx
import { configure } from "react-as-prop";

// Use "kind" for as-prop
const { overridable } = configure("kind");

const Button = overridable(InternalButton, "button");
<Button kind="a" href="/" />;
```
