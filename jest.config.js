const nextJest = require("next/jest");
const createJestConfig = nextJest({ dir: "./" });

const fromPairs = (pairs) =>
  pairs.reduce((res, [key, value]) => ({ ...res, [key]: value }), {});
const tsconfig = require("./tsconfig.json");
const moduleNameMapper = fromPairs(
  Object.entries(tsconfig.compilerOptions.paths).map(([k, [v]]) => [
    `^${k.replace(/\*/, "(.*)")}`,
    `<rootDir>/${v.replace(/\*/, "$1")}`,
  ])
);

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/setup-jest.js"],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/services/",
    "<rootDir>/src/slices/",
  ],
  moduleNameMapper,
  testEnvironment: "jsdom",
};

module.exports = createJestConfig(customJestConfig);
