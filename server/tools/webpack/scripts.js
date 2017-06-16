import webpack from 'webpack'
import path from 'path'

export const lint = (include) => ({
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'standard-loader',
        include
      }
    ]
  }
})


export const run = (configFileName, include) => ({
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        include,
        exclude: /node_modules/,
        options: {
          configFileName
        }
      }
    ]
  }
})

export const minify = ({ useSourceMap }) => {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: useSourceMap,
        mangle: {
          keep_fnames: true
        },
        compress: {
          warnings: false
        }
      })
    ]
  }
}
