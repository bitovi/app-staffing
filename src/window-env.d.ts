// Note: Please see /public/config.js for information about this file.
declare global {
  interface Window {
    env: {
      API_BASE_URL: string;
      API_AUTH_TOKEN: string;
    };
  }
}

export {};
