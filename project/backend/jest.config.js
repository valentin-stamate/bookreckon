module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    collectCoverage: true,
    coverageThreshold: {
        "global": {
            "branches": 80,
            "functions": 80,
            "lines": 80
        }
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testMatch: [
        "**/__tests__/**/*spec.+(ts|tsx|js)"
    ],
    "coverageReporters": [
        "text",
        "cobertura",
        "html"
    ]
}