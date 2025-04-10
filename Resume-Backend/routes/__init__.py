# routes/__init__.py
from .upload_routes import upload_bp
from .analyze_routes import analyze_bp
from .auth_routes import auth_bp
from .admin_routes import admin_bp
from .job_routes import job_bp

def init_routes(app):
    app.register_blueprint(upload_bp)
    app.register_blueprint(analyze_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(job_bp)