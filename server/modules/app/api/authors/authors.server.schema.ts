import { Post } from '../post/post.server.schema'

export const Author = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    posts: PostPage
  }
`

export default () => [Author, Post]
