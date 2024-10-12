from flask import jsonify
from bson import ObjectId
from ..extensions import mongo, cloudinary

class MembersService:

    @staticmethod
    def get_members(params):
        search_query = params.get('search', '')
        page = int(params.get('page', 1))
        per_page = 10
        query = {}
        if search_query:
            query = {
                "$or": [
                    {"name": {"$regex": search_query, "$options": "i"}},
                    {"reports_to": {"$regex": search_query, "$options": "i"}}
                ]
            }
        members_collection = mongo.db.members
        total_members = members_collection.count_documents(query)
        paginated_members = members_collection.find(query).skip((page - 1) * per_page).limit(per_page)
        
        members = [
            {"_id": str(member["_id"]), "name": member["name"], "position": member["position"], "picture": member["picture"], "reports_to": member["reports_to"]}
            for member in paginated_members
        ]
        
        return jsonify({"members": members, "page": page, "total_pages": (total_members // per_page) + 1})

    @staticmethod
    def add_member(form, files):
        name = form.get('name')
        position = form.get('position')
        reports_to = form.get('reports_to')
        picture = files.get('picture')

        if not all([name, position, picture]):
            return jsonify({"error": "All fields are required"}), 400
        
        # Upload image to Cloudinary
        upload_result = cloudinary.uploader.upload(picture)
        picture_url = upload_result.get('secure_url')

        new_member = {"name": name, "position": position, "reports_to": reports_to, "picture": picture_url}
        
        members_collection = mongo.db.members
        result = members_collection.insert_one(new_member)
        return jsonify({"message": "Member added", "member_id": str(result.inserted_id)}), 201

    @staticmethod
    def get_member_detail(member_id):
        members_collection = mongo.db.members
        member = members_collection.find_one({"_id": ObjectId(member_id)})
        if not member:
            return jsonify({"error": "Member not found"}), 404
        
        member_detail = {"_id": str(member["_id"]), "name": member["name"], "position": member["position"], "reports_to": member["reports_to"], "picture": member["picture"]}
        return jsonify(member_detail)