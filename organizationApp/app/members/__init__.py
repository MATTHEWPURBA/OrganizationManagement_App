from flask import Blueprint

# Define the blueprint for members, with a URL prefix for all member-related routes
members_bp = Blueprint('members', __name__, url_prefix='/members')

# Import the routes from the routes.py file, which will be registered under this blueprint
from . import routes