# wsgi.py
from app import create_app

# Create an instance of the application for WSGI servers
app = create_app('production')

if __name__ == "__main__":
    app.run()