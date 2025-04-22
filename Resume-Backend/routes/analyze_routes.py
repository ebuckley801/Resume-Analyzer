#routes.analyze_routes.py
"""
Analyze Routes - Endpoints for resume and job description analysis.
Provides endpoints for full resume analysis and job matching analysis.
"""

import logging
from flask import Blueprint, request, jsonify, g, current_app
from resume_matcher_services.resume_analyzer import analyzer
from resume_matcher_services.feedback_generator import ResumeFeedbackGenerator
from models.job_description import JobDescription
from models.upload import Upload
from models.analysis import AnalysisResult
from routes.auth_utils import token_required
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import joinedload

analyze_bp = Blueprint('analyze', __name__)

@analyze_bp.route('/results', methods=['GET'])
@token_required
def get_analysis_results():
    """
    Get all analysis results for the current user.
    Returns a list of analysis results with their status and scores.
    """
    try:
        current_user = g.current_user
        current_app.logger.info(f"Fetching analysis results for user {current_user.id}")
        
        try:
            # Get all analysis results for the current user with eager loading of relationships
            analyses = (AnalysisResult.query
                       .options(joinedload(AnalysisResult.upload))
                       .options(joinedload(AnalysisResult.job_description))
                       .filter_by(user_id=current_user.id)
                       .order_by(AnalysisResult.created_at.desc())
                       .all())
            current_app.logger.info(f"Found {len(analyses)} analysis results")
            
        except SQLAlchemyError as e:
            current_app.logger.error(f"Database error while fetching analyses: {str(e)}", exc_info=True)
            return jsonify({"error": "Database error occurred", "details": str(e)}), 500
        
        results = []
        for analysis in analyses:
            try:
                current_app.logger.debug(f"Processing analysis {analysis.id}")
                
                # Safely get upload filename
                upload_filename = "Unknown Resume"
                try:
                    if analysis.upload:
                        upload_filename = analysis.upload.filename
                except SQLAlchemyError as e:
                    current_app.logger.warning(f"Error accessing upload for analysis {analysis.id}: {str(e)}")
                
                # Safely get job description preview
                job_preview = "No job description"
                try:
                    if analysis.job_description and analysis.job_description.raw_text:
                        job_preview = analysis.job_description.raw_text[:200] + "..."
                    elif analysis.job_description_text:
                        job_preview = analysis.job_description_text[:200] + "..."
                except SQLAlchemyError as e:
                    current_app.logger.warning(f"Error accessing job description for analysis {analysis.id}: {str(e)}")
                
                # Extract score from analysis_data if not available in score field
                score = 0.0
                try:
                    if analysis.score is not None:
                        score = float(analysis.score)
                    elif analysis.analysis_data and 'job_match' in analysis.analysis_data:
                        score = float(analysis.analysis_data['job_match'].get('overall_score', 0.0))
                except (ValueError, TypeError, AttributeError) as e:
                    current_app.logger.warning(f"Error extracting score for analysis {analysis.id}: {str(e)}")
                
                # Extract industry from analysis_data if not available in industry field
                industry = None
                try:
                    if analysis.industry:
                        industry = analysis.industry
                    elif analysis.analysis_data and 'job_match' in analysis.analysis_data:
                        industry = analysis.analysis_data['job_match'].get('industry')
                except AttributeError as e:
                    current_app.logger.warning(f"Error extracting industry for analysis {analysis.id}: {str(e)}")
                
                result = {
                    "id": str(analysis.id),
                    "resumeName": upload_filename,
                    "createdAt": analysis.created_at.isoformat(),
                    "status": "completed",
                    "score": score,
                    "industry": industry,
                    "jobDescriptionPreview": job_preview
                }
                results.append(result)
                current_app.logger.debug(f"Successfully processed analysis {analysis.id}")
                
            except Exception as e:
                current_app.logger.error(f"Error processing analysis {analysis.id}: {str(e)}", exc_info=True)
                # Continue processing other results even if one fails
                continue
            
        current_app.logger.info(f"Successfully processed {len(results)} results")
        return jsonify(results)
        
    except Exception as e:
        current_app.logger.error(f"Error fetching analysis results: {str(e)}", exc_info=True)
        return jsonify({"error": "Failed to fetch analysis results", "details": str(e)}), 500

@analyze_bp.route('/analyze', methods=['POST'])
@token_required
def analyze_resume():
    """
    Endpoint for analyzing a resume with an optional job description.
    Expected JSON payload (accepts both formats):
    {
        "resume_text": "...", (or "full_text": "...")
        "job_description": "..."  (optional),
        "job_id": 123  (optional, alternative to job_description),
        "sections": {...}  (optional)
    }
    """
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Missing JSON data"}), 400
            
        # Handle both "resume_text" and "full_text" keys for flexibility
        resume_text = data.get('resume_text') or data.get('full_text')
        if not resume_text:
            return jsonify({"error": "Missing resume text. Please provide 'resume_text' or 'full_text'"}), 400

        # Get job description - either directly or by ID
        job_description = data.get('job_description')
        job_id = data.get('job_id')
        
        # If job_id is provided, get the job description from the database
        if job_id and not job_description:
            try:
                job = JobDescription.query.get(job_id)
                if not job:
                    return jsonify({"error": f"Job description with ID {job_id} not found"}), 404
                job_description = job.raw_text
                logging.info(f"Using job description from database with ID: {job_id}")
            except Exception as e:
                logging.error(f"Error retrieving job description by ID: {str(e)}")
                return jsonify({"error": f"Failed to retrieve job description: {str(e)}"}), 500

        sections = data.get('sections')
        
        # Basic validation for sections structure
        if sections is not None and not isinstance(sections, dict):
            return jsonify({"error": "Invalid 'sections' format. Expected a dictionary"}), 400
            
        # Use SectionExtractor to properly validate sections if provided
        if sections:
            try:
                # Import SectionExtractor if not already available
                from resume_matcher_services.section_extractor import SectionExtractor
                section_extractor = SectionExtractor()
                
                # Validate sections using the SectionExtractor method
                is_valid, normalized_sections, warning_msg = section_extractor.validate_sections(sections)
                
                if not is_valid:
                    return jsonify({"error": f"Invalid sections structure: {warning_msg}"}), 400
                    
                # Use the normalized sections
                sections = normalized_sections
                
                if warning_msg:
                    logging.warning(warning_msg)
                    
            except Exception as e:
                logging.error(f"Error validating sections: {str(e)}")
                # Don't fail the request, just log the error and continue with original sections

        # Process the analysis
        analysis_result = analyzer.analyze_resume(resume_text, job_description, sections=sections)

        # Generate feedback
        feedback_generator = ResumeFeedbackGenerator()
        feedback = feedback_generator.generate_feedback(
            analysis_result, 
            job_description=job_description
        )

        # Prepare response with analysis and feedback
        response = {
            "analysis": {
                "basic_stats": analysis_result.get('basic_stats', {}),
                "skills_analysis": analysis_result.get('skills', {}),
                "experience_analysis": analysis_result.get('experience', {}),
                "education_analysis": analysis_result.get('education', {})
            },
            "feedback": feedback
        }
        
        # Add job match data if available
        if job_description and 'job_match' in analysis_result:
            response["job_match"] = {
                "match_score": f"{analysis_result['job_match']['overall_score'] * 100:.1f}%",
                "skills_match": analysis_result['job_match']['skills_match'],
                "experience_match": analysis_result['job_match']['experience_match'],
                "requirements_match": analysis_result['job_match']['requirements_match'],
                "industry": analysis_result['job_match']['industry']
            }
            
            # If we used a job from the database, include the job_id in the response
            if job_id:
                response["job_match"]["job_id"] = job_id

        return jsonify(response)

    except Exception as e:
        logging.error(f"Analysis failed: {str(e)}", exc_info=True)
        return jsonify({"error": "Analysis failed", "details": str(e)}), 500

@analyze_bp.route('/results/<int:result_id>', methods=['GET'])
@token_required
def get_analysis_result(result_id):
    """
    Get a specific analysis result by ID.
    Returns the detailed analysis result with all feedback.
    """
    try:
        current_user = g.current_user
        current_app.logger.info(f"Fetching analysis result {result_id} for user {current_user.id}")
        
        try:
            # Get the specific analysis result for the current user
            analysis = (AnalysisResult.query
                       .filter_by(id=result_id, user_id=current_user.id)
                       .first())
            
            if not analysis:
                return jsonify({"error": "Analysis result not found"}), 404
                
        except SQLAlchemyError as e:
            current_app.logger.error(f"Database error while fetching analysis {result_id}: {str(e)}")
            return jsonify({"error": "Database error occurred"}), 500
        
        try:
            # Extract score from analysis_data if not available in score field
            score = analysis.score
            if score is None and analysis.analysis_data:
                try:
                    job_match = analysis.analysis_data.get('job_match', {})
                    score = float(job_match.get('overall_score', 0.0))
                except (ValueError, TypeError, AttributeError) as e:
                    current_app.logger.warning(f"Error extracting score from analysis_data: {str(e)}")
                    score = 0.0
            
            # Extract feedback from analysis_data
            feedback = analysis.analysis_data.get('feedback', {})
            
            result = {
                "score": float(score) if score is not None else 0.0,
                "matchingStrengths": feedback.get('strengths', []),
                "areasForImprovement": feedback.get('improvements', []),
                "missingRequirements": (
                    analysis.analysis_data.get('job_match', {})
                    .get('requirements_match', {})
                    .get('missing', [])
                ),
                "recommendations": feedback.get('recommendations', [])
            }
            
            return jsonify(result)
            
        except Exception as e:
            current_app.logger.error(f"Error processing analysis {result_id}: {str(e)}")
            return jsonify({"error": "Failed to process analysis result"}), 500
        
    except Exception as e:
        current_app.logger.error(f"Error fetching analysis result: {str(e)}", exc_info=True)
        return jsonify({"error": "Failed to fetch analysis result", "details": str(e)}), 500

@analyze_bp.route('/results/latest', methods=['GET'])
@token_required
def get_latest_analysis_result():
    """
    Get the latest analysis result for the current user.
    Returns the detailed analysis result with all feedback.
    """
    try:
        current_user = g.current_user
        current_app.logger.info(f"Fetching latest analysis result for user {current_user.id}")
        
        try:
            # Get the latest analysis result for the current user with eager loading
            analysis = (AnalysisResult.query
                       .options(joinedload(AnalysisResult.job_description))
                       .filter_by(user_id=current_user.id)
                       .order_by(AnalysisResult.created_at.desc())
                       .first())
            
            if not analysis:
                current_app.logger.info(f"No analysis results found for user {current_user.id}")
                return jsonify({"message": "No analysis results found"}), 404
                
        except SQLAlchemyError as e:
            error_msg = str(e)
            current_app.logger.error(f"Database error while fetching latest analysis: {error_msg}", exc_info=True)
            # Log additional context that might be helpful
            current_app.logger.error(f"User ID: {current_user.id}, Query attempted: AnalysisResult latest for user")
            return jsonify({
                "error": "Database error occurred",
                "message": "Unable to fetch analysis results. Please try again later.",
                "details": error_msg if current_app.debug else None
            }), 500
        
        try:
            # Extract score from analysis_data if not available in score field
            score = analysis.score
            if score is None and analysis.analysis_data:
                try:
                    job_match = analysis.analysis_data.get('job_match', {})
                    score = float(job_match.get('overall_score', 0.0))
                except (ValueError, TypeError, AttributeError) as e:
                    current_app.logger.warning(f"Error extracting score from analysis_data: {str(e)}")
                    score = 0.0
            
            # Extract feedback from analysis_data
            feedback = analysis.analysis_data.get('feedback', {}) if analysis.analysis_data else {}
            
            result = {
                "score": float(score) if score is not None else 0.0,
                "matchingStrengths": feedback.get('strengths', []),
                "areasForImprovement": feedback.get('improvements', []),
                "missingRequirements": (
                    analysis.analysis_data.get('job_match', {})
                    .get('requirements_match', {})
                    .get('missing', []) if analysis.analysis_data else []
                ),
                "recommendations": feedback.get('recommendations', [])
            }
            
            return jsonify(result)
            
        except Exception as e:
            error_msg = str(e)
            current_app.logger.error(f"Error processing latest analysis: {error_msg}", exc_info=True)
            current_app.logger.error(f"Analysis ID: {analysis.id if analysis else 'None'}")
            return jsonify({
                "error": "Failed to process analysis result",
                "message": "Error processing your analysis results. Please try again later.",
                "details": error_msg if current_app.debug else None
            }), 500
        
    except Exception as e:
        error_msg = str(e)
        current_app.logger.error(f"Error fetching latest analysis result: {error_msg}", exc_info=True)
        return jsonify({
            "error": "Failed to fetch analysis result",
            "message": "An unexpected error occurred. Please try again later.",
            "details": error_msg if current_app.debug else None
        }), 500