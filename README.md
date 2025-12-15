# Library Manager APIs

>A simple RESTful API for managing library books, users, and book issuance built with Node.js, Express and MongoDB.

---

**Features**
- CRUD operations for books (protected — Librarian role required for create/update/delete)
- User registration & login (JWT authentication)
- Issue and return books (Librarian)
- Rate limiting and basic security headers via `express-rate-limit` and `helmet`

**Tech Stack**
- Node.js + Express
- MongoDB (Mongoose)
- JWT for authentication
- bcryptjs for password hashing

---

**Getting Started**

Prerequisites
- Node.js (>= 18 recommended)
- MongoDB (cloud-hosted or local)

Installation

```bash
git clone <repo-url>
cd library-manager-apis
npm install
```

Create a `.env` file at the repo root with the following variables:

- `mongoURI` — MongoDB connection string
- `JWT_secrets` — secret to sign JWT tokens
- `PORT` (optional) — server port (defaults to 3000)

Run the server (development):

```bash
npm run dev
```

The server exposes a simple health-check at `GET /health`.

---

**API Reference**

Base URL: `http://localhost:3000` (or `http://localhost:$PORT`)

Authentication: JWT token must be sent in the `token` header (e.g., `token: <jwt>`).

Users
- `GET /api/v1/users` — list all users
- `POST /api/v1/users/register` — register a user
  - Body: `{ name, username, email, password, role }` — `role` is `Librarian` or `Student`
- `POST /api/v1/users/login` — login
  - Body: `{ username, password }` — returns `{ token }`
- `GET /api/v1/users/profile` — get profile (requires `token` header)

Books
- `GET /api/v1/books` — list books
- `GET /api/v1/books/:id` — get book by id
- `POST /api/v1/books` — create book (requires `token`, Librarian)
  - Body: `{ name, author, publishedYear, price, quantity, availability }`
- `PUT /api/v1/books/:id` — update book (requires `token`, Librarian)
- `DELETE /api/v1/books/:id` — delete book (requires `token`, Librarian)

Issue Books
- `GET /api/v1/issue-book` — list issued book records
- `POST /api/v1/issue-book` — issue a book (requires `token`, Librarian)
  - Body: `{ bookId, studentId, issueDate, returnDate }`
- `PUT /api/v1/issue-book/:id` — return issued book (requires `token`, Librarian)

Notes
- Only users with role `Librarian` can create/update/delete books and issue/return books.
- Token is expected in the `token` header (not `Authorization`).

---

Example Requests

Register

```bash
curl -X POST http://localhost:3000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","username":"alice01","email":"alice@example.com","password":"secret","role":"Librarian"}'
```

Login

```bash
curl -X POST http://localhost:3000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice01","password":"secret"}'
```

Create a book (replace `<token>`)

```bash
curl -X POST http://localhost:3000/api/v1/books \
  -H "Content-Type: application/json" \
  -H "token: <token>" \
  -d '{"name":"The Hobbit","author":"J.R.R. Tolkien","publishedYear":1937,"price":12.99,"quantity":5,"availability":true}'
```

---

**Project Structure (high level)**
- `server.js` — app entrypoint and route mounting
- `src/routes` — route definitions
- `src/controllers` — request handlers
- `src/models` — Mongoose schemas
- `src/middleware` — auth & security middlewares

---

Contributing

PRs are welcome. Please open an issue first if you want to discuss a non-trivial change.

---

License

This project is provided under the ISC license (see `package.json`).

---

If you'd like, I can add Postman examples, an OpenAPI spec, or a small seed script next.
