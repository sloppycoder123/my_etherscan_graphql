// Import Apollo Server to set up the GraphQL server
const { ApolloServer } = require("apollo-server"); 

// Import schema from the schema.graphql file
const { importSchema } = require("graphql-import");

// Import the data source for Ethereum data  
const EtherDataSource = require("./datasource/ethDatasource");

// Import the schema
const typeDefs = importSchema("./schema.graphql");

// Load environment variables from .env file
require("dotenv").config();

const resolvers = {
  Query: {
    // Get ether balance for an Ethereum address
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    // Get total ether supply
    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Get latest Ethereum price
    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Get Ethereum block confirmation time
    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});

// Set timeout to 0 to disable timeouts
server.timeout = 0;

// Start the server and log the URL when ready
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
