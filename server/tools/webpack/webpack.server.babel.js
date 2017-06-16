import merge from 'webpack-merge'
import fs from 'fs'
import requireDir from 'require-dir'

// Locals Paths
import { main, server } from '../paths'

// Tasks
const tasks = requireDir('./')

// Environments
const nodeModules = fs.readdirSync('node_modules')
  .filter((x) => ['.bin'].indexOf(x) === -1)
  .reduce((modules, module) => {
    modules[module] = `commonjs ${module}`
    return modules
  }, {})

const common = {
  entry: {
    main: main.input.path
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  target: 'node',
  output: {
    path: main.output.path,
    libraryTarget: 'commonjs'
  },
  node: {
    __dirname: true,
    __filename: true
  },
  externals: nodeModules
}

export default (env) => {
  switch (env.target) {
    case 'production':
    default:
      return merge([
        common,
        // scripts
        tasks.scripts.run('./modules/tsconfig.json'),
        tasks.scripts.lint(),
        // utils
        tasks.utils.sourcemaps('source-map'),
        tasks.utils.banner('require("source-map-support").install();'),
        tasks.utils.ignore(/\.(css|less)$/)
      ])
  }
}
