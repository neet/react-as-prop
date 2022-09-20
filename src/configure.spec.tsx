import {
  createRef,
  ElementType,
  FC,
  ForwardRefRenderFunction,
  ReactNode,
} from "react";
import { render, screen } from "@testing-library/react";
import { withOverride, forwardRefWithOverride } from ".";

/*----------------*/

interface ButtonProps {
  as: ElementType;
  className?: string;
  children?: ReactNode;
}

const ButtonPure: ForwardRefRenderFunction<unknown, ButtonProps> = (
  props,
  ref
) => {
  const { as: As, className, children, ...rest } = props;

  return (
    <As className={className} ref={ref} {...rest}>
      {children}
    </As>
  );
};

/*----------------*/

interface PinkButtonProps {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}

const PinkButton: FC<PinkButtonProps> = (props) => {
  const { className, children, onClick } = props;

  return (
    <button
      className={className}
      style={{ backgroundColor: "pink" }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

/*----------------*/

describe("configure", () => {
  test("withOverride", () => {
    const Button = withOverride(ButtonPure, "button");
    const fn = jest.fn();

    render(
      <Button as="a" href="/" onClick={fn}>
        Click me
      </Button>
    );

    screen.getByRole("link", { name: /Click me/ }).click();

    expect(fn).toBeCalled();
  });

  test("override with another component", () => {
    const Button = withOverride(ButtonPure, "button");

    const fn = jest.fn();

    render(
      <Button as={PinkButton} onClick={fn}>
        Click me
      </Button>
    );

    screen.getByRole("button", { name: /Click me/ }).click();

    expect(fn).toBeCalled();
  });

  test("forwardRefWithOverride", () => {
    const Button = forwardRefWithOverride(ButtonPure, "button");
    const fn = jest.fn();
    const ref = createRef<HTMLAnchorElement>();

    render(
      <Button as="a" href="/" onClick={fn} ref={ref}>
        Click me
      </Button>
    );

    const link = screen.getByRole("link", { name: /Click me/ });
    link.click();

    expect(fn).toBeCalled();
    expect(ref.current).toBe(link);
  });
});
