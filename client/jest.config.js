module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  //
  coverageDirectory: 'tests/unit/coverage',
  moduleFileExtensions: [
    'js',
    'vue'
  ],
  collectCoverageFrom: [
    "**/*.js",
    "**/*.vue",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!jest.config.js"
  ],
  coveragePathIgnorePatterns: ['/(node_modules)/']
}
