// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   globals: {
//     'ts-jest': {
//       tsconfig: 'tsconfig.test.json'
//     }
//   },
//   testMatch: ['**/tests/**/*.test.ts'],
//   moduleFileExtensions: ['ts', 'js', 'json'],
// };


/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'], // 👈 only run files in tests
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json'
    }
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleDirectories: ['node_modules', 'src'], // 👈 allows imports from src without relative paths
};
