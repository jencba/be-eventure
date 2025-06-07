# Eventure BE


A Node.js and Express backend that powers the **Eventure** platform — allowing authenticated users to create, update, delete, and sign up for events. Uses Supabase for authentication, database, and row-level security (RLS).

---

## 🌟 Features

- ✅ User Registration & Login (JWT-based)
- ✅ Session-based authentication with token validation
- ✅ Role-based access: staff vs. regular users
- ✅ Full CRUD operations for events
- ✅ Protected routes for authenticated access
- ✅ CORS-enabled for frontend communication
- ✅ Input validation and error handling

---

## 🔧 Tech Stack

- **Node.js**
- **Express**
- **Supabase (PostgreSQL)** or another relational database
- **JWT** (JSON Web Tokens)
- **dotenv** for environment variable management
- **cors**, **helmet**, **body-parser** for security and request parsing

---

## 📦 Installation

### 1. Clone the repository

bash
git clone https://github.com/yourusername/eventure-be.git
cd eventure-be


**2. Install Dependencies**

bash
npm install


### 3. Create Environment File

Create a .env file in the root directory with the following content:

env
PORT=5001
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_api_key


### 3. Run the file


bash
node listen.js


Server will be running at: http://localhost:5001

### ✅ Authentication



Authorization: Bearer 'your_jwt_token'


### 🧪 API Testing

Use tools like Postman or Insomnia to test your API endpoints. Don’t forget to attach JWT tokens for routes that require authentication.

