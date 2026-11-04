# SchoolHub – School Information & Management Portal

> **B.Tech Web Development Lab Group Project**  
> Built with **React (Vite)**, **Python Flask**, and **PostgreSQL**.

---

## 1. Project Architecture & Data Flow

### Architecture Diagram
```
[ Client Browser ]
  │
  ├── React Components (Pages, Navigation, Forms, Cards)
  └── Services (fetch API calls with fallback caching)
        │
        ▼ HTTP REST / JSON (CORS enabled)
[ Flask Backend ] (Python 3, port 5000)
  │
  ├── Endpoints: /api/notices, /api/contact, /api/login, /api/student/*
  ├── Security: Werkzeug Password Hashing (scrypt)
  └── Driver: psycopg2 (Parameterized queries preventing SQL injection)
        │
        ▼ TCP Connection (port 5432)
[ PostgreSQL Database ]
  └── Tables: students, notices, results, attendance, enquiries
```

### Data Flow Breakdown
1. **User Request**: User navigates pages, filters notices, submits an enquiry, or logs in.
2. **React Fetch Call**: `frontend/src/services/api.js` dispatches an asynchronous HTTP request to `http://localhost:5000/api/*`.
3. **Flask Route Handling**: Flask parses query parameters or JSON payloads, validates input fields, and acquires a database cursor via `psycopg2`.
4. **Database Execution**: PostgreSQL runs parameterized SQL queries (`%s` placeholders) and returns rows mapped as Python dictionaries.
5. **JSON Response**: Flask returns structured JSON (`{ success: true, data: [...] }`).
6. **UI Render**: React updates component state (`useState`) and displays the updated view without reloading the page.

---

## 2. Technology Stack

- **Frontend**: React 18, Vite, React Router DOM, Lucide React, Vanilla CSS.
- **Backend**: Python 3, Flask, Flask-CORS, Werkzeug.
- **Database**: PostgreSQL with `psycopg2-binary`.
- **Design Direction**: *"The Heritage Edit"* (Warm Ivory `#F8F5EE`, Deep Burgundy `#713B37`, Forest Green `#35483A`, Antique Gold `#B68A50`, Charcoal `#2A2824`).

---

## 3. Database Schema

```sql
-- 1. Students
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    roll_number VARCHAR(50) UNIQUE NOT NULL,
    class_name VARCHAR(50) NOT NULL,
    section VARCHAR(10) NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

-- 2. Notices
CREATE TABLE notices (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Results
CREATE TABLE results (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    subject VARCHAR(100) NOT NULL,
    marks NUMERIC(5,2) NOT NULL,
    total_marks NUMERIC(5,2) NOT NULL
);

-- 4. Attendance
CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    total_days INTEGER NOT NULL,
    present_days INTEGER NOT NULL
);

-- 5. Enquiries
CREATE TABLE enquiries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. Quick Start & Setup

### 1. Database Initialization
Make sure PostgreSQL is running on port `5432`, then run:
```bash
cd backend
python init_db.py
```
*This automatically creates the `schoolhub` database, executes `schema.sql`, and seeds sample student, notice, and results data.*

### 2. Run Flask Backend
```bash
cd backend
python app.py
```
*API starts at `http://localhost:5000`.*

### 3. Run React Frontend
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```
*Frontend starts at `http://localhost:5173`.*

---

## 5. REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Backend and database connectivity status |
| `GET` | `/api/notices` | All notices (optional filter: `?category=Academic`) |
| `GET` | `/api/notices/latest` | Latest 4 notices for the homepage |
| `POST` | `/api/contact` | Submits enquiry to `enquiries` table |
| `POST` | `/api/login` | Authenticates student roll number & password |
| `GET` | `/api/student/profile` | Student profile info (`?student_id=1`) |
| `GET` | `/api/student/results` | Subject marks, percentage & grade (`?student_id=1`) |
| `GET` | `/api/student/attendance` | Attendance days, percentage & eligibility |

### Demo Student Login Credentials
- **Student 1**: Roll `SCH202601` | Password `password123` *(Alexander Vance, 93.3% Attendance)*
- **Student 2**: Roll `SCH202602` | Password `password123` *(Sophia Montgomery, 96.7% Attendance)*
- **Student 3**: Roll `SCH202603` | Password `password123` *(Ethan Hawthorne, 88.3% Attendance)*

*(A convenient one-click demo autofill button is available on the Student Login page for examination evaluation.)*

---

## 6. Group Member Contributions (5 Students)

- **Student 1 (Frontend Lead & Homepage)**: Design system, `Navbar.jsx` with responsive collapsible drawer, `Home.jsx`, branding, and CSS.
- **Student 2 (Content & Info Pages)**: `About.jsx`, `Academics.jsx` (stream switcher), `Facilities.jsx`, and `Footer.jsx`.
- **Student 3 (Backend API Development)**: Flask REST API (`app.py`), Werkzeug password verification, CORS middleware, and input validation.
- **Student 4 (Database Architecture)**: PostgreSQL `schema.sql`, sample `seed.sql`, connection handling in `database.py`, and SQL queries.
- **Student 5 (Student Portal & Integration)**: `StudentLogin.jsx`, `StudentDashboard.jsx`, API fetch service (`api.js`), and test documentation.

---

## 7. Key Viva Exam Questions & Answers

1. **Why use Werkzeug password hashing instead of storing plain passwords?**  
   *Answer*: Plaintext storage is a major vulnerability. Werkzeug uses the cryptographic `scrypt` hashing algorithm with unique salts so passwords cannot be decrypted even if the database is exposed.

2. **How does the project prevent SQL Injection?**  
   *Answer*: All database queries in `app.py` utilize `psycopg2` parameterized queries with `%s` placeholders rather than string formatting or concatenation.

3. **What is the role of Flask-CORS?**  
   *Answer*: Since the React frontend runs on `localhost:5173` and Flask runs on `localhost:5000`, browser security blocks requests by default. CORS allows the browser to communicate safely across different origins.

4. **How does client-side routing differ from server-side routing?**  
   *Answer*: React Router swaps components dynamically inside the DOM using the browser's History API without making full-page reloads to the server.
