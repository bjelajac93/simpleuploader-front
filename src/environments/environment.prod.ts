export const environment = {
  API_ENDPOINT: 'https://localhost:44390/api/uploaddownload/',
  appVersion: require('../../package.json').version,
  allowedNumberOfFiles: 10,
  allowedFileSize: 20480,
  allowedFileTypes: ["image/png, image/gif, image/jpeg"],
  production: true
};
