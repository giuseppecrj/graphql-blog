import gulp from 'gulp'
import plugins from 'gulp-load-plugins'
import { server } from '../../paths'
import { reload } from 'browser-sync'

const $ = plugins()

// ------- Server

gulp.task('views:server', () => {
  return gulp.src(server.views.input.path)
    .pipe($.changed(server.views.output.path, {
      extension: '.pug'
    }))
    .pipe($.flatten())
    .pipe(gulp.dest(server.views.output.path))
})

gulp.task('views-watch:server', ['views:server'], (done) => {
  reload()
  done()
})

gulp.task('views', ['views:server'])
