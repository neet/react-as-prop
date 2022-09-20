import { configure } from "./configure";

export * from "./configure";
export * from "./types";

const { overridable, overridableWithRef } = configure("as");
export { overridable, overridableWithRef };
