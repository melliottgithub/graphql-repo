const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const PORT = 4000;

const { schema, root } = require("./schema/schema");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
