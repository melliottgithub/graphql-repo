
// Dummy data
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

  module.exports = { users, hobbies, posts };