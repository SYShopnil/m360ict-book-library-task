# Air Quality Managemnet

This is an air Quality report base web application

## Key Technologies

**Client-Side:** Next js, Redux, TailwindCSS

**Server-Side:** Node JS, Express JS

**Database:** Postgresql (with Knex)

**Language:** TypeScript

**Text Formation**: ESLint and Prettier

## Key Roles

- Author

## Key Features

- Full login system with JWT token.
- Author can create book including update and delete
- Author can see all book with search and pagination
- Author can see all other author with search and pagination

## Run Locally

Clone the project

```bash
  git clone https://github.com/SYShopnil/m360ict-book-library-task.git
```

Go to the project directory

```bash
  cd
  m360ict-book-library-task
```

```bash
  cd
  api
```

Install dependencies

```bash
  npm install || npm i
```

Migrate Database

```bash
  npm run migrate:latest
```

Start the server

```bash
  npm run dev
```

Put some random author data for test. Hit this EndPoint

```bash
  http//localhost:<PORT>/api/v1/test/author/insert
```

Put some random book data for test. Hit this EndPoint

```bash
  http//localhost:<PORT>/api/v1/test/book/insert
```

For all demo dummy author Password is:

```bash
  author123
```

## Support

For support, sadmanishopnil@gmail.com
