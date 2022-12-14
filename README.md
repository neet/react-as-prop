# react-as-prop

[![npm](https://img.shields.io/npm/v/react-as-prop.svg)](https://www.npmjs.com/package/react-as-prop)
[![CI](https://github.com/neet/react-as-prop/actions/workflows/ci.yml/badge.svg)](https://github.com/neet/react-as-prop/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/neet/react-as-prop/branch/main/graph/badge.svg?token=H5D79GDKOM)](https://codecov.io/gh/neet/react-as-prop)

![Thumbnail](https://github.com/neet/react-as-prop/blob/main/assets/react-as-prop.png)

Type-safe React utility that adds an ad-hoc prop for switching which HTML element to render, for developing flexible and semantic UI components.

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

Then, it can be overriden with another component

```tsx
<Button as="div" />
<Button as="a" href="/page" />
<Button as={Link} to="/" />
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

Then, it can be overriden with another component

```tsx
const ref = useRef<HTMLAnchorElement | null>(null);

<Button as="a" href="/page" ref={ref} />
<Button as={Link} to="/" ref={ref} />
```

### `configure(propName: string): ConfigureResult`

A factory function that returns `override` and `overridableWithRef` with customized name for `as` prop.

- `propName` ― name of the prop to use instead of `"as"`

```tsx
import { configure } from "react-as-prop";

// Use "kind" for as-prop
const { overridable } = configure("kind");

const Button = overridable(InternalButton, "button");
<Button kind="a" href="/" />;
```
