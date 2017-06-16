import gulp from 'gulp'
import webpack from 'webpack'
import webpackServerConfig from '../../webpack/webpack.server.babel'
import nodemon from 'nodemon'
import { options } from '../../paths'

gulp.task('webpack:server', (done) => {
  webpack(webpackServerConfig(options.env), options.onBuild(done))
})

gulp.task('webpack:server:watch', () => {
  webpack(webpackServerConfig(options.env), (err, stats) => {
    options.onBuild()(err, stats)
    nodemon.restart()
  })
})
