import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  verbose: true,
  transform: {
    "\\.svg$":
      "<rootDir>/fileTransformer.js",
  },
  // покрытие файлов
  // collectCoverage: true,
  // collectCoverageFrom: [
  //   "**/*.{ts,tsx}",
  //   "!**/node_modules/**",
  //   "!**/vendor/**",
  //   "!jest.config.ts",
  //   "!fileTransformer.js"
  // ],
};

export default config;
