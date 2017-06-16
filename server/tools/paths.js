import path from 'path'
import plugins from 'gulp-load-plugins'
import notifier from 'node-notifier'

const $ = plugins()

export const options = {
  env: {
    target: process.env.NODE_ENV
  },
  minify: process.env.NODE_ENV === 'production',
  onBuild: (done, logOptions = {}) => {
    return (err, stats) => {
      if (err) throw new $.util.PluginError('webpack', err)
      $.util.log(`[webpack]: ${stats.toString(logOptions)}`)
      if (stats.compilation.errors.length) {
        notifier.notify({
          title: `[webpack]: ${stats.compilation.errors[1].name}`,
          subtitle: `${stats.compilation.errors[1].message}`,
          message: `${stats.compilation.errors[0]}`,
          contentImage: `${__dirname}/assets/logo.png`
        })
      }

      if (done) {
        done()
      }
    }
  }
}

export const main = {
  input: {
    path: path.resolve('./modules/main.ts')
  },
  output: {
    path: path.resolve('./public/server')
  }
}

export const client = {
  files: {
    input: {
      path: path.resolve('./modules/global/files/*.*')
    },
    output: {
      path: 'public/client'
    }
  }
}

export const server = {
  nodemon: {
    input: {
      path: ['./public/server/main.js', 'server.js', 'locales/**/*.json']
    }
  },
  typescript: {
    input: {
      watch: path.resolve('./modules/**/*.ts'),
      path: path.resolve('./modules/main.ts')
    },
    output: {
      path: path.resolve('./public/server')
    }
  },
  views: {
    input: {
      path: ['modules/**/*.pug']
    },
    output: {
      path: 'public/app/global/views'
    }
  },
  api: {
    input: {
      watch: ['modules/app/api/**/*.ts'],
      path: 'modules/app/api'
    },
    output: {
      path: 'public/api/docs'
    }
  }
}
