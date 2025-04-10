# routes/job_routes.py
"""
Job Description Routes - Endpoints for job description management.
Handles uploading, storing, and retrieving job descriptions.
"""

import logging
import hashlib
from datetime import datetime, timezone
from flask import Blueprint, request, jsonify, g
from extensions import db, limiter
from resume_matcher_services.file_parser import extract_text
from models.job_description import JobDescription
from routes.auth_utils import get_current_user_optional

job_bp = Blueprint('job', __name__, url_prefix='/job')

@job_bp.route('/text', methods=['POST'])
@limiter.limit("10 per minute")
def submit_job_description_text():
    """
    Endpoint to submit a job description as text.
    Validates the text and stores it in the database.
    """
    try:
        # Get current user (if authenticated)
        current_user = get_current_user_optional()

        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({"error": "Missing job description text"}), 400
            
        job_text = data['text']
        
        if not job_text or len(job_text.strip()) < 50:
            return jsonify({"error": "Job description text is too short"}), 400
            
        # Calculate hash for deduplication
        content_hash = hashlib.sha256(job_text.encode('utf-8')).hexdigest()
        
        # Check if this job description already exists
        existing_job = JobDescription.query.filter_by(content_hash=content_hash).first()
        
        if existing_job:
            return jsonify({
                "message": "Job description already exists",
                "job_id": existing_job.id,
                "text_preview": job_text[:200] + "..." if len(job_text) > 200 else job_text,
                "full_text": job_text
            })
        
        # Create a blank analysis_data structure (will be filled by analyzer)
        analysis_data = {
            "skills": [],
            "requirements": [],
            "experience": {},
            "industry": None,
            "job_title": None
        }
        
        # Create and commit the job description record
        new_job = JobDescription(
            raw_text=job_text,
            content_hash=content_hash,
            analysis_data=analysis_data
        )
        
        # If user is authenticated, link the job description to the user
        if current_user:
            new_job.user_id = current_user.id

        db.session.add(new_job)
        db.session.commit()

        # Return response
        return jsonify({
            "message": "Job description processed successfully",
            "job_id": new_job.id,
            "text_preview": job_text[:200] + "..." if len(job_text) > 200 else job_text,
            "full_text": job_text
        })

    except Exception as e:
        logging.error(f"Unexpected error: {str(e)}", exc_info=True)
        return jsonify({"error": f"Server error: {str(e)}"}), 500

@job_bp.route('/<int:job_id>', methods=['GET'])
def get_job_description(job_id):
    """
    Endpoint to retrieve a specific job description by ID.
    """
    try:
        job = JobDescription.query.get(job_id)
        
        if not job:
            return jsonify({"error": "Job description not found"}), 404
            
        return jsonify({
            "job_id": job.id,
            "text": job.raw_text,
            "created_at": job.created_at.isoformat(),
            "analysis": job.analysis_data
        })
        
    except Exception as e:
        logging.error(f"Error retrieving job description: {str(e)}")
        return jsonify({"error": "Failed to retrieve job description"}), 500
