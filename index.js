import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import {ApolloServer} from "apollo-server-express";
import cookieParser from 'cookie-parser'
import resolvers from './resolvers';
import typeDefs from "./schema";

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/memento", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const server = new ApolloServer( {
    typeDefs,
    resolvers,
    context: (ctx) => ({
        ...ctx
    }),
    playground: {
        settings: {
            "request.credentials": "include"
        }
    },
    formatError: error => {
        const params = {
            name: error.name,
            message: error.message,
            locations: error.locations,
            stack: error.stack
        }

        console.log(error.message);
        return (params);
    }
});

const app = express();
const PORT = 4300;

const errorHandler = (err,req,res,next) => {
    console.log('reached');
    console.log(err.stack);
    res.status(500);
};

app.use(cookieParser());
app.use(morgan('combined'));
app.use(express.json());
app.use(cors());
server.applyMiddleware({
    app,
    path: '/graphql',
    cors: false
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});