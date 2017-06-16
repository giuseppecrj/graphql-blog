import gulp from 'gulp'
import { server } from '../paths'

gulp.task('watch', () => {
  // server
  gulp.watch(server.typescript.input.watch, ['webpack:server:watch'])

  // views
  // gulp.watch(server.views.input.path, ['views-watch:server'])
})
