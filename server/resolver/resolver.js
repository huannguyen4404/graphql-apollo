const mongoDataMethods = require('../data/db')
const Author = require('../models/Author')
const Book = require('../models/Book')

const resolvers = {
  // QUERY
  Query: {
    books: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.getAllBooks()
    },
    book: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.getBookDetail(args.id)
    },
    authors: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.getAllAuthors()
    },
    author: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.getAuthorInfo(args.id)
    },
  },

  Book: {
    author: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.getAuthorInfo(parent.author_id)
    },
  },

  Author: {
    books: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.getAllBooks({ author_id: parent.id })
    },
  },

  // MUTATION
  Mutation: {
    createAuthor: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.createAuthor(args)
    },
    createBook: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.createBook(args)
    },
  },
}

module.exports = resolvers
