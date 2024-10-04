import logging
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from werkzeug.utils import secure_filename
import os
from bson import ObjectId
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# MongoDB Configuration
app.config["MONGO_URI"] = os.getenv('MONGO_URI')
mongo = PyMongo(app)

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Folder to save uploaded pictures
app.config['UPLOAD_FOLDER'] = './uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

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
        {"_id": str(member["_id"]), "name": member["name"], "position": member["position"]}
        for member in paginated_members
    ]
    return jsonify({
        "members": member_list,
        "page": page,
        "total_pages": (total_members // per_page) + 1
    })



# POST Create Member with picture upload
@app.route('/members', methods=['POST'])
def add_member():
    try:
        # Log incoming request data
        logger.debug("Received POST request at /members")
        logger.debug("Request form data: %s", request.form)
        logger.debug("Request files data: %s", request.files)

        # data = request.get_json()  # Get the JSON payload
        # name = data.get('name')
        # position = data.get('position')
        # reports_to = data.get('reports_to')
        # picture_base64 = data.get('picture')  # Expecting Base64 string
        
        name = request.form.get('name')
        position = request.form.get('position')
        reports_to = request.form.get('reports_to')
        picture = request.files.get('picture')  # Still use request.files for file uploads

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

        # If a picture is uploaded, handle the file upload
        picture_path = None
        if picture:
            filename = secure_filename(picture.filename)
            picture_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            try:
                picture.save(picture_path)
            except Exception as e:
                logger.error("Error saving picture: %s", str(e))
                return jsonify({"error": "Failed to save picture."}), 500

        # Save the picture
        # filename = secure_filename(picture.filename)
        # picture_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        # picture.save(picture_path)

        # Insert member into MongoDB
        new_member = {
            "name": name,
            "position": position,
            "reports_to": reports_to,
            "picture": picture_path
        }
        

        result = members.insert_one(new_member)
        logger.debug("Member added successfully: %s", new_member)

        return jsonify({"message": "Member added", "member_id": str(result.inserted_id)}), 201

    except Exception as e:
        # Log full exception details
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