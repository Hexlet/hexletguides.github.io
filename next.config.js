const { i18n } = require('./next-i18next.config.js');
const { withSentryConfig } = require('@sentry/nextjs');

const sentryWebpackPluginOptions = {
  silent: true,
};

// module.exports = withSentryConfig(
//   {
//     i18n,
//     trailingSlash: true,
//     experimental: {
//       amp: {
//         skipValidation: true,
//       },
//     },
//     sentry: {
//       hideSourceMaps: true,
//     },
//   },
//   sentryWebpackPluginOptions,
// );

module.exports = {
  i18n,
  trailingSlash: true,
  experimental: {
    amp: {
      skipValidation: true,
    },
  },
};
