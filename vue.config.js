module.exports = {
  publicPath: '/xtable',
  outputDir:'docs',
  productionSourceMap: process.env.NODE_ENV === 'dev',
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'dev' ? 'source-map' : undefined,
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
};
