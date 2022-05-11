const { books, authors } = require('../data/dummy')

const resolvers = {
  // QUERY
  Query: {
    books: () => books,
    book: (parent, args) => {
      return books.find((book) => book.id.toString() === args.id)
    },
    authors: () => authors,
    author: (parent, args) => {
      return authors.find((author) => author.id.toString() === args.id)
    },
  },

  Book: {
    author: (parent, args) => {
      return authors.find((author) => author.id === parent.author_id)
    },
  },

  Author: {
    books: (parent, args) => {
      return books.filter((book) => book.author_id === parent.id)
    },
  },

  // MUTATION
  Mutation: {
    createAuthor: (parent, args) => args,
    createBook: (parent, args) => args,
  },
}

module.exports = resolvers
