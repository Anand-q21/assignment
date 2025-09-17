const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, 'dist'),
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },
  resolve: {
    alias: {
      // 👇 Add aliases so Webpack knows where to find these libs
      '@shared/dtos': join(__dirname, '../../libs/shared-dtos/src/index.ts'),
      '@anand-q21-assignment/shared-dtos': join(
        __dirname,
        '../../libs/shared-dtos/src/index.ts'
      ),
    },
    extensions: ['.ts', '.js', '.json'],
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
      sourceMaps: true,
    }),
  ],
};