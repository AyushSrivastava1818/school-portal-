"""
Helper script to initialize or reset the SchoolHub PostgreSQL Database.
Run this command from your terminal:
    python init_db.py
"""

from database import create_database_if_not_exists, initialize_tables

def main():
    print("==================================================")
    print("   SCHOOLHUB - DATABASE INITIALIZATION UTILITY    ")
    print("==================================================")
    try:
        create_database_if_not_exists()
        initialize_tables()
        print("\n[SUCCESS] Database 'schoolhub' is initialized with tables and sample data!")
        print("Sample Student Credentials for Login:")
        print("  - Alexander Vance:   Roll No: SCH202601  | Password: password123")
        print("  - Sophia Montgomery: Roll No: SCH202602  | Password: password123")
        print("  - Ethan Hawthorne:   Roll No: SCH202603  | Password: password123")
        print("==================================================")
    except Exception as exc:
        print(f"\n[ERROR] Database initialization failed: {exc}")

if __name__ == "__main__":
    main()

