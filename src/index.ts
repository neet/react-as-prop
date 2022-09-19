import { configure } from "./configure";

export * from "./configure";
export * from "./OverrideProps";

const { withOverride, forwardRefWithOverride } = configure("as");
export { withOverride, forwardRefWithOverride };
