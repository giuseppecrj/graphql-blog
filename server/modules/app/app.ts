import * as express from 'express'
import * as path from 'path'
import * as logger from 'morgan'
import * as bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'

import { Schema } from './api/routes'
import { Posts } from './api/post/post.server.controller'
import { Authors } from './api/authors/authors.server.controller'

export const app = express()
app.set('views', path.resolve('./public/app/global/views'))
app.set('view engine', 'pug')

app.use(logger('dev'))

app.use('/graphql', bodyParser.json(), graphqlExpress(request => ({
  schema: Schema,
  context: {
    posts: new Posts(),
    authors: new Authors()
  }
})))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

const server = app.listen(3000, () => {
  console.log('Listening on port:', server.address().port)
})
