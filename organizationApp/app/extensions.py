from flask_pymongo import PyMongo
from flask_cors import CORS
import cloudinary
import os


mongo = PyMongo()
cors = CORS()

cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)