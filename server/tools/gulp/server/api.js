import gulp from 'gulp'
import plugins from 'gulp-load-plugins'
import { server } from '../../paths'

const $ = plugins()

gulp.task('apidoc', (done) => {
  $.apidoc({
    src: server.api.input.path,
    dest: server.api.output.path,
    debug: false,
    includeFilters: ['.*\\.ts$']
  }, done)
})
