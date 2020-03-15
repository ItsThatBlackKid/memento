import Memento from './models/memento.js';
import User from './models/user.js'
import gql from "graphql-tag"
import {HttpLink} from "apollo-link-http";
import {execute, makePromise} from "apollo-link";
import fetch from "node-fetch"
import {isEmpty} from "lodash";

const uri = process.env.AUTH_URI + "/api" || "http://test-sheku.com:5000/api";


const GET_USER = gql`
    query {
        getUser {
            _id
            first_name
            last_name
            email
            createdAt
            updatedAt
        }
    }
`;

const VERIFY = gql`
    {
        verify
    }
`

const resolvers = {
    Query: {
        async allMemento(root, {}, {req}) {
            const {jwt, user_id} = req.cookies;

            const link = new HttpLink({
                uri,
                fetch,
                headers: {
                    'cookie': `jwt=${req.cookies.jwt}`
                },
                credentials: "include"
            });

            const {error, data} = await makePromise(execute(link, {query: VERIFY}));

            if (error) {
                throw  error
            }

            if (data.verify) {
                return await Memento.find({user: user_id})
            }

            return await Memento.find();
        },
        async getMemento(root, {_id}) {
            console.log(_id);
            console.log(await Memento.findById(_id));
            return await Memento.findById(_id)
        },
        async getUser(root, {}, {req, res}) {
            let user = await User.findById(req.cookies.user_id);
            console.log(user);

            if (isEmpty(user)) {
                console.log("no user");
                try {
                    const link = new HttpLink({
                        uri,
                        fetch,
                        headers: {
                            'cookie': `jwt=${req.cookies.jwt}`
                        },
                        credentials: "include"
                    });
                    const {errors, data} = await makePromise(execute(link, {query: GET_USER}));

                    if (errors) {
                        console.log(errors);
                        throw errors;
                    }
                    console.log(data.getUser);

                    user = data.getUser;
                    await User.create(user);
                    return user
                } catch (e) {
                    throw e;
                }
            }

            return user
        },
    },
    Mutation: {

        async createUser(root, {input}) {
            return await User.create(input);
        },
        async createMemento(root, {input}, {req}) {
            const {jwt, user_id} = req.cookies;

            const link = new HttpLink({
                uri,
                fetch,
                headers: {
                    'cookie': `jwt=${req.cookies.jwt}`
                },
                credentials: "include"
            });

            const {error, data} = await makePromise(execute(link, {query: VERIFY}));

            if(error) {
                throw error
            }

            if(data.verify) {
                return await Memento.create({user: user_id, ...input})
            }


            return await Memento.create(input);
        },

        async editMemento(root, {_id, input}) {
            console.log(input);
            return await Memento.findOneAndUpdate({_id}, input)
        },

        async editName(root, {_id, name}) {
            return await Memento.findOneAndUpdate({_id}, name)
        }
    }
}

export default resolvers