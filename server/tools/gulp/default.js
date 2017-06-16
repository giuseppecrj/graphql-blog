import gulp from 'gulp'
import runSequence from 'run-sequence'

gulp.task('build', (done) => {
  if (process.env.NODE_ENV === 'development') {
    runSequence('delete', 'files', 'apidoc', 'views', 'webpack:server', 'default', done)
  } else {
    runSequence('delete', 'files', 'apidoc', 'views', 'webpack:server', done)
  }
})

gulp.task('default', (done) => {
  runSequence('watch', 'nodemon', done)
})

gulp.task('notify', ['slack'], () => {
  console.log(`
    Project successfully launched: ${process.env.DOCKER_URL},
    Version: ${process.env.CDN_VERSION}
  `)
})
