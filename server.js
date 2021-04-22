const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
// const {getData, postData} = require('./helpers');

const typeDefs = gql`
  type Email {
    sender:       String!
    receiver:     String!
    status:  Int!
  }
#   type Query {
#     getEmail(name: String!): Email
#     emails(name: String): [Email]
#   }
  type Mutation {
    addEmail(name: String!, status: Int!): Email
  }
`;
const postData = async (url, body) => {
    try {
        const res = await fetch(url, {
            method: 'post',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        });
        const json = await res.json();
        if(isHTTPError(res.status)) {
            throw new ApolloError(json, "http-status-error", {statusCode: res.status, error: json});
        }
        console.log(json);
        return json;
    } catch (error) {
        console.log(JSON.stringify(error));
        throw error;
    }
};

// replace with actual REST endpoint
const restAPIEndpoint = 'http://192.168.10.12:4000/';

const resolvers = {
    // Query: {
    //     getUser: async (_, { id }) => {
    //         return await getData(restAPIEndpoint + '/users/' + id);
    //     },

    //     users: async (_, { name }) => {
    //         var nameParams = '';
    //         if (name) {
    //             nameParams = '?name=' + name;
    //         }
    //         return await getData(restAPIEndpoint + '/users' + nameParams );
    //     }
    // },

    Mutation: {
        addUser: async (_, { name, status } ) => {
            return await postData(restAPIEndpoint + '/sendemail', { name, status } );
        }
    }
};

const schema = new ApolloServer({ typeDefs, resolvers });

schema.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`schema ready at ${url}`);
});