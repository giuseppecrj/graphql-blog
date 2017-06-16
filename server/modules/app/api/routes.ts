import { makeExecutableSchema } from 'graphql-tools'
import { Author } from './authors/authors.server.schema'
import { Post } from './post/post.server.schema'

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
`
const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`

const resolvers = {
  Query: {
    posts: (_, args, ctx) => ctx.posts.list(args),
    authors: (_, args, ctx) => ctx.authors.list(),
    author: (_, args, ctx) => ctx.authors.find(args.id)
  },
  Mutation: {
    addPost: (_, args, ctx) => ctx.posts.create(args)
  },
  Author: {
    posts: (author, args, ctx) => ctx.posts.find(author.id)
  },
  Post: {
    author: (post, args, ctx) => ctx.authors.find(post.authorId)
  }
}

export const Schema = makeExecutableSchema({
  typeDefs: [
    SchemaDefinition, Query, Types
  ],
  resolvers
})
