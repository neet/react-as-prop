# react-as-prop

React utility for adding a type-safe `as-prop` to make flexible and semantic UI components.

Inspired by styled-component's `as` prop and Material UI's `component` prop.

## Install

```
yarn add react-as-prop
```

## Usage

### `withOverride(component: FC, fallback: ElementType): FC`

Adds `as` prop to the component specified in the argument.

- `component` ― Component to add `as` prop
- `fallback` ─ Default element, such as `button` or `div`

Here is an example of your component definition.

```tsx
import { withOverride } from "react-as-prop";

interface InternalButtonProps {
  // ⚠NOTE: This prop is always needed
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
export const Button = withOverride(Button, "button");
export type ButtonProps = ComponentProps<typeof Button>;
```

Now then, it can be override with any other component

```tsx
<Button as="a" href="/" />
<Button as={PinkButton} />
```

### `forwardRefWithOverride(fn: ForwardRefRenderFunction, fallback: ElementType): FC`

Almost same as `withOverride`, but also supports type-safe `forwardRef`.

- `fn` ― A function that accepts `props` and `forwardedRef`
- `fallback` ─ Default element, such as `button` or `div`

Here is an example of your component definition.

```tsx
import { forwardRefWithOverride } from "react-as-prop";

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

export const Button = forwardRefWithOverride(Button, "button");
export type ButtonProps = ComponentProps<typeof Button>;
```

Now then, it can be override with any other component

```tsx
const ref = useRef<HTMLAnchorElement | null>(null);
<Button as="a" href="/" ref={ref} />;
```

### `configure(propName: string): `
