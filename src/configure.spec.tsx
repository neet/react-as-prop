import type {
  ElementType,
  FC,
  ForwardedRef,
  ForwardRefRenderFunction,
  ReactNode,
} from "react";
import { useRef, forwardRef } from "react";
import { render, screen } from "@testing-library/react";
import { overridable, overridableWithRef } from ".";

/*-----------------------*/

interface ButtonProps {
  as: ElementType;
  children?: ReactNode;
}

const _Button: ForwardRefRenderFunction<unknown, ButtonProps> = (props) => {
  const { as: As, children, ...rest } = props;
  return <As {...rest}>{children}</As>;
};

const Button = overridableWithRef(_Button, "button");

/*-----------------------*/

interface SwitchProps {
  as: ElementType;
  children?: ReactNode;
}

const _Switch: FC<SwitchProps> = (props) => {
  const { as: As, children, ...rest } = props;
  return <As {...rest}>{children}</As>;
};

const Switch = overridable(_Switch, "button");

/*-----------------------*/

interface FruitProps {
  className?: string;
  color: "red" | "blue";
  children: ReactNode;
}

const Fruit = (props: FruitProps, ref?: ForwardedRef<HTMLDivElement>) => {
  return (
    <div className={props.className} style={{ color: props.color }} ref={ref}>
      🍎
    </div>
  );
};

const FruitWithRef = forwardRef<HTMLDivElement, FruitProps>(Fruit);

/*-----------------------*/

interface TextFieldProps {
  as: ElementType;
  size: "md" | "lg";
}

const _TextField = (props: TextFieldProps) => {
  const { as: Component, size } = props;
  return <Component className={`size-${size}`} />;
};
const TextField = overridable(_TextField, "input");

/*-----------------------*/

() => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const anchorRef = useRef<HTMLAnchorElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);

  const handleClickButton = (_e: React.MouseEvent<HTMLButtonElement>) => {
    /* noop */
  };

  const handleClickAnchor = (_e: React.MouseEvent<HTMLAnchorElement>) => {
    /* noop */
  };

  const handleClickDiv = (_e: React.MouseEvent<HTMLDivElement>) => {
    /* noop */
  };

  // prettier-ignore
  // eslint-disable-next-line
  <>
    <Button aria-label="my button">test</Button>
    <Button onClick={handleClickButton}>test</Button>
    <Button ref={buttonRef}>test</Button>
    {/* @ts-expect-error: Fails with wrong prop type */}
    <Button href="https://example.com">test</Button>
    {/* @ts-expect-error: Fails with wrong ref type */}
    <Button ref={anchorRef}>test</Button>
    {/* @ts-expect-error: Fails with wrong event handler type*/}
    <Button onClick={handleClickAnchor}>test</Button>

    {/* as={keyof IntrinsicElements} */}
    <Button as="a" href="https://example.com">test</Button>
    <Button as="a" href="https://example.com" ref={anchorRef}>test</Button>
    <Button as="a" ref={anchorRef} onClick={handleClickAnchor}>test</Button>
    {/* @ts-expect-error: Fails with wrong prop type */}
    <Button as="a" href={123}>test</Button>
    {/* @ts-expect-error: Fails with wrong ref type */}
    <Button as="a" ref={divRef}>test</Button>
    {/* @ts-expect-error: Fails with wrong event handler type*/}
    <Button as="a" onClick={handleClickDiv}>test</Button>

    {/* as={ComponentType} */}
    <Button as={Fruit} color="red">test</Button>
    {/* @ts-expect-error: Fails with wrong prop type */}
    <Button as={Fruit} color={123}>test</Button>
    {/* @ts-expect-error: Fails with wrong ref type */}
    <Button as={Fruit} color="red" ref={divRef}>test</Button>
    {/* @ts-expect-error: Fails with wrong event type */}
    <Button as={Fruit} color="red" onClick={handleClickDiv}>test</Button>

    {/* as={ComponentTypeWithRef} */}
    <Button as={FruitWithRef} color="red">test</Button>
    <Button as={FruitWithRef} color="red" ref={divRef}>test</Button>
    {/* @ts-expect-error: Fails with wrong prop type */}
    <Button as={FruitWithRef} color={123}>test</Button>
    {/* @ts-expect-error: Fails with wrong ref type */}
    <Button as={FruitWithRef} color="red" ref={anchorRef}>test</Button>
    {/* @ts-expect-error: Fails with wrong event type */}
    <Button as={FruitWithRef} color="red" onClick={handleClickDiv}>test</Button>
  </>;

  // prettier-ignore
  // eslint-disable-next-line
  <>
    <Switch aria-label="my Switch">test</Switch>
    <Switch onClick={handleClickButton}>test</Switch>
    {/* @ts-expect-error: Fails with wrong prop type */}
    <Switch href="https://example.com">test</Switch>
    {/* @ts-expect-error: Fails with wrong event handler type*/}
    <Switch onClick={handleClickAnchor}>test</Switch>

    {/* as={keyof IntrinsicElements} */}
    <Switch as="a" href="https://example.com">test</Switch>
    <Switch as="a" href="https://example.com" ref={anchorRef}>test</Switch>
    {/* @ts-expect-error: Fails with wrong prop type */}
    <Switch as="a" href={123}>test</Switch>
    {/* @ts-expect-error: Fails with wrong event handler type*/}
    <Switch as="a" onClick={handleClickDiv}>test</Switch>

    {/* as={ComponentType} */}
    <Switch as={Fruit} color="red">test</Switch>
    {/* @ts-expect-error: Fails with wrong prop type */}
    <Switch as={Fruit} color={123}>test</Switch>
    {/* @ts-expect-error: Fails with wrong event type */}
    <Switch as={Fruit} color="red" onClick={handleClickDiv}>test</Switch>

    {/* as={ComponentTypeWithRef} */}
    <Switch as={FruitWithRef} color="red">test</Switch>
    <Switch as={FruitWithRef} color="red" ref={divRef}>test</Switch>
    {/* @ts-expect-error: Fails with wrong prop type */}
    <Switch as={FruitWithRef} color={123}>test</Switch>
    {/* @ts-expect-error: Fails with wrong event type */}
    <Switch as={FruitWithRef} color="red" onClick={handleClickDiv}>test</Switch>
  </>;

  <>
    <TextField as="input" size="lg" />
    {/* @ts-expect-error: Cannot pass a number */}
    <TextField as="input" size={123} />
  </>;
};

describe("overridable", () => {
  test("render as tagName", () => {
    render(
      <Switch as="a" href="https://example.com">
        Switch
      </Switch>
    );
    expect(screen.getByRole("link", { name: "Switch" })).not.toBeNull();
  });

  test("render as custom component", () => {
    render(
      <Switch color="red" as={FruitWithRef}>
        Switch
      </Switch>
    );
    expect(screen.getByText("🍎")).not.toBeNull();
  });
});

describe("overridableWithRef", () => {
  test("render as tagName", () => {
    render(
      <Button as="a" href="https://example.com">
        Button
      </Button>
    );
    expect(screen.getByRole("link", { name: "Button" })).not.toBeNull();
  });

  test("render as custom component", () => {
    render(
      <Button color="red" as={FruitWithRef}>
        Button
      </Button>
    );
    expect(screen.getByText("🍎")).not.toBeNull();
  });
});
