import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  verbose: true,
  transform: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|avif|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/fileTransformer.js",
  },
  // transformIgnorePatterns: ["node_modules/(?!(swiper|ssr-window|dom7)/)"],
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
