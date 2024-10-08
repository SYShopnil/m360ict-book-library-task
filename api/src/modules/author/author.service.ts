import knex from '../../config/database';
import { IRegisterAuthor } from '../../type/author_type';
import { IAuthor } from '../../type/entity';
import {
  IGetAllAuthors,
  IRGetAuthorByEmail,
  IRGetAuthorById,
} from './types/author.type.service';

export default {
  async getAllAuthors(
    page?: number,
    limit?: number,
    name?: string,
  ): Promise<IGetAllAuthors> {
    const offset = ((page || 1) - 1) * (limit || 10);

    const query = knex('authors')
      .select(['name', 'bio', 'birthdate', 'email', 'id'])
      .modify((qb) => {
        if (name) {
          qb.whereRaw('LOWER(name) LIKE ?', [`%${name.toLowerCase()}%`]); // Case-insensitive search
        }
      })
      .modify((qb) => {
        if (page || limit) {
          qb.limit(limit || 10);
          qb.offset(offset);
        }
      });
    const totalResult = await knex('authors')
      .count('* as count')
      .modify((qb) => {
        if (name) {
          qb.whereRaw('LOWER(name) LIKE ?', [`%${name.toLowerCase()}%`]); // Case-insensitive count
        }
      })
      .first();

    const total = totalResult.count;
    const totalPages = Math.ceil(total / (limit || 10));

    const authors = await query;

    return {
      authors,
      total,
      totalPages,
    };
  },

  async getAuthorById(id: number): Promise<IRGetAuthorById | null> {
    const author = await knex('authors')
      .where({ id })
      .first()
      .select('name', 'bio', 'birthdate', 'email', 'id');

    return author || null; // Returns either the author or null if not found
  },

  async getAuthorByEmail(email: string): Promise<IRGetAuthorByEmail | null> {
    const author = knex('authors').where({ email }).first();
    return author || null;
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

  async deleteAuthor(id: number): Promise<number> {
    return await knex('authors').where({ id }).del();
  },

  async createMultipleAuthors(authorsData: IRegisterAuthor[]): Promise<any> {
    try {
      const newAuthors = await knex('authors')
        .insert(authorsData)
        .returning('*'); // This returns the inserted rows with all columns
      if (newAuthors) {
        return {
          message: 'Authors successfully registered',
          authors: newAuthors,
          err: null,
        };
      } else {
        return {
          message: 'Author registration failed',
          authors: null,
          err: null,
        };
      }
    } catch (err) {
      console.log(err);
      return {
        message: 'Something went wrong',
        authors: null,
        err: err,
      };
    }
  },
};
