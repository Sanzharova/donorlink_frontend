# DonorLink Admin Frontend

Admin panel for the **DonorLink** blood donation platform.  
Built with **Vue 3**, **Vite**, **PrimeVue**, **TypeScript** and **Pinia**.

Frontend is designed for administrators to manage users, blood centers and donations.

---

## Tech Stack

- Vue 3 (Composition API)
- Vite
- TypeScript
- PrimeVue + PrimeIcons + PrimeFlex
- Pinia
- Vue Router
- Axios

---

## Features

### Authentication
- Login / Register
- JWT access token stored in localStorage
- Automatic redirect to login on 401 Unauthorized
- Toast notifications for API errors

### Dashboard
- Overview page (users, blood centers, donations)
- Styled cards with consistent layout

### Users Management
- View users with pagination
- Ban / Unban users
- Grant / Revoke admin role
- Status and role visualization

### Blood Centers Management
- List blood centers with pagination
- Create / Edit blood center
- Archive / Unarchive centers
- Actions via icons with tooltips

### Donations Management
- View all donations
- Status badges
- Edit donation details
- Loading states while fetching data

### UI / UX
- Admin layout with sidebar navigation
- Smooth transitions between pages
- Card-based layout
- Tooltips instead of text actions
- Loading spinners and disabled states

---

## Project Structure

src/
- api/                -> API services
- assets/             -> Images and backgrounds
- layouts/            -> Admin layout
- models/             -> TypeScript models
- router/             -> Vue Router config
- store/              -> Pinia stores
- utils/              -> Helpers (toast, http)
- views/              -> Pages
- App.vue
- main.ts

---

## Environment Variables

Create .env file in project root:
```
VITE_API_URL=/api
```
---

## Development

Install dependencies:
```bash
npm install
```
Run development server:

```bash
npm run dev
```
Frontend will be available at:
```
http://localhost:5173
```
---

## API Proxy

Backend requests are proxied via Vite to avoid CORS issues.

---

## Authentication Flow

1. User logs in or registers
2. Backend returns accessToken
3. Token is stored in localStorage
4. Axios interceptor adds Authorization header
5. On 401 response user is redirected to login

---

## Notes

- Refresh token cookies are ignored (backend limitation)
- Access token is enough for admin functionality
- UI is optimized for desktop admin usage

