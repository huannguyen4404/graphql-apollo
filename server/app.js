const express = require('express')
const { ApolloServer } = require('apollo-server-express')

const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')

const app = express()

let apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
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
