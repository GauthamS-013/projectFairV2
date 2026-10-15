# ProjectFair

**ProjectFair** is a full-stack web application that allows developers and creators to showcase their software projects, discover work from other developers, and connect through likes and comments.

Whether it's a personal project, a college assignment, or an open-source contribution, ProjectFair provides a platform to share your work with the developer community.

## ✨ Features

- **User Authentication** — Register and log in using email and password.
- **Google Authentication** — Sign in using your Google account.
- **GitHub Authentication** — Authenticate using your GitHub account.
- **Project Showcase** — Create, view, update, and manage software projects.
- **Project Details** — Share project descriptions, technologies used, GitHub repositories, and live demo links.
- **Image Uploads** — Upload project and profile images using Multer.
- **Search and Filtering** — Find projects and search your own submissions.
- **Personal Dashboard** — Manage your projects and view relevant project statistics.

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- React Bootstrap
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- Multer
- Google OAuth
- GitHub OAuth

### Database and File Storage
- **MongoDB Atlas** — Database hosting (if configured).
- **Multer** — Handling file uploads.
- **Local uploads directory** — Storing uploaded project and profile images.

## 📁 Project Structure

```text
ProjectFair/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── server/                 # Node.js backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/            # Uploaded images
│   ├── package.json
│   └── ...
│
└── README.md
```

*The directory structure above is illustrative; adjust it to match the actual project files.*

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm
- [MongoDB Atlas](https://www.mongodb.com/atlas) or a local MongoDB instance
- Git

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd ProjectFair
```

### 2. Set Up the Backend

Navigate to the server directory:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory and configure the required environment variables.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Add any additional Google or GitHub OAuth credentials required by your implementation. Use the exact environment variable names expected by your backend code.

Start the backend:

```bash
npm run dev
```

If your project does not define a `dev` script, use the start command configured in your `server/package.json`.

### 3. Set Up the Frontend

Open a new terminal and navigate to the client directory:

```bash
cd client
npm install
```

Configure the backend API URL using the environment variable expected by your frontend.

For a Vite application, this might look like:

```env
VITE_API_URL=http://localhost:5000
```

Make sure the variable name matches the one used in your code.

Start the frontend:

```bash
npm run dev
```

Open the local URL displayed in your terminal to access ProjectFair.

## 🔐 Authentication and Security

ProjectFair supports traditional authentication and third-party sign-in options.

- Password hashing with bcryptjs.
- JWT-based authentication.
- Protected backend routes.
- Google and GitHub OAuth integration.
- Environment variables for sensitive credentials.

**Security note:** Never commit your `.env` file, OAuth client secrets, JWT secrets, or database credentials to GitHub.

## 🖼️ Image Uploads

ProjectFair uses Multer to handle uploaded project and profile images.

Uploaded files are stored in the backend's uploads directory, and the application serves the images through the backend.

For production deployment, ensure the upload directory uses persistent storage. Files stored on an ephemeral hosting filesystem may be lost during restarts or redeployments.

## 🚀 Deployment

ProjectFair's frontend and backend can be deployed separately.

- **Frontend:** Vercel or another React-compatible hosting provider.
- **Backend:** Render or another Node.js-compatible hosting provider.
- **Database:** MongoDB Atlas.
- **Image storage:** A persistent server disk or another durable storage solution compatible with Multer.

Configure production environment variables, allowed CORS origins, OAuth callback URLs, and the frontend's backend API URL before deploying.

## 🔮 Future Improvements

- Like and comment of community projects.
- Users will recieve notifications for likes and comments.
- Advanced project discovery and filtering.
- Additional developer collaboration features.
- Enhanced dashboard analytics.
- Improved upload validation and file management.

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome.

## 📄 License

This project is available for learning and demonstration purposes. Add a license file if you intend to distribute it under a specific open-source license.

---

**Built to help developers showcase their work and discover amazing projects.**
