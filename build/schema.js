"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTools = require("graphql-tools");

var _resolvers = require("./resolvers");

var _apolloServerExpress = require("apollo-server-express");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    type User {\n        _id: ID!\n        username: String\n        first_name: String\n        last_name: String\n        email: String!\n        mementos: [Memento]\n        createdAt: Date\n        updatedAt: Date\n    }\n\n    type Memento {\n        _id: ID!\n        user: User\n        title: String!\n        date: Date!\n        content: String!\n        mood: Float!\n    }\n\n    scalar Date\n\n    type Query {\n        allMemento: [Memento]\n        getMemento(_id: ID!): Memento\n        getUser: User\n\n    }\n\n    input UserInput {\n        name: String!\n        email: String!\n        hash: String!\n    }\n\n    input MementoInput {\n        user: ID\n        title: String!\n        content: String!\n        mood: Float!\n        date: Date\n    }\n\n    type Mutation {\n        createUser(input: UserInput): User\n        createMemento(input: MementoInput): Memento\n        editMemento (_id: ID!, input: MementoInput): Memento\n        editName(userId: ID!, name: String!): User\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var typeDefs = (0, _apolloServerExpress.gql)(_templateObject());
var _default = typeDefs;
exports.default = _default;