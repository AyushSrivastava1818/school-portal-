# 1. Use an official lightweight Python runtime as a parent image
FROM python:3.11-slim

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Install system dependencies required to compile PostgreSQL drivers (psycopg2)
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# 4. Copy the requirements file first to leverage Docker caching
# (If you don't have a requirements.txt, we will handle that in the steps below)
COPY requirements.txt ./

# 5. Install the Python packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# 6. Copy the rest of the backend source code into the container
COPY . .

# 7. Expose the port that your Flask app runs on
EXPOSE 5000

# 8. Run the Flask application
CMD ["python", "app.py"]
