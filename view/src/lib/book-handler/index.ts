"use server";
import { configProductDataLimit } from "@src/config";
import { EAuth } from "@src/types/common";
import axios from "axios";
import { cookies } from "next/headers";
import {
  IBook,
  IGetAllBookReturn,
  IGetIndividualBookByIdReturn,
} from "@src/types/lib/book-handler";

interface IGetAllBooks {
  currentPage: string;
  dataLimit: number;
  searchBy?: string;
  author_id?: string;
}

export async function getAllBooks({
  currentPage,
  dataLimit: limit,
  searchBy,
  author_id,
}: IGetAllBooks): Promise<IGetAllBookReturn> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(EAuth.AuthTokenCookieName);
    const url = `${process.env.SERVER_ORIGIN}/books?page=${
      currentPage || 1
    }&limit=${configProductDataLimit}&searchBy=${
      searchBy || ""
    }&author=${author_id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });
    if (response.status == 202) {
      const books: IBook[] = response.data.books;
      const currentPage: number = response.data.pagination.page;
      const totalPage = `${response.data.pagination.pageSize}`;
      if (books.length) {
        return {
          message: `${books.length} books found!!!`,
          status: 202,
          payload: {
            books,
            totalPage,
            currentPage,
          },
        };
      } else {
        return {
          message: `No author found!!!`,
          status: 404,
          payload: {
            books,
            totalPage,
            currentPage,
          },
        };
      }
    } else {
      return {
        message: `Some Things went wrong`,
        status: 500,
        payload: {
          books: [],
          totalPage: "0",
          currentPage: 0,
        },
      };
    }
  } catch (err) {
    console.log(err);
    return {
      message: `Some things went wrong into book data fetch`,
      status: 404,
      payload: {
        books: [],
        totalPage: "0",
        currentPage: 0,
      },
    };
  }
}

export async function getIndividualBookById(
  book_id: string
): Promise<IGetIndividualBookByIdReturn> {
  try {
    const url = `${process.env.SERVER_ORIGIN}/books/${book_id}`;
    const cookieStore = cookies();
    const token = cookieStore.get(EAuth.AuthTokenCookieName);
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });
    if (response.status == 202) {
      const book = response.data.book;
      return {
        message: `${book.name} has found!!!`,
        status: 202,
        payload: {
          book,
        },
      };
    } else {
      return {
        message: `No Author found`,
        status: 404,
        payload: {
          book: null,
        },
      };
    }
  } catch (err) {
    return {
      message: `Somethings went wrong`,
      status: 501,
      payload: {
        book: null,
      },
    };
  }
}
