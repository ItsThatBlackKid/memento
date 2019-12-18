import {makeExecutableSchema} from 'graphql-tools';
import {resolvers} from './resolvers';

const typeDefs = `
    type User {
        _id: ID!
        name: String!
        email: String!
        hash: String!
        mementos: [Memento]
    }

    type Memento {
        _id: ID!
        user: User
        title: String!
        date: Date
        content: String!
        mood: String
    }

    scalar Date 

    type Query {
        allMemento: [Memento]
        getMemento(_id: ID!): Memento
        getUser(_id: ID!): User
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
        mood: String
    }

    type Mutation {
        createUser(input: UserInput): User
        createMemento(input: MementoInput): Memento
        editMood (_id: ID!, mood: String!): Memento
        editName(userId: ID!, name: String!): User
    }
    `;

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers
    });

    export default schema;