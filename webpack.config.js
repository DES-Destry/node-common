// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve('lib'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /(node_modules)/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};