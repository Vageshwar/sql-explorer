# SQL Explorer

A browser-based SQL query tool built with Node.js, Express, and SQLite (via sql.js). Comes pre-loaded with a school database schema and seed data.

## Schema

| Table | Description |
|---|---|
| `School` | Top-level schools |
| `Department` | Departments belonging to a school |
| `Lecturer` | Lecturers assigned to a department |
| `Course` | Courses taught by a lecturer |
| `Student` | Enrolled students |
| `Bookings` | Course bookings made by students |

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (bundled with Node.js)

## Setup & Run

```bash
# 1. Clone the repo
git clone https://github.com/Vageshwar/sql-explorer.git
cd sql-explorer

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

Then open your browser at **http://localhost:3000**

The database is initialised in-memory automatically on startup — no separate seed step needed.

## Usage

- **Sidebar** — lists all tables with their columns; click any table to run a quick `SELECT * ... LIMIT 50`
- **Preset buttons** — one-click queries for common operations (salary costs, bookings by gender, clashing bookings, etc.)
- **Query editor** — write any SQL query; press **Ctrl+Enter** or click **Run**
- **Results panel** — displays rows, column headers, row count, and query time

## Project Structure

```
sql-explorer/
├── server.js        # Express server + sql.js DB init + seed data + API routes
├── seed.js          # Standalone seed script (optional, not required for startup)
├── public/
│   └── index.html   # Frontend UI (single-page, no build step)
├── package.json
└── .gitignore
```

## API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tables` | Returns all table names and their columns |
| `POST` | `/api/query` | Runs a SQL query; body: `{ "sql": "SELECT ..." }` |
