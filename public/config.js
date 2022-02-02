/**
 * Note: This file tracks the default value of "environment variables" that will
 * not be known at build time. Values like NODE_ENV can still be accessed via
 * `proccess.env`. This is specifically for values that need to change from one
 * environment to another while still using the same build.
 *
 * This file is only used for local development, it is not deployed. Changes to
 * the values available need to be coordinated with devops prior to merging so
 * the deployed environments can be updated first.
 *
 * If you edit this file, you must also edit 4 other files as well:
 *   - [Type Definitions](/src/window-env.d.ts)
 *   - [Test Config](/src/setupTests.env.ts)
 *   - [Helm Values](/helm/values.yaml)
 *   - [Deployment Template](/helm/templates/configmap.yaml)
 */

window.env = {
  API_BASE_URL: "https://api.dev.bitovi-staffing.com",
  API_AUTH_TOKEN: "<base64 encoded username:password>",
};
