import knex from '../config/database';
import { IRegisterAuthor } from '../type/author_type';
import { IAuthor } from '../type/entity';

const authorSelectField = ['name', 'bio', 'birthdate', 'email', 'id'];

export default {
  async getAllAuthors() {
    const authorSelectedFields = ['name', 'bio', 'birthdate', 'email', 'id'];
    return knex('authors').select(authorSelectedFields);
  },

  async getAuthorById(id: number) {
    return knex('authors')
      .where({ id })
      .first()
      .select('name', 'bio', 'birthdate', 'email', 'id');
  },

  async getAuthorByEmail(email: string) {
    return knex('authors').where({ email }).first();
  },

  async createAuthor(authorData: IRegisterAuthor) {
    try {
      const [newAuthor] = await knex('authors')
        .insert(authorData)
        .returning('*'); // This returns the inserted row with all columns
      if (newAuthor) {
        return {
          message: 'New Author Successfully Registered',
          author: newAuthor,
          err: null,
        };
      } else {
        return {
          message: 'New Author Registration failed',
          author: null,
          err: null,
        };
      }
    } catch (err) {
      console.log(err);
      return {
        message: 'Some thing went wrong',
        author: null,
        err: err,
      };
    }
  },

  async updateAuthorById(id: number, authorData: IAuthor) {
    try {
      const [updatedAuthor] = await knex('authors')
        .where({ id })
        .update(authorData)
        .returning('*');
      return updatedAuthor;
    } catch (err) {
      return err;
    }
  },

  // Delete an author by ID
  async deleteAuthor(id: number): Promise<number> {
    return await knex('authors').where({ id }).del();
  },
};
