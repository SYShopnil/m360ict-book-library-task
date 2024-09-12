import knex from '../../config/database';
import { IBook } from '../../type/entity';
import {
  GetBooksOptions,
  IRGetBookById,
  IRGetBooksByAuthor,
} from './types/books.type.service';

export default {
  // Get all books
  async getBooks({ page, pageSize, title, author }: GetBooksOptions) {
    const offset = (page - 1) * pageSize;

    const query = knex('books')
      .leftJoin('authors', 'books.author_id', 'authors.id')
      .select(
        'books.*',
        'authors.name as author_name',
        'authors.bio as authors_bio',
      )
      .modify((queryBuilder) => {
        if (title) {
          queryBuilder.whereRaw('LOWER(books.title) LIKE ?', [
            `%${title.toLowerCase()}%`,
          ]);
        }
      })
      .modify((queryBuilder) => {
        if (author) {
          queryBuilder.where({ author_id: author });
        }
      })
      .offset(offset)
      .limit(pageSize);

    // Get total count of records (for pagination purposes)
    const [totalCountResult] = await knex('books')
      .modify((queryBuilder) => {
        if (title) {
          queryBuilder.whereRaw('LOWER(books.title) LIKE ?', [
            `%${title.toLowerCase()}%`,
          ]);
        }
      })
      .modify((queryBuilder) => {
        if (author) {
          queryBuilder.where({ author_id: author });
        }
      })
      .count('id as totalCount');

    const books = await query;
    return { books, totalCount: totalCountResult.totalCount };
  },

  // Get a single book by ID
  async getBookById(id: number): Promise<IRGetBookById | null> {
    const book = knex('books').where({ id }).first();
    return book || null;
  },

  // Get all books by a specific author
  async getBooksByAuthor(
    authorId: number,
  ): Promise<IRGetBooksByAuthor[] | null> {
    const books = knex('books')
      .where({ author_id: authorId })
      .leftJoin('author', 'books.author_id', 'author.id')
      .select(
        'books.*',
        'authors.name as author_name',
        'authors.bio as authors_bio',
      );
    return books || null;
  },

  // Create a new book
  async createBook(bookData: {
    title: string;
    description?: string;
    published_date: string;
    author_id: number;
  }) {
    const [newBook] = await knex('books').insert(bookData).returning('*'); // This returns the inserted row with all columns
    return newBook;
  },

  async createMultipleBook(booksData: IBook[]) {
    const newBookList = await knex('books').insert(booksData).returning('*');
    return newBookList;
  },

  // Update a book by ID
  async updateBook(id: number, bookData: IBook) {
    const [updatedBook] = await knex('books')
      .where({ id })
      .update(bookData)
      .returning('*'); // This returns the updated row with all columns
    return updatedBook;
  },

  // Delete a book by ID
  async deleteBook(id: number) {
    return knex('books').where({ id }).del();
  },
};
