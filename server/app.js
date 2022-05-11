const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')

const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')

const mongoDataMethods = require('./data/db')

const connectDB = async () => {
  try {
    const username = ''
    const password = ''
    const dbName = 'apollo-graph'
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@cluster0.6os6h.mongodb.net/${dbName}?retryWrites=true&w=majority`,
      {
        //
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
        autoIndex: false, // Don't build indexes
      }
    )

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}
connectDB()

const app = express()

let apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ mongoDataMethods }),
})

const startApolloServer = async () => {
  await apolloServer.start()
  apolloServer.applyMiddleware({ app })
}

startApolloServer()
app.listen({ port: 4000 }, () => {
  console.log(
    `Server ready at http://localhost:4000${apolloServer.graphqlPath}`
  )
})
