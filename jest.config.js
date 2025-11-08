const config = {
  clearMocks: true,
  preset: 'ts-jest', 
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  transformIgnorePatterns: [
    'node_modules/(?!uuid)'
  ],
};

module.exports = config;