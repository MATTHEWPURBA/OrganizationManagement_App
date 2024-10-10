import logging
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS  # Import Flask-CORS
from werkzeug.utils import secure_filename
import os
from bson import ObjectId
from dotenv import load_dotenv
import cloudinary
import cloudinary.uploader
import cloudinary.api


# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)  # This will allow requests from any origin by default

# MongoDB Configuration
app.config["MONGO_URI"] = os.getenv('MONGO_URI')
mongo = PyMongo(app)

# Cloudinary Configuration
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

members = mongo.db.members

# GET Member List with search and pagination
@app.route('/members', methods=['GET'])
def get_members():
    search_query = request.args.get('search', '')
    page = int(request.args.get('page', 1))
    per_page = 10

    query = {}
    if search_query:
        # Search for members where 'name' or 'reports_to' contains the search query
        query = {
            "$or": [
                {"name": {"$regex": search_query, "$options": "i"}},
                {"reports_to": {"$regex": search_query, "$options": "i"}}
            ]
        }

    total_members = members.count_documents(query)
    paginated_members = members.find(query).skip((page - 1) * per_page).limit(per_page)

    member_list = [
        {"_id": str(member["_id"]), "name": member["name"], "position": member["position"], "picture": member["picture"], "reports_to": member["reports_to"]}
        for member in paginated_members
    ]
    return jsonify({
        "members": member_list,
        "page": page,
        "total_pages": (total_members // per_page) + 1
    })



# POST Create Member with Cloudinary image upload
@app.route('/members', methods=['POST'])
def add_member():
    try:
        logger.debug("Received POST request at /members")
        logger.debug("Request form data: %s", request.form)
        logger.debug("Request files data: %s", request.files)

        name = request.form.get('name')
        position = request.form.get('position')
        reports_to = request.form.get('reports_to')
        picture = request.files.get('picture')

        # Check for required fields
        if not name:
            logger.error("Name is missing.")
            return jsonify({"error": "Name is required."}), 400
        if not position:
            logger.error("Position is missing.")
            return jsonify({"error": "Position is required."}), 400
        if not picture:
            logger.error("Picture is missing.")
            return jsonify({"error": "Picture is required."}), 400

        # Upload the picture to Cloudinary
        try:
            upload_result = cloudinary.uploader.upload(picture)
            picture_url = upload_result['secure_url']  # Get the secure Cloudinary URL
        except Exception as e:
            logger.error("Error uploading picture to Cloudinary: %s", str(e))
            return jsonify({"error": "Failed to upload picture."}), 500

        # Insert member into MongoDB
        new_member = {
            "name": name,
            "position": position,
            "reports_to": reports_to,
            "picture": picture_url  # Store the Cloudinary URL in the database
        }

        result = members.insert_one(new_member)
        logger.debug("Member added successfully: %s", new_member)

        return jsonify({"message": "Member added", "member_id": str(result.inserted_id)}), 201

    except Exception as e:
        logger.error("Error occurred during POST /members: %s", str(e))
        return jsonify({"error": str(e)}), 400



# GET Member Detail
@app.route('/members/<member_id>', methods=['GET'])
def get_member_detail(member_id):
    try:
        member = members.find_one({"_id": ObjectId(member_id)})
        if not member:
            logger.error("Member with ID %s not found.", member_id)
            return jsonify({"error": "Member not found"}), 404

        member_detail = {
            "_id": str(member["_id"]),
            "name": member["name"],
            "position": member["position"],
            "reports_to": member.get("reports_to", "N/A"),
            "picture": member["picture"]
        }
        return jsonify(member_detail)

    except Exception as e:
        logger.error("Error fetching member details for ID %s: %s", member_id, str(e))
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)