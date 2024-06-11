export const typeDefs = `#graphql
  type Book {
    id:Int
    title: String
    author: String
    coverPhotoURL: String
    readingLevel: String
  }

  type Query {
    books(offset: Int!, limit: Int!, searchTerm: String, readingLevel: String): [Book]
  }
`;
