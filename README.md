# Internship Application Web

A web-based internship registration system built with **Laravel 12**, **React 19**, and **Inertia.js**. Applicants can submit their information and upload a resume (PDF), while administrators can view, manage, and export all incoming applications through a dedicated dashboard.

---

## Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Backend    | Laravel 12, PHP 8.3+                    |
| Frontend   | React 19, TypeScript, Tailwind CSS v4   |
| Bridge     | Inertia.js v2                           |
| Bundler    | Vite 7                                  |
| Database   | SQLite (default)                        |
| Auth       | Laravel Fortify                         |

---

## Features

- Public internship application form with PDF resume upload
- Admin dashboard to view, sort, and paginate applications
- Resume preview and download per applicant
- Delete application entries
- Export all applications as CSV
- Secure admin login

---

## Requirements

Before starting, make sure the following are installed on your machine.

| Tool      | Minimum Version |
|-----------|-----------------|
| PHP       | 8.3             |
| Composer  | 2.x             |
| Node.js   | 18.x or higher  |
| npm       | 9.x or higher   |
| Git       | any             |

---

## Installation

### Linux

```bash
# 1. Clone the repository
git clone <repository-url> internship-web
cd internship-web

# 2. Install PHP dependencies
composer install

# 3. Copy the environment file and generate app key
cp .env.example .env
php artisan key:generate

# 4. Create the SQLite database file
touch database/database.sqlite

# 5. Run migrations and seed the database
php artisan migrate --seed

# 6. Create the storage symlink (required for PDF preview)
php artisan storage:link

# 7. Install Node dependencies
npm install

# 8. Start the development server
npm run dev
```

Open a second terminal and run:

```bash
php artisan serve
```

The application will be available at `http://localhost:8000`.

---

### macOS

```bash
# 1. Clone the repository
git clone <repository-url> internship-web
cd internship-web

# 2. Install PHP dependencies
composer install

# 3. Copy the environment file and generate app key
cp .env.example .env
php artisan key:generate

# 4. Create the SQLite database file
touch database/database.sqlite

# 5. Run migrations and seed the database
php artisan migrate --seed

# 6. Create the storage symlink (required for PDF preview)
php artisan storage:link

# 7. Install Node dependencies
npm install

# 8. Start the development server
npm run dev
```

Open a second terminal and run:

```bash
php artisan serve
```

The application will be available at `http://localhost:8000`.

> If you use Herd or Valet, point the site to the `public/` directory instead of running `php artisan serve`.

---

### Windows

Open **Command Prompt** or **PowerShell** and run the following steps.

```powershell
# 1. Clone the repository
git clone <repository-url> internship-web
cd internship-web

# 2. Install PHP dependencies
composer install

# 3. Copy the environment file and generate app key
copy .env.example .env
php artisan key:generate

# 4. Create the SQLite database file
echo. > database\database.sqlite

# 5. Run migrations and seed the database
php artisan migrate --seed

# 6. Create the storage symlink (required for PDF preview)
#    Run this command as Administrator
php artisan storage:link

# 7. Install Node dependencies
npm install

# 8. Start the frontend dev server
npm run dev
```

Open a second terminal and run:

```powershell
php artisan serve
```

The application will be available at `http://localhost:8000`.

> On Windows, `php artisan storage:link` creates a symlink and may require running PowerShell or Command Prompt as **Administrator**.

---

## Useful Commands

| Command                        | Description                                    |
|--------------------------------|------------------------------------------------|
| `php artisan serve`            | Start the PHP development server               |
| `npm run dev`                  | Start the Vite frontend dev server             |
| `php artisan migrate`          | Run database migrations                        |
| `php artisan migrate:fresh --seed` | Reset the database and re-seed           |
| `php artisan storage:link`     | Create the public storage symlink (run once)   |
| `npm run build`                | Build the frontend for production              |
| `php artisan tinker`           | Open the Laravel REPL                          |

---

## Notes

- **PDF Preview (403 Error):** If the resume preview returns a 403 error, run `php artisan storage:link`. This must be run once on every machine where the project is set up.
- **Same Filename Upload:** The application handles re-uploading a file with the same name correctly.
- **Database:** The project uses SQLite by default. No additional database setup is required. If you prefer MySQL or PostgreSQL, update the `DB_*` variables in your `.env` file accordingly.
