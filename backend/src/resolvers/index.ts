import { booksData } from '../data/books';

export const resolvers = {
  Query: {
    books: (_: any, { offset, limit, searchTerm, readingLevel }: { offset: number; limit: number; searchTerm?: string; readingLevel?: string }) => {
      let filteredBooks = booksData;
  
      if (searchTerm) {
        filteredBooks = filteredBooks.filter(book =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
  
      if (readingLevel && readingLevel !== 'All Levels') {
        filteredBooks = filteredBooks.filter(book => book.readingLevel === readingLevel);
      }
  
      return filteredBooks.slice(offset, offset + limit);
    },
  },
};
