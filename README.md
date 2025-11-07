# Online Banking System

A full-stack online banking system built with **React** for the frontend and **Java Spring Boot** for the backend. This project provides user registration, authentication, transactions, password management, and admin features.

---

## Features

### User Features
- User registration with **email OTP verification**
- Login / Logout
- Password management:
  - Forgot password
  - Reset password via email link
  - Change password
- View accounts and transaction history
- Protected routes ensuring user authentication

### Admin Features
- Admin login
- View all user transactions
- Search transactions by account number
- Dashboard navigation for managing users and transactions

### Landing Page
- Modern responsive design
- Hero section showcasing banking features
- Footer with links and social media icons

---

## Technologies Used

- **Frontend:**
  - React
  - React Router
  - Tailwind CSS
  - Axios (with JWT token handling)
  - react-hot-toast (notifications)
  - react-icons

- **Backend:**
  - Java
  - Spring Boot
  - REST API
  - JWT authentication

- **Tools & Utilities:**
  - VS Code
  - Node.js & npm
  - Postman (for testing APIs)

---

## Folder Structure

.
├── LandingPage # Landing page components
├── Protected # Protected routes wrapper
├── Registration # User registration and login flows
├── Transaction # Transaction management components
├── Utills # Axios instance with JWT setup
├── Context # React Context for global state
├── .vscode # VS Code settings for Java
└── README.md

yaml
Copy code

---

## Installation & Setup

### Backend
1. Navigate to backend folder (`cd backend-folder`)
2. Run Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
or build JAR:

bash
Copy code
./mvnw clean package
java -jar target/your-app.jar
Frontend
Navigate to frontend folder (cd frontend-folder)

Install dependencies:

bash
Copy code
npm install
Run React app:

bash
Copy code
npm start
Usage
Open the application in your browser (typically http://localhost:3000)

Register a new user and verify email via OTP

Login with your credentials

Access dashboard, manage accounts, and view transactions

Admin users can view all transactions and search by account numbers

Notes
JWT tokens are stored in sessionStorage with 15-minute expiry

Protected routes redirect unauthorized users

OTP verification has a maximum of 3 resends

Passwords must be at least 8 characters

Author
Your Name

GitHub: https://github.com/yourusername
