import gulp from 'gulp'
import plugins from 'gulp-load-plugins'
import { server } from '../../paths'

import notifier from 'node-notifier'

const $ = plugins()

gulp.task('nodemon', ['webpack:server'], (cb) => {
  var called = false
  return $.nodemon({
    script: 'server.js',
    ext: 'js',
    watch: server.nodemon.input.path
  })
  .on('start', () => {
    if (!called) {
      cb()
      called = true
    }
  })
})

gulp.task('notify', () => {
  return notifier.notify({
    title: `Webpack`,
    subtitle: 'Server is ready on:',
    message: 'http://localhost:3000',
    contentImage: `${__dirname}/assets/logo.png`
  })
})
