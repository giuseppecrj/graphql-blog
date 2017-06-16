import webpack from 'webpack'
import GitRevisionPlugin from 'git-revision-webpack-plugin'

export const sourcemaps = (devtool) => ({
  devtool
})

export const attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version()
    })
  ]
})

export const environment = (envConfig) => {
  let env = Object.keys(envConfig)
    .map((key) => {
      let newKey = 'process.env.' + key
      return {
        [newKey]: envConfig[key]
      }
    })
    .reduce((acc, variable) => {
      for (let key in variable) acc[key] = JSON.stringify(variable[key])
      return acc
    }, {})

  Object.assign(env, { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) })

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  }
}

export const providers = (prov) => ({
  plugins: [
    new webpack.ProvidePlugin(prov)
  ]
})

export const ignore = (regex) => ({
  plugins: [
    new webpack.IgnorePlugin(regex)
  ]
})

export const banner = (name) => ({
  plugins: [
    new webpack.BannerPlugin({
      raw: true,
      entryOnly: false,
      banner: name
    })
  ]
})

export const externals = (nodeModules) =>
  nodeModules
    .filter((x) => ['.bin'].indexOf(x) === -1)
    .reduce((modules, module) => {
      modules[module] = `commonjs ${module}`
      return modules
    }, {})

export const hmr = (options) => ({
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      multiStep: false
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()
  ]
})
