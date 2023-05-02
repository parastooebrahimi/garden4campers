module.exports = {
  testEnvironment: "node",
  preset: "ts-jest",
  testEnvironment: "jsdom",
  //setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
      diagnostics: true,
      jsx: "react",
    },
  },
};
