import knex from '../config/database';

export default {
  // Get all books
  async getAllBooks() {
    return knex('books').select('*');
  },

  // Get a single book by ID
  async getBookById(id: number) {
    return knex('books').where({ id }).first();
  },

  // Get all books by a specific author
  async getBooksByAuthor(authorId: number) {
    return knex('books').where({ author_id: authorId });
  },

  // Create a new book
  async createBook(bookData: { title: string; description?: string; published_date: string; author_id: number }) {
    const [newBook] = await knex('books')
      .insert(bookData)
      .returning('*');  // This returns the inserted row with all columns
    return newBook;
  },

  // Update a book by ID
  async updateBook(id: number, bookData: { title?: string; description?: string; published_date?: string; author_id?: number }) {
    const [updatedBook] = await knex('books')
      .where({ id })
      .update(bookData)
      .returning('*');  // This returns the updated row with all columns
    return updatedBook;
  },

  // Delete a book by ID
  async deleteBook(id: number) {
    return knex('books').where({ id }).del();
  },
};
