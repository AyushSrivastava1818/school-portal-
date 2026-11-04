-- =============================================================================
-- SCHOOLHUB DATABASE SCHEMA (PostgreSQL)
-- Designed for B.Tech Web Development Lab Project
-- =============================================================================

-- Drop tables if they already exist (in reverse dependency order)
DROP TABLE IF EXISTS enquiries CASCADE;
DROP TABLE IF EXISTS attendance CASCADE;
DROP TABLE IF EXISTS results CASCADE;
DROP TABLE IF EXISTS notices CASCADE;
DROP TABLE IF EXISTS students CASCADE;

-- 1. Students Table
-- Stores credentials and basic academic identity for each enrolled student.
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    roll_number VARCHAR(50) UNIQUE NOT NULL,
    class_name VARCHAR(50) NOT NULL,
    section VARCHAR(10) NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

-- 2. Notices Table
-- Stores institutional circulars, academic notices, and public announcements.
CREATE TABLE notices (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL, -- e.g., 'Academic', 'Event', 'Sports', 'General'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Results Table
-- Subject-wise marks earned by students in recent examinations.
CREATE TABLE results (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    subject VARCHAR(100) NOT NULL,
    marks NUMERIC(5,2) NOT NULL,
    total_marks NUMERIC(5,2) NOT NULL
);

-- 4. Attendance Table
-- Records academic session attendance data for calculating attendance percentage.
CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    total_days INTEGER NOT NULL,
    present_days INTEGER NOT NULL
);

-- 5. Enquiries Table
-- Stores prospective student inquiries and messages submitted via the Contact Us form.
CREATE TABLE enquiries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

