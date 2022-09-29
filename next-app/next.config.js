const { i18n } = require('./next-i18next.config.js');

module.exports = {
  i18n,
  trailingSlash: true,
  experimental: {
    amp: {
      skipValidation: true,
    },
  },
};
