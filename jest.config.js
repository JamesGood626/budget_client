module.exports = {
  transform: {
    "^.+\\.jsx?$": `<rootDir>/jest-preprocess.js`,
  },
  modulePaths: ["<rootDir>/src/"],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `.cache`, "cypress"],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  // modulePathIgnorePatterns: ["<rootDir>/.*/__mocks__"],
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/loadershim.js`],
}

// Found this to prevent duplicate mock message
// jest-haste-map: duplicate manual mock found: axios
// The following files share their name; please delete one of them:
//   * <rootDir>/src/components/class-components/tests/__mocks__/axios.js
//   * <rootDir>/src/components/functional-components/tests/__mocks__/axios.js
// https://github.com/EmakinaTR/makina-api/commit/5ac2b9e8db625f8a8375f45f93c080273df3b250
// modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__'],
