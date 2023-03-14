const { buildSchema } = require("graphql");
const { users, posts, hobbies } = require("../data");

// Define the schema
const schema = buildSchema(`
  type User {
    id: ID
    firstName: String
    age: Int
    lastName: String
    posts: [Post]
    hobbies: [Hobby]
  }

  type Post {
    id: ID
    comment: String
    user: User
  }

  type Hobby {
    id: ID
    title: String
    description: String
    user: User
  }

  type Query {
    user(id: ID): User
    hobby(id: ID): Hobby
    post(id: ID): Post
    users: [User]
    hobbies: [Hobby]
    posts: [Post]
  }

  type Mutation {
    createUser(firstName: String, age: Int, lastName: String): User
    createPost(comment: String, userId: ID): Post
    createHobby(title: String, description: String, userId: ID): Hobby
  }
`);

const root = {
  user: (args) => users.find((user) => user.id === args.id),
  hobby: (args) => hobbies.find((hobby) => hobby.id === args.id),
  post: (args) => posts.find((post) => post.id === args.id),
  users: () => users,
  hobbies: () => hobbies,
  posts: () => posts,
  createUser: (args) => {
    const user = {
      id: String(users.length + 1),
      firstName: args.firstName,
      age: args.age,
      lastName: args.lastName,
    };
    users.push(user);
    return user;
  },
  createPost: (args) => {
    const post = {
      id: String(posts.length + 1),
      comment: args.comment,
      userId: args.userId,
    };
    posts.push(post);
    return post;
  },
  createHobby: (args) => {
    const hobby = {
      id: String(hobbies.length + 1),
      title: args.title,
      description: args.description,
      userId: args.userId,
    };
    hobbies.push(hobby);
    return hobby;
  },
  User: {
    posts: (user) => posts.filter((post) => post.userId === user.id),
    hobbies: (user) => hobbies.filter((hobby) => hobby.userId === user.id),
  },
  Post: {
    user: (post) => users.find((user) => user.id === post.userId),
  },
  Hobby: {
    user: (hobby) => users.find((user) => user.id === hobby.userId),
  },
};

module.exports = { schema, root };

// Run the queries
// graphql(
//   schema,
//   `
//     {
//       user(id: "1") {
//         id
//         firstName
//         age
//         lastName
//         posts {
//           id
//           comment
//         }
//         hobbies {
//           id
//           title
//         }
//       }
//     }
//   `,
//   root
// ).then((response) => {
//   console.log(response);
// // });

// graphql(
//   schema,
//   `
//     mutation {
//       createPost(comment: "This is a new post", userId: "3") {
//         id
//         comment
//         user {
//           firstName
//           lastName
//         }
//       }
//     }
//   `,
//   root
// ).then((response) => {
//   console.log(response);
// });
