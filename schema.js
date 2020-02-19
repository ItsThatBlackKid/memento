import {makeExecutableSchema} from 'graphql-tools';
import {resolvers} from './resolvers';
import {gql} from "apollo-server-express"

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        first_name: String
        last_name: String
        email: String!
        mementos: [Memento]
        createdAt: Date
        updatedAt: Date
    }

    type Memento {
        _id: ID!
        user: User
        title: String!
        date: Date!
        content: String!
        mood: Float!
    }

    scalar Date

    type Query {
        allMemento: [Memento]
        getMemento(_id: ID!): Memento
        getUser: User

    }

    input UserInput {
        name: String!
        email: String!
        hash: String!
    }

    input MementoInput {
        user: ID
        title: String!
        content: String!
        mood: Float!
    }

    type Mutation {
        createUser(input: UserInput): User
        createMemento(input: MementoInput): Memento
        editMemento (_id: ID!, input: MementoInput): Memento
        editName(userId: ID!, name: String!): User
    }
`;


export default typeDefs;