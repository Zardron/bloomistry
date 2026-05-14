# Bloomistry Website

Bloomistry is a full-stack flower catalog website for Alaine's Craft. It includes a public storefront, a mobile-friendly admin panel, database-backed flower categories, featured flowers, customer photos, image uploads, and JWT-protected admin management.

Live site: [https://bloomistry.vercel.app](https://bloomistry.vercel.app)

## Features

- Public Bloomistry landing page with featured flowers, categories, flower gallery, and customer moments
- Database-backed catalog using MongoDB
- Custom flower categories: Custom, Graduation, Small, Medium, Large, and XL
- Admin panel for managing flowers, categories, featured flowers, and customer photos
- Mobile-responsive admin layout for managing the website from a phone
- Image upload support for flower and customer photos
- JWT authentication with secure HTTP-only cookies
- Protected API routes for create, update, and delete actions
- Split workspace architecture for frontend and backend development

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js App Router, React, TypeScript, Tailwind CSS |
| Backend | Node.js, Express, ES Modules |
| Database | MongoDB with Mongoose |
| Auth | JWT, bcrypt, cookie-based sessions |
| Uploads | Multer |
| Deployment | Vercel for the client |

## Project Structure

```text
bloomistry-website/
├── client/                 # Next.js storefront and admin panel
│   ├── app/                # App Router pages, assets, and admin UI
│   └── src/                # Client API helpers and shared types
├── server/                 # Express API
│   └── src/
│       ├── controllers/    # Request handlers
│       ├── models/         # Mongoose models
│       ├── routes/         # API routes
│       ├── scripts/        # Database seed scripts
│       ├── services/       # Business logic
│       └── validations/    # Request validation schemas
└── package.json            # Root workspace scripts
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment files

```bash
cp client/.env.example client/.env.local
cp server/.env.example server/.env
```

### 3. Configure the client

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

### 4. Configure the server

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/bloomistry
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
JWT_COOKIE_NAME=bloomistry_token
BLOOMISTRY_ADMIN_PASSWORD=replace-with-admin-password
CLIENT_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:3000
UPLOAD_DIR=uploads
MAX_FILE_SIZE_MB=5
RATE_LIMIT_WINDOW_MINUTES=15
RATE_LIMIT_MAX=300
```

Use a strong `JWT_SECRET` and never commit real secrets to the repository.

## Development

Run the frontend:

```bash
npm run dev:client
```

Run the API:

```bash
npm run dev:server
```

Run both together:

```bash
npm run dev:full
```

Local URLs:

- Storefront: [http://localhost:3000](http://localhost:3000)
- Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)
- API: [http://localhost:5000/api/v1](http://localhost:5000/api/v1)

## Database Seeds

Seed the flower categories, flowers, and customer photos:

```bash
npm run seed:catalog --workspace server
```

Create or update the admin accounts:

```bash
BLOOMISTRY_ADMIN_PASSWORD="your-admin-password" \
npm run seed:admin --workspace server
```

The admin seed creates accounts for:

- `alaine@bloomistry.com`
- `zardron@bloomistry.com`

## Admin Panel

The admin panel can manage:

- Flowers
- Categories and category price labels
- Featured flower selection
- Customer photos

Admin write actions require an authenticated admin account. The layout is responsive, so catalog updates can be managed from desktop or mobile.

## Useful Scripts

| Command | Description |
| --- | --- |
| `npm run dev:client` | Start the Next.js development server |
| `npm run dev:server` | Start the Express API server |
| `npm run dev:full` | Start frontend and backend together |
| `npm run build` | Build the Next.js client |
| `npm run lint` | Lint all workspaces |
| `npm run seed:catalog --workspace server` | Seed catalog data |
| `npm run seed:admin --workspace server` | Seed admin users |

## API Overview

Core routes:

- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `POST /api/v1/auth/logout`
- `GET /api/v1/categories`
- `POST /api/v1/categories`
- `PATCH /api/v1/categories/:id`
- `DELETE /api/v1/categories/:id`
- `GET /api/v1/flowers`
- `POST /api/v1/flowers`
- `PATCH /api/v1/flowers/:id`
- `DELETE /api/v1/flowers/:id`
- `GET /api/v1/customers`
- `POST /api/v1/customers`
- `PATCH /api/v1/customers/:id`
- `DELETE /api/v1/customers/:id`

Protected write routes require an admin or editor JWT. Delete routes require the `admin` role.

## Deployment Notes

The client is configured for Vercel deployment. For production, configure:

- `NEXT_PUBLIC_API_URL` in the Vercel project environment variables
- Server hosting with the same MongoDB database
- CORS settings so the production client can call the API
- Persistent upload storage if the API is deployed separately

## Repository Notes

- Keep `.env` and `.env.local` files private.
- Do not commit real passwords, database URIs, JWT secrets, or API tokens.
- Run lint and build checks before deploying production changes.

