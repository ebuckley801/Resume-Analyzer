import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from extensions import db, init_extensions
from config import Config

def create_app(config_name='development'):
    app = Flask(__name__)

    # Enable CORS for local development
    CORS(app)
    # Load configuration based on environment
    config_settings = Config.get_config()[config_name]
    app.config.update(config_settings)
    
    # Initialize extensions
    init_extensions(app)
    
    # Register blueprints
    from routes.upload_routes import upload_bp
    from routes.analyze_routes import analyze_bp
    from routes.auth_routes import auth_bp
    from routes.admin_routes import admin_bp
    from routes.job_routes import job_bp

    app.register_blueprint(upload_bp)
    app.register_blueprint(analyze_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(job_bp) 

    # Health check and API documentation endpoints
    @app.route('/health', methods=['GET'])
    def health_check():
        """Simple health check endpoint."""
        return jsonify({
            "status": "ok",
            "version": "1.0.0",
            "environment": app.config.get('ENV', 'development')
        })

    @app.route('/', methods=['GET'])
    def api_root():
        """API documentation root."""
        return jsonify({
            "name": "Resume Analyzer API",
            "version": "1.0.0",
            "endpoints": {
                "auth": ["/auth/login", "/auth/register", "/auth/me"],
                "resume": ["/upload", "/analyze", "/analyze/match"],
                "admin": ["/admin/users", "/admin/stats"]
            },
            "status": "available"
        })
    
    # Import all model modules to register them with SQLAlchemy in the right order
    with app.app_context():
        # Import models in the correct order
        from models.user import User
        from models.upload import Upload
        from models.analysis import AnalysisResult
        from models.job_description import JobDescription
        
        # Create tables
        db.create_all()
        
    # Register error handlers
    from error_handlers import register_error_handlers
    register_error_handlers(app)
    
    return app

if __name__ == '__main__':
    app = create_app('development')
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)