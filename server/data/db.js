const Book = require('../models/Book')
const Author = require('../models/Author')

const mongoDataMethods = {
  getAllBooks: async (condition = null) =>
    condition ? await Book.find(condition) : await Book.find(),
  getAllAuthors: async () => await Author.find(),
  createAuthor: async (args) => {
    const newAuthor = new Author(args)
    return await newAuthor.save()
  },
  createBook: async (args) => {
    const newBook = new Book(args)
    return await newBook.save()
  },
  getBookDetail: async (id) => await Book.findById(id),
  getAuthorInfo: async (id) => await Author.findById(id),
}

module.exports = mongoDataMethods
