import { Author } from '../authors/authors.server.schema'

export const Post = `
  type PostPage {
    count: Int
    nodes: [Post]
  }

  type Post {
    id: Int!
    title: String
    author: Author
  }
`
export default () => [Post, Author]
