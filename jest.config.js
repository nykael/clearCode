module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: "node",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
  },
};