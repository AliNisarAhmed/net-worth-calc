import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  modulePathIgnorePatterns: [
    "<rootDir>/client/",
    "<rootDir>/client/dist/",
    "<rootDir>/node_modules/",
    "<rootDir>/client/node_modules/",
    "<rootDir>/server/dist/",
  ],
};
export default config;
