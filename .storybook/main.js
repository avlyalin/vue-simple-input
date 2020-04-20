const path = require('path');

module.exports = {
  addons: ['@storybook/addon-knobs/register'],
  stories: ['../src/**/*.stories.[tj]s'],
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });
    return config;
  },
};
