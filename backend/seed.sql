-- =============================================================================
-- SCHOOLHUB SEED DATA
-- Sample data for St. Jude's Heritage Collegiate / SchoolHub Portal
-- Password for all sample students is: password123
-- =============================================================================

-- Clear existing data
TRUNCATE TABLE enquiries, attendance, results, notices, students RESTART IDENTITY CASCADE;

-- 1. Insert Sample Students
-- All passwords correspond to 'password123' hashed with Werkzeug scrypt
INSERT INTO students (name, roll_number, class_name, section, password_hash) VALUES
('Alexander Vance', 'SCH202601', 'Class 12', 'A', 'scrypt:32768:8:1$UjHMAGYPkIIJ4UDE$72527798478011096b1ae08ae8e2ad934d81df2291f7508ed3e88bf5edeebd8c448a383bf9b88678834b62136e3ed9721a26001f8e8c65ad911c6f1733c182b6'),
('Sophia Montgomery', 'SCH202602', 'Class 12', 'A', 'scrypt:32768:8:1$UjHMAGYPkIIJ4UDE$72527798478011096b1ae08ae8e2ad934d81df2291f7508ed3e88bf5edeebd8c448a383bf9b88678834b62136e3ed9721a26001f8e8c65ad911c6f1733c182b6'),
('Ethan Hawthorne', 'SCH202603', 'Class 11', 'B', 'scrypt:32768:8:1$UjHMAGYPkIIJ4UDE$72527798478011096b1ae08ae8e2ad934d81df2291f7508ed3e88bf5edeebd8c448a383bf9b88678834b62136e3ed9721a26001f8e8c65ad911c6f1733c182b6');

-- 2. Insert Sample Notices
INSERT INTO notices (title, description, category, created_at) VALUES
(
    'Autumn Term Mid-Session Examinations Schedule',
    'The timetable for the Autumn Mid-Session Examinations for Classes 9 through 12 has been officially published. Students may download their detailed seating arrangements and subject syllabus outlines from the academic desk.',
    'Academic',
    '2026-10-28 09:30:00'
),
(
    'Annual Inter-House Debate & Elocution Championship',
    'The coveted Sir Arthur Memorial Debate Trophy will commence next Friday in the historic Assembly Hall. Motions will center on modern ethics, science, and governance. All house prefects must submit team lists by Wednesday.',
    'Event',
    '2026-10-31 11:00:00'
),
(
    'Heritage Science & Robotics Exhibition 2026',
    'Our annual Science and Innovation Symposium will showcase student research projects across Renewable Energy, Computational Physics, and Bio-Engineering. Parents and community members are cordially invited.',
    'Academic',
    '2026-11-01 14:15:00'
),
(
    'Regional Interschool Athletic Meet Selections',
    'Trials for the 100m, 400m, High Jump, and 4x100m relay track events will take place this Saturday morning on the Main Pavilion Grounds. Participants should report in standard athletic attire at 7:30 AM.',
    'Sports',
    '2026-11-02 08:00:00'
),
(
    'Parent-Teacher Academic Review Conference',
    'The semi-annual Parent-Educator consultation will be held on Saturday, 15th November. Detailed 15-minute appointment slots with respective subject masters can be scheduled through the school reception.',
    'General',
    '2026-11-03 16:20:00'
),
(
    'Commemoration of Founder''s Day & Gala Evening',
    'Marking 78 years of scholastic excellence and ethical leadership, the institution celebrates Founder''s Day with an orchestral performance, theatrical play, and fellowship banquet.',
    'Event',
    '2026-11-04 10:00:00'
);

-- 3. Insert Sample Academic Results
-- Alexander Vance (student_id = 1)
INSERT INTO results (student_id, subject, marks, total_marks) VALUES
(1, 'Advanced Mathematics', 94.00, 100.00),
(1, 'Physics (Theory & Lab)', 89.50, 100.00),
(1, 'Chemistry', 91.00, 100.00),
(1, 'English Literature', 95.00, 100.00),
(1, 'Computer Science', 98.00, 100.00),
(1, 'European & World History', 88.50, 100.00);

-- Sophia Montgomery (student_id = 2)
INSERT INTO results (student_id, subject, marks, total_marks) VALUES
(2, 'Advanced Mathematics', 98.00, 100.00),
(2, 'Physics (Theory & Lab)', 95.00, 100.00),
(2, 'Chemistry', 96.50, 100.00),
(2, 'English Literature', 92.00, 100.00),
(2, 'Computer Science', 99.00, 100.00),
(2, 'European & World History', 94.00, 100.00);

-- Ethan Hawthorne (student_id = 3)
INSERT INTO results (student_id, subject, marks, total_marks) VALUES
(3, 'Advanced Mathematics', 82.00, 100.00),
(3, 'Physics (Theory & Lab)', 85.00, 100.00),
(3, 'Chemistry', 80.00, 100.00),
(3, 'English Literature', 89.00, 100.00),
(3, 'Computer Science', 91.50, 100.00),
(3, 'European & World History', 86.00, 100.00);

-- 4. Insert Attendance Records
INSERT INTO attendance (student_id, total_days, present_days) VALUES
(1, 180, 168), -- 93.3% attendance
(2, 180, 174), -- 96.7% attendance
(3, 180, 159); -- 88.3% attendance

-- 5. Insert Sample Enquiries
INSERT INTO enquiries (name, email, message, created_at) VALUES
('Eleanor Darcy', 'eleanor.darcy@outlook.com', 'We are interested in admission to Class 11 Humanities for the upcoming academic session. Please send us the prospectus and scholarship details.', '2026-10-25 11:20:00'),
('Dr. Marcus Sterling', 'm.sterling@cityhospital.org', 'Inquiring about laboratory infrastructure and STEM co-curricular programs for a prospective Class 9 applicant.', '2026-11-01 15:45:00');

