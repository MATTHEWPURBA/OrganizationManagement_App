from flask import Flask
from .config import Config
from .extensions import mongo, cors
from .members import members_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    mongo.init_app(app)
    cors.init_app(app)
    
    # Register blueprints
    app.register_blueprint(members_bp)
    print("Members blueprint registered!")  # Debugging statement

    
    return app