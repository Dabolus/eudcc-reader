const publicPath = '/green-pass-reader/';

export default {
  webpack(config, env, helpers, options) {
    config.output = {
      ...config.output,
      publicPath,
    };
    config.devServer = {
      ...config.devServer,
      publicPath,
      historyApiFallback: {
        index: publicPath,
      },
    };
  },
};
