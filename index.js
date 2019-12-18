import express from "express";
import graphlHTTP from "express-graphql";
import mongoose from "mongoose";
import schema from "./schema";

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/memento_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express();
const PORT = 4300;

app.get("/", (req,res) => {
    res.json({
        message: "Memento API v1"
    });
});

app.use("/graphql", graphlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log(`Seerver is listening on PORT ${PORT}`);
});