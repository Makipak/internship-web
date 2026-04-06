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

---

## Production Deployment

### Server Requirements

- PHP 8.3 or higher
- Composer 2.x
- Node.js 18.x or higher
- MySQL 8.0+ or PostgreSQL 13+ (recommended for production)
- Nginx or Apache with mod_rewrite enabled
- SSL Certificate (Let's Encrypt recommended)

### Environment Configuration

1. Copy `.env.example` to `.env`
2. Update the following variables:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Database (use MySQL/PostgreSQL for production)
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=internship_db
DB_USERNAME=your_username
DB_PASSWORD=your_secure_password
```

3. Generate application key:
```bash
php artisan key:generate
```

### Deployment Steps

```bash
# 1. Install PHP dependencies (production only)
composer install --no-dev --optimize-autoloader

# 2. Install and build frontend assets
npm ci --production
npm run build

# 3. Run database migrations
php artisan migrate --force

# 4. Seed admin user
php artisan db:seed --class=UserSeeder

# 5. Create storage symlink
php artisan storage:link

# 6. Set proper permissions (Linux/macOS)
chmod -R 755 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

# 7. Cache configuration for better performance
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Default Admin Credentials

**⚠️ For development/initial setup only:**

- **Username:** `admin`
- **Password:** `password`

**IMPORTANT:** Change this password immediately after first login in production!

### Post-Deployment Checklist

- [ ] Verify HTTPS is working (SSL certificate installed)
- [ ] Test file upload functionality (PDF < 5MB)
- [ ] Change default admin password
- [ ] Test admin login and dashboard
- [ ] Test CSV export functionality
- [ ] Verify resume preview/download works
- [ ] Setup automated database backups
- [ ] Configure error monitoring (optional: Sentry, Bugsnag)
- [ ] Setup log rotation for `storage/logs/`

### Web Server Configuration

**Nginx Example:**

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/html/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }

    client_max_body_size 5M;
}
```

### Troubleshooting

**403 Error on Resume Preview:**
```bash
php artisan storage:link
```

**500 Internal Server Error:**
- Check `storage/logs/laravel.log` for details
- Ensure `storage/` and `bootstrap/cache/` are writable
- Verify `.env` configuration is correct

**Assets Not Loading:**
```bash
npm run build
php artisan config:clear
```

**Database Connection Error:**
- Verify database credentials in `.env`
- Ensure database exists and is accessible
- Check database server is running

### Security Recommendations

1. Always use HTTPS in production
2. Keep `APP_DEBUG=false` in production
3. Use strong database passwords
4. Regularly update dependencies: `composer update` and `npm update`
5. Setup automated backups for database and uploaded files
6. Monitor `storage/logs/` for errors
7. Use environment-specific `.env` files (never commit `.env` to git)

### Maintenance Mode

To enable maintenance mode during updates:

```bash
# Enable maintenance mode
php artisan down

# Perform updates...

# Disable maintenance mode
php artisan up
```
