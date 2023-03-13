const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const PORT = 4000;

const schema = require("./schema/schema");

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
