"""
Database Connection & Management Module
Designed for B.Tech Web Development Lab Group Project.
Uses psycopg2 to establish connection with PostgreSQL database.
"""

import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "schoolhub")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "postgres")


def get_db_connection():
    """
    Creates and returns a live connection to PostgreSQL database.
    Uses RealDictCursor by default so rows can be accessed like Python dictionaries.
    """
    connection = psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        cursor_factory=RealDictCursor
    )
    return connection


def create_database_if_not_exists():
    """
    Connects to the default 'postgres' database and creates the 'schoolhub'
    database if it does not already exist.
    """
    try:
        # Connect to default postgres DB with autocommit
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            dbname="postgres",
            user=DB_USER,
            password=DB_PASSWORD
        )
        conn.autocommit = True
        cur = conn.cursor()

        # Check if DB exists
        cur.execute("SELECT 1 FROM pg_catalog.pg_database WHERE datname = %s;", (DB_NAME,))
        exists = cur.fetchone()
        if not exists:
            cur.execute(f'CREATE DATABASE "{DB_NAME}";')
            print(f"[DB Setup] Database '{DB_NAME}' created successfully.")
        else:
            print(f"[DB Setup] Database '{DB_NAME}' already exists.")

        cur.close()
        conn.close()
    except Exception as error:
        print(f"[DB Setup Warning] Could not verify/create database '{DB_NAME}': {error}")


def initialize_tables():
    """
    Reads schema.sql and seed.sql to initialize tables and insert starter data.
    """
    base_dir = os.path.dirname(os.path.abspath(__file__))
    schema_path = os.path.join(base_dir, "schema.sql")
    seed_path = os.path.join(base_dir, "seed.sql")

    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            # 1. Execute schema.sql
            with open(schema_path, "r", encoding="utf-8") as f:
                schema_sql = f.read()
            cur.execute(schema_sql)
            print("[DB Setup] Schema tables created successfully.")

            # 2. Execute seed.sql
            with open(seed_path, "r", encoding="utf-8") as f:
                seed_sql = f.read()
            cur.execute(seed_sql)
            print("[DB Setup] Seed data inserted successfully.")

        conn.commit()
    except Exception as e:
        conn.rollback()
        print(f"[DB Setup Error] Failed to initialize database: {e}")
        raise e
    finally:
        conn.close()


if __name__ == "__main__":
    print("Initializing SchoolHub PostgreSQL database...")
    create_database_if_not_exists()
    initialize_tables()
    print("Database initialization complete.")

