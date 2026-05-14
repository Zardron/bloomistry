# Bloomistry Website

Production-oriented full-stack Bloomistry architecture using a split workspace:

- `client/` - Next.js App Router frontend and admin panel
- `server/` - Node.js ES Modules API with Express, MongoDB, JWT auth, validation, uploads, and layered modules

## Setup

```bash
npm install
cp client/.env.example client/.env.local
cp server/.env.example server/.env
```

Update `server/.env` with a MongoDB connection string and a long `JWT_SECRET`.

## Development

```bash
npm run dev:client
npm run dev:server
```

Or run both:

```bash
npm run dev:full
```

Frontend: `http://localhost:3000`
API: `http://localhost:5000/api/v1`
Admin panel: `http://localhost:3000/admin`

## Admin User

Create or update the Bloomistry admin accounts after configuring MongoDB:

```bash
BLOOMISTRY_ADMIN_PASSWORD="your-admin-password" \
npm run seed:admin --workspace server
```

The seed creates admin accounts for `alaine@bloomistry.com` and
`zardron@bloomistry.com`.

## API Structure

Core endpoints:

- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `POST /api/v1/auth/logout`
- `GET /api/v1/flowers`
- `POST /api/v1/flowers`
- `PATCH /api/v1/flowers/:id`
- `DELETE /api/v1/flowers/:id`
- `GET /api/v1/categories`
- `POST /api/v1/categories`
- `PATCH /api/v1/categories/:id`
- `DELETE /api/v1/categories/:id`
- `GET /api/v1/testimonials`
- `POST /api/v1/testimonials`
- `PATCH /api/v1/testimonials/:id`
- `DELETE /api/v1/testimonials/:id`

Protected write routes require an admin/editor JWT. Delete routes require `admin`.
