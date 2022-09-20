import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import autoExternal from "rollup-plugin-auto-external";
import dts from "rollup-plugin-dts";
import typescript from "@rollup/plugin-typescript";

import packageJSON from "./package.json";

export default [
  {
    input: "./src/index.ts",
    output: {
      file: packageJSON.main,
      format: "cjs",
    },
    plugins: [json(), typescript(), autoExternal()],
  },
  {
    input: "./src/index.ts",
    output: {
      file: packageJSON.module,
      format: "esm",
    },
    plugins: [commonjs(), json(), typescript(), autoExternal()],
  },
  {
    input: "./src/index.ts",
    output: {
      file: packageJSON.types,
      format: "esm",
    },
    plugins: [dts()],
  },
];
