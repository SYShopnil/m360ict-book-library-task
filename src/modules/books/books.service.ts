import knex from '../../config/database';
import { IBook } from '../../type/entity';

interface GetBooksOptions {
  page: number;
  pageSize: number;
  title?: string;
  author?: string;
}

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
  async getBookById(id: number) {
    return knex('books').where({ id }).first();
  },

  // Get all books by a specific author
  async getBooksByAuthor(authorId: number) {
    return knex('books')
      .where({ author_id: authorId })
      .leftJoin('author', 'books.author_id', 'author.id')
      .select(
        'books.*',
        'authors.name as author_name',
        'authors.bio as authors_bio',
      );
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
