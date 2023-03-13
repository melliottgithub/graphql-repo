const graphql = require("graphql");

//dummy data
const users = [
  { id: "1", firstName: "John", age: 25, lastName: "Doe" },
  { id: "2", firstName: "Jane", age: 24, lastName: "Doe" },
  { id: "3", firstName: "Jack", age: 23, lastName: "Doe" },
  { id: "4", firstName: "Jill", age: 22, lastName: "Doe" },
  { id: "5", firstName: "Jenny", age: 21, lastName: "Doe" },
];

const hobbies = [
  { id: "1", title: "Sports", description: "Playing sports", userId: "1" },
  { id: "2", title: "Music", description: "Playing music", userId: "2" },
  { id: "3", title: "Cooking", description: "Cooking food", userId: "3" },
  { id: "4", title: "Reading", description: "Reading books", userId: "4" },
  { id: "5", title: "Writing", description: "Writing books", userId: "5" },
];

const posts = [
  { id: "1", comment: "This is a comment from 1", userId: "1" },
  { id: "2", comment: "This is a comment from 1", userId: "1" },
  { id: "3", comment: "This is a comment from 2", userId: "2" },
  { id: "4", comment: "This is a comment from 5", userId: "5" },
  { id: "5", comment: "This is a comment from 1", userId: "1" },
];

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

//create types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user...",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    lastName: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return posts.filter((post) => post.userId === parent.id);
      },
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return hobbies.filter((hobby) => hobby.userId === parent.id);
      },
    },
  }),
});

const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Description: this is a hobby",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return users.find((user) => user.id === parent.userId);
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Description: this is a post",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return users.find((user) => user.id === parent.userId);
      },
    },
  }),
});

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description: this is a user",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db / other source
        const user = users.find((user) => user.id === args.id);
        return user;
      },
    },

    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db / other source
        const hobby = hobbies.find((hobby) => hobby.id === args.id);
        return hobby;
      },
    },

    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db / other source
        const post = posts.find((post) => post.id === args.id);
        return post;
      },
    },

    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return users;
      },
    },

    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return hobbies;
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return posts;
      },
    },
  },
});

//Mutations

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        lastName: { type: GraphQLString },
      },
      resolve(parent, args) {
        const user = {
          //   id: users.length + 1,
          firstName: args.firstName,
          age: args.age,
          lastName: args.lastName,
        };
        users.push(user);
        return user;
      },
    },
    createPost: {
      type: PostType,
      args: {
        comment: { type: GraphQLString },
        userId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const post = {
          // id: posts.length + 1,
          comment: args.comment,
          userId: args.userId,
        };
        posts.push(post);
        return post;
      },
    },
    createHobby: {
      type: HobbyType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const hobby = {
          // id: hobbies.length + 1,
          title: args.title,
          description: args.description,
          userId: args.userId,
        };
        hobbies.push(hobby);
        return hobby;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
