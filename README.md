# Go Solar

Go Solar is a solar energy landing page and quote management application with a static frontend and a Node.js/Express backend. The project includes user signup/login, JWT-protected quote submission, and MongoDB persistence for quote requests.

## Features

- Static multi-page frontend built with HTML, CSS, and vanilla JavaScript
- User registration and login via `/api/auth/signup` and `/api/auth/login`
- JWT-based authentication
- Protected quote submission endpoint at `/api/quote`
- MongoDB / Mongoose backend storage for users and quotes
- Responsive navigation and quote request flow

## Screenshots
### Homepage

<img src="Images-Go%20Solar/Solar1.jpeg" width="800" alt="Homepage" />

![About Us](Images-Go%20Solar/Solar2.jpeg)

![Locations](Images-Go%20Solar/Solar3.jpeg)

![Benefits](Images-Go%20Solar/Solar4.jpeg)

![Blog](Images-Go%20Solar/Solar5.jpeg)

![Login](Images-Go%20Solar/Solar6.png)

![Sign Up](Images-Go%20Solar/Solar7.png)

![Quote Form](Images-Go%20Solar/Solar8.png)

## Tech Stack

- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: bcryptjs, jsonwebtoken
- Frontend: HTML, CSS, JavaScript
- Utilities: dotenv, cors

## Project Structure

- `backend/`
  - `server.js` - Express server entrypoint
  - `config/db.js` - MongoDB connection helper
  - `middleware/authMiddleware.js` - JWT token verification middleware
  - `models/User.js` - User schema
  - `models/Quote.js` - Quote schema
  - `routes/authRoutes.js` - Signup and login endpoints
  - `routes/quoteRoutes.js` - Protected quote submission endpoint
- `frontend/`
  - `src/` - HTML pages
  - `style/` - CSS files for each page
  - `script/` - Frontend JavaScript for forms and navigation
  - `images/` - Static image assets used by the UI
- `.env` - Environment variable configuration (not committed in production)
- `package.json` - Backend dependencies and scripts

## Setup

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file at the project root with the following values:

```env
MONGO_URI=your_mongodb_connection_string
PORT=8080
JWT_SECRET=your_jwt_secret
```

3. Start the backend server

```bash
npm start
```

4. Open the frontend pages in a browser from `frontend/src/`.

> The frontend currently makes API requests to `http://localhost:8080`.

## Usage

- `frontend/src/signup.html` — Register a new user
- `frontend/src/login.html` — Log in and store a JWT token in `localStorage`
- `frontend/src/quote.html` — Submit a quote request using the stored token

### API Endpoints

- `POST /api/auth/signup`
  - Request: `{ name, email, password }`
  - Response: success message or error
- `POST /api/auth/login`
  - Request: `{ email, password }`
  - Response: `{ token, user }`
- `POST /api/quote` (protected)
  - Headers: `Authorization: Bearer <token>`
  - Request: `{ name, email, phone, location, monthlyBill }`
  - Response: saved quote data or error

## Notes

- Keep the `.env` credentials secure and do not commit them to source control.
- The backend listens on the configured `PORT` or `8080` by default.
- The quote form redirects unauthenticated users to `login.html`.

## Future improvements

- Add quote list and user dashboard pages
- Improve frontend routing and deployment build support
- Add validation messages and error handling in the UI
- Add automated tests for backend routes
