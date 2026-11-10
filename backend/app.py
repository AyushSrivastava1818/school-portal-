"""
=============================================================================
SCHOOLHUB - FLASK REST API BACKEND
Developed for B.Tech Web Development Lab Group Project.

Technologies:
- Python 3
- Flask (Micro web framework)
- Flask-CORS (Cross-Origin Resource Sharing for React frontend)
- psycopg2 (PostgreSQL database driver)
- Werkzeug (Secure password hashing and verification)
=============================================================================
"""

import os
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from werkzeug.security import check_password_hash
from dotenv import load_dotenv

# Import database connection helper from database.py
from database import get_db_connection

# Load environment configuration (.env)
load_dotenv()

# Initialize Flask application
app = Flask(__name__)

# Secret key for session signing
app.secret_key = os.getenv("SECRET_KEY", "heritage_academy_secure_session_key_2026")

# Enable Cross-Origin Resource Sharing (CORS) so React running on port 5173 can call this API
CORS(app, supports_credentials=True, origins=["http://localhost:5173", "http://127.0.0.1:5173"])


# -----------------------------------------------------------------------------
# 1. HEALTH CHECK ENDPOINT
# -----------------------------------------------------------------------------
@app.route("/api/health", methods=["GET"])
def health_check():
    """
    Simple endpoint to verify that the Flask server and PostgreSQL connection
    are functioning properly.
    """
    try:
        conn = get_db_connection()
        conn.close()
        return jsonify({
            "status": "online",
            "database": "connected",
            "message": "SchoolHub API is running smoothly."
        }), 200
    except Exception as e:
        return jsonify({
            "status": "warning",
            "database": "disconnected",
            "error": str(e)
        }), 500


# -----------------------------------------------------------------------------
# 2. NOTICES ENDPOINTS
# -----------------------------------------------------------------------------
@app.route("/api/notices", methods=["GET"])
def get_all_notices():
    """
    Fetches all school notices from PostgreSQL.
    Supports optional category filtering: /api/notices?category=Academic
    """
    category = request.args.get("category")

    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        if category and category.lower() != "all":
            # Filter by specific category
            query = """
                SELECT id, title, description, category, 
                       TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI') as created_at
                FROM notices
                WHERE LOWER(category) = LOWER(%s)
                ORDER BY created_at DESC;
            """
            cur.execute(query, (category,))
        else:
            # Retrieve all notices
            query = """
                SELECT id, title, description, category, 
                       TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI') as created_at
                FROM notices
                ORDER BY created_at DESC;
            """
            cur.execute(query)

        notices = cur.fetchall()
        cur.close()

        return jsonify({
            "success": True,
            "count": len(notices),
            "data": notices
        }), 200

    except Exception as error:
        return jsonify({
            "success": False,
            "message": "Failed to fetch notices.",
            "error": str(error)
        }), 500
    finally:
        if conn:
            conn.close()


@app.route("/api/notices/latest", methods=["GET"])
def get_latest_notices():
    """
    Retrieves the most recent 4 notices for display on the Homepage announcement bar.
    """
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        query = """
            SELECT id, title, description, category, 
                   TO_CHAR(created_at, 'Mon DD, YYYY') as formatted_date
            FROM notices
            ORDER BY created_at DESC
            LIMIT 4;
        """
        cur.execute(query)
        latest_notices = cur.fetchall()
        cur.close()

        return jsonify({
            "success": True,
            "data": latest_notices
        }), 200

    except Exception as error:
        return jsonify({
            "success": False,
            "message": "Failed to fetch latest notices.",
            "error": str(error)
        }), 500
    finally:
        if conn:
            conn.close()


# -----------------------------------------------------------------------------
# 3. CONTACT / ENQUIRY ENDPOINT
# -----------------------------------------------------------------------------
@app.route("/api/contact", methods=["POST"])
def submit_contact_enquiry():
    """
    Receives contact form submissions and saves them into the 'enquiries' PostgreSQL table.
    Validates that name, email, and message are non-empty.
    """
    data = request.get_json()

    if not data:
        return jsonify({"success": False, "message": "No JSON payload provided."}), 400

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    message = data.get("message", "").strip()

    # Basic input validation
    if not name or not email or not message:
        return jsonify({
            "success": False,
            "message": "Please provide your name, valid email, and message."
        }), 400

    if "@" not in email or "." not in email:
        return jsonify({
            "success": False,
            "message": "Please provide a valid email address."
        }), 400

    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        insert_query = """
            INSERT INTO enquiries (name, email, message)
            VALUES (%s, %s, %s)
            RETURNING id, created_at;
        """
        cur.execute(insert_query, (name, email, message))
        new_enquiry = cur.fetchone()
        conn.commit()
        cur.close()

        return jsonify({
            "success": True,
            "message": "Thank you! Your enquiry has been received by our Admissions Office.",
            "enquiry_id": new_enquiry["id"]
        }), 201

    except Exception as error:
        if conn:
            conn.rollback()
        return jsonify({
            "success": False,
            "message": "Database error while saving your enquiry.",
            "error": str(error)
        }), 500
    finally:
        if conn:
            conn.close()


# -----------------------------------------------------------------------------
# 4. STUDENT AUTHENTICATION ENDPOINT
# -----------------------------------------------------------------------------
@app.route("/api/login", methods=["POST"])
def student_login():
    """
    Authenticates a student using their unique Roll Number and Password.
    Uses Werkzeug's secure check_password_hash() comparison.
    """
    data = request.get_json()

    if not data:
        return jsonify({"success": False, "message": "Missing credentials."}), 400

    roll_number = data.get("roll_number", "").strip().upper()
    password = data.get("password", "").strip()

    if not roll_number or not password:
        return jsonify({
            "success": False,
            "message": "Both Roll Number and Password are required."
        }), 400

    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # Query student record matching roll number
        query = """
            SELECT id, name, roll_number, class_name, section, password_hash
            FROM students
            WHERE UPPER(roll_number) = %s;
        """
        cur.execute(query, (roll_number,))
        student = cur.fetchone()
        cur.close()

        # If student does not exist
        if not student:
            return jsonify({
                "success": False,
                "message": "Invalid Roll Number. Student record not found."
            }), 401

        # Verify hashed password with Werkzeug
        if not check_password_hash(student["password_hash"], password):
            return jsonify({
                "success": False,
                "message": "Incorrect password. Please verify and try again."
            }), 401

        # Password verified! Store student info in server session
        session["student_id"] = student["id"]
        session["roll_number"] = student["roll_number"]

        return jsonify({
            "success": True,
            "message": f"Welcome back, {student['name']}!",
            "student": {
                "id": student["id"],
                "name": student["name"],
                "roll_number": student["roll_number"],
                "class_name": student["class_name"],
                "section": student["section"]
            }
        }), 200

    except Exception as error:
        return jsonify({
            "success": False,
            "message": "Authentication service encountered an error.",
            "error": str(error)
        }), 500
    finally:
        if conn:
            conn.close()


# -----------------------------------------------------------------------------
# 5. STUDENT PORTAL DATA ENDPOINTS
# -----------------------------------------------------------------------------
@app.route("/api/student/profile", methods=["GET"])
def get_student_profile():
    """
    Retrieves student identity details.
    Accepts 'student_id' via query param: /api/student/profile?student_id=1
    """
    student_id = session.get("student_id")

    if not student_id:
        return jsonify({"success": False, "message": "Student ID parameter is required."}), 400

    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        query = """
            SELECT id, name, roll_number, class_name, section
            FROM students
            WHERE id = %s;
        """
        cur.execute(query, (student_id,))
        student = cur.fetchone()
        cur.close()

        if not student:
            return jsonify({"success": False, "message": "Student not found."}), 404

        return jsonify({
            "success": True,
            "data": student
        }), 200

    except Exception as error:
        return jsonify({
            "success": False,
            "message": "Error fetching student profile.",
            "error": str(error)
        }), 500
    finally:
        if conn:
            conn.close()


@app.route("/api/student/results", methods=["GET"])
def get_student_results():
    """
    Retrieves subject-wise marks and computes overall percentage and performance.
    """
    student_id = session.get("student_id")

    if not student_id:
        return jsonify({"success": False, "message": "Student ID parameter is required."}), 400

    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        query = """
            SELECT id, subject, marks, total_marks
            FROM results
            WHERE student_id = %s
            ORDER BY subject ASC;
        """
        cur.execute(query, (student_id,))
        results = cur.fetchall()
        cur.close()

        # Compute summary statistics
        total_obtained = sum(float(r["marks"]) for r in results) if results else 0
        total_maximum = sum(float(r["total_marks"]) for r in results) if results else 0
        overall_percentage = round((total_obtained / total_maximum) * 100, 2) if total_maximum > 0 else 0

        # Grade calculation
        if overall_percentage >= 90:
            overall_grade = "A+ (Distinction)"
        elif overall_percentage >= 80:
            overall_grade = "A (Excellent)"
        elif overall_percentage >= 70:
            overall_grade = "B+ (Very Good)"
        elif overall_percentage >= 60:
            overall_grade = "B (Good)"
        else:
            overall_grade = "Pass"

        return jsonify({
            "success": True,
            "data": results,
            "summary": {
                "total_obtained": total_obtained,
                "total_maximum": total_maximum,
                "percentage": overall_percentage,
                "grade": overall_grade
            }
        }), 200

    except Exception as error:
        return jsonify({
            "success": False,
            "message": "Error fetching academic results.",
            "error": str(error)
        }), 500
    finally:
        if conn:
            conn.close()


@app.route("/api/student/attendance", methods=["GET"])
def get_student_attendance():
    """
    Retrieves attendance statistics for the student and calculates presence percentage.
    """
    student_id = request.args.get("student_id") or session.get("student_id")

    if not student_id:
        return jsonify({"success": False, "message": "Student ID parameter is required."}), 400

    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        query = """
            SELECT id, total_days, present_days
            FROM attendance
            WHERE student_id = %s;
        """
        cur.execute(query, (student_id,))
        att = cur.fetchone()
        cur.close()

        if not att:
            return jsonify({
                "success": True,
                "data": {
                    "total_days": 0,
                    "present_days": 0,
                    "absent_days": 0,
                    "percentage": 0.0,
                    "status": "No attendance records found"
                }
            }), 200

        total = att["total_days"]
        present = att["present_days"]
        absent = total - present
        percentage = round((present / total) * 100, 1) if total > 0 else 0.0

        # Determine eligibility status for exams (standard academic rule: >= 75%)
        eligible = percentage >= 75.0

        return jsonify({
            "success": True,
            "data": {
                "total_days": total,
                "present_days": present,
                "absent_days": absent,
                "percentage": percentage,
                "is_eligible_for_exams": eligible,
                "status": "Satisfactory" if eligible else "Attendance Warning"
            }
        }), 200

    except Exception as error:
        return jsonify({
            "success": False,
            "message": "Error fetching attendance.",
            "error": str(error)
        }), 500
    finally:
        if conn:
            conn.close()


# -----------------------------------------------------------------------------
# APPLICATION ENTRYPOINT
# -----------------------------------------------------------------------------
if __name__ == "__main__":
    port = int(os.getenv("FLASK_PORT", 5000))
    debug_mode = os.getenv("FLASK_DEBUG", "True").lower() in ("true", "1")
    print(f"[*] Starting SchoolHub Flask Backend on http://localhost:{port}")
    app.run(host="0.0.0.0", port=port, debug=debug_mode)

