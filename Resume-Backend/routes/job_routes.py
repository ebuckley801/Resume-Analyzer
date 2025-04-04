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
from routes.auth_utils import token_required

job_bp = Blueprint('job', __name__, url_prefix='/job')

@job_bp.route('/upload', methods=['POST'])
@token_required
@limiter.limit("10 per minute")
def upload_job_description():
    """
    Endpoint to upload a job description as a file.
    Processes the file to extract text, then stores it in the database.
    """
    try:
        # Check if file is in the request
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400

        file = request.files['file']

        if not file.filename:
            return jsonify({"error": "No selected file"}), 400

        # Log file details
        logging.info(f"Processing job description file: {file.filename}")

        # Process the file
        try:
            result = extract_text(file)
            
            # Validate that we got text back
            if not result.get('full_text'):
                return jsonify({"error": "Failed to extract text from file"}), 400

            job_text = result['full_text']
            
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
            
            db.session.add(new_job)
            db.session.commit()

            # Return response
            return jsonify({
                "message": "Job description processed successfully",
                "job_id": new_job.id, 
                "text_preview": job_text[:200] + "..." if len(job_text) > 200 else job_text,
                "full_text": job_text
            })

        except ValueError as e:
            logging.error(f"Extraction error: {str(e)}")
            return jsonify({"error": str(e)}), 400

    except Exception as e:
        logging.error(f"Unexpected error: {str(e)}", exc_info=True)
        return jsonify({"error": f"Server error: {str(e)}"}), 500

@job_bp.route('/text', methods=['POST'])
@token_required
@limiter.limit("10 per minute")
def submit_job_description_text():
    """
    Endpoint to submit a job description as text.
    Validates the text and stores it in the database.
    """
    try:
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
@token_required
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
