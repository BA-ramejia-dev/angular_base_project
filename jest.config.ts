import type { Config } from 'jest';

const config: Config = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup.jest.ts'],
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1'
    },
    coverageDirectory: 'coverage',
    cacheDirectory: '.jest-cache',
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/src/**/*.{js,ts}'],
    coveragePathIgnorePatterns: ['<rootDir>/src/main.ts'],
    coverageReporters: ['html', 'text', 'cobertura', 'text-summary']
};

export default config;
