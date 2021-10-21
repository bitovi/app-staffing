module.exports = {
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["<rootDir>/**/*.test.{ts,tsx}"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@staffing(.*)$": "<rootDir>/src/shared$1",
    "\\.(scss)$": "identity-obj-proxy",
    "\\.(png|svg)$": "<rootDir>/__mocks__/file.js",
  },

  coveragePathIgnorePatterns: ["\\.stories\\."],
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      lines: 0,
      functions: 0,
    },
  },
};
