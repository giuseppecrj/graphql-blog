import gulp from 'gulp'
import plugins from 'gulp-load-plugins'
import { client } from '../../paths'

const $ = plugins()

gulp.task('files', () => {
  return gulp.src(client.files.input.path)
    .pipe($.flatten())
    .pipe(gulp.dest(client.files.output.path))
})
