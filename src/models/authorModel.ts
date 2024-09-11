import knex from '../config/database';

export default {
  // Get all authors
  async getAllAuthors() {
    return knex('authors').select('*');
  },

  // Get a single author by ID
  async getAuthorById(id: number) {
    return knex('authors').where({ id }).first();
  },

  // Create a new author
  async createAuthor(authorData: { name: string; bio?: string; birthdate: string }) {
    const [newAuthor] = await knex('authors')
      .insert(authorData)
      .returning('*');  // This returns the inserted row with all columns
    return newAuthor;
  },

  // Update an author by ID
  async updateAuthor(id: number, authorData: { name?: string; bio?: string; birthdate?: string }) {
    const [updatedAuthor] = await knex('authors')
      .where({ id })
      .update(authorData)
      .returning('*');  // This returns the updated row with all columns
    return updatedAuthor;
  },

  // Delete an author by ID
  async deleteAuthor(id: number) {
    return knex('authors').where({ id }).del();
  },
};
