const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL' },
  { id: 2, authorId: 2, title: 'GraphQL Rocks' },
  { id: 3, authorId: 2, title: 'Advanced GraphQL' },
  { id: 4, authorId: 3, title: 'Launchpad is Cool' }
]

export class Posts {
  async list (args) {
    const values = posts.slice(args.offset || 0).slice(0, args.limit)

    return {
      count: values.length,
      nodes: values
    }
  }

  async find (authorId) {
    const values = posts.filter(post => post.authorId === authorId)

    return {
      count: values.length,
      nodes: values
    }
  }

  async create (args) {
    const post = {
      id: posts.length + 1,
      authorId: args.authorId,
      title: args.title
    }

    posts.push(post)

    return post
  }
}
