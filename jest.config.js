module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["src/**/*.ts"],
  transformIgnorePatterns: ["node_modules/?!(dom-expressions)"],
  moduleNameMapper: {
    "@app/(.*)": "<rootDir>/src/$1",
  },
};
