const authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov' }
]

export class Authors {
  async list () {
    return authors
  }
  async find (id) {
    return authors.filter((author) => author.id === id)[0]
  }
}
