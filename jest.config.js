module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/test/**/*.test.js'],
    moduleFileExtensions: ['js'],
    verbose: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    transform: {},
    testPathIgnorePatterns: ['/node_modules/'],
    setupFiles: ['./test/setup.js']
};
