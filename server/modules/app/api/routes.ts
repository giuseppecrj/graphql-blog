import { makeExecutableSchema } from 'graphql-tools'
import { Author } from './authors/authors.server.schema'
import { Post } from './post/post.server.schema'
import { PubSub } from 'graphql-subscriptions'

export const pubsub = new PubSub()

const Types = () => [Author, Post]

const Query = `
  type Query {
    # List of Posts with pagination options
    posts(offset: Int, limit: Int): PostPage
    authors: [Author]
    author(id: Int!): Author
  }

  type Mutation {
    addPost (authorId: Int!, title: String!): Post
  }

  type Subscription {
    somethingChanged: Result
  }

  type Result {
    id: String
  }
`
const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation,
    subscription: Subscription
  }
`

const SOMETHING_CHANGED_TOPIC = 'something_changed'

const resolvers = {
  Query: {
    posts: (_, args, ctx) => ctx.posts.list(args),
    authors: (_, args, ctx) => ctx.authors.list(),
    author: (_, args, ctx) => ctx.authors.find(args.id)
  },
  Mutation: {
    addPost: (_, args, ctx) => ctx.posts.create(args)
  },
  Subscription: {
    somethingChanged: {
      subscribe: () => pubsub.asyncIterator(SOMETHING_CHANGED_TOPIC)
    }
  },
  Author: {
    posts: (author, args, ctx) => ctx.posts.find(author.id)
  },
  Post: {
    author: (post, args, ctx) => ctx.authors.find(post.authorId)
  }
}

// setTimeout(() => {
//   pubsub.publish(SOMETHING_CHANGED_TOPIC, { somethingChanged: { id: '123' } })
// }, 5000)

export const Schema = makeExecutableSchema({
  typeDefs: [
    SchemaDefinition, Query, Types
  ],
  resolvers
})
