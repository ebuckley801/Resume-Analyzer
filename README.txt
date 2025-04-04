Resume Analyzer API
A Flask-based REST API for analyzing resumes, matching them against job descriptions, and providing feedback on resume optimization.
Features

Resume/CV Processing: Upload and extract text from PDF and DOCX files
Resume Analysis: Extract skills, experience, education, and other key information
Job Matching: Compare resumes to job descriptions and calculate match scores
User Authentication: JWT-based authentication with proper password hashing
Role-based Access Control: Admin and user roles with distinct permissions
RESTful API Design: Well-structured API with proper error handling

Tech Stack

Flask: Web framework for building the API
SQLAlchemy: ORM for database interactions
Flask-Migrate: Database migrations
Flask-CORS: Cross-origin resource sharing support
PyJWT: JWT authentication
OpenAI: Resume analysis capabilities

Getting Started
Prerequisites

Python 3.10+ installed
pip (Python package manager)
Virtual environment (recommended)

Installation

Clone the repository
git clone https://github.com/Kaysaami/resume-matcher-api.git
cd resume-analyzer-api

Create and activate a virtual environment
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate

Install dependencies
pip install -r requirements.txt
Make sure .env file in in the root folder


Run the application
python app.py


The server will start on http://localhost:5000.
Test Users
For development purposes, the application creates these test users:

Admin user: admin@example.com / adminpassword
Regular user: user@example.com / userpassword

API Endpoints
Authentication

POST /auth/register - Register a new user
POST /auth/login - Log in and receive a JWT token
GET /auth/me - Get current user information
POST /auth/password-reset-request - Request a password reset
POST /auth/password-reset - Reset password with token
POST /auth/change-password - Change password (authenticated)

Resume Management

POST /upload - Upload a resume file (PDF/DOCX)
POST /analyze - Analyze resume text with optional job description, providing feedback and match score

Admin Functions

GET /admin/users - List all users (admin only)
GET /admin/users/<user_id> - Get user details (admin only)
POST /admin/users/<user_id>/toggle-status - Enable/disable user (admin only)
POST /admin/users/<user_id>/toggle-admin - Grant/revoke admin privileges (admin only)
GET /admin/stats - Get system statistics (admin only)

Utility

GET /health - API health check
GET / - API documentation overview
