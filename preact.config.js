export default {
  webpack(config, env, helpers, options) {
    config.output = {
      ...config.output,
      publicPath: '/green-pass-reader/',
    };
  },
};
