import pytest
from app import app, mongo  # Assuming the Flask app is in app.py
from io import BytesIO  # Import BytesIO for in-memory file handling
from bson import ObjectId


# Update the MongoDB URI to disable SSL certificate verification (for testing only)
app.config["MONGO_URI"] = "mongodb+srv://robhertomatt:fUXnIeOawtC0hdGk@management-app.bxzr1.mongodb.net/Test-Management-App?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE"

# Fixture to set up the test client
@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

# Fixture to clean up the database before and after each test
@pytest.fixture(autouse=True)
def clean_database():
    # Clean up the 'members' collection before and after each test
    members_collection = mongo.db.members
    members_collection.delete_many({})  # Clear all records before test
    yield
    members_collection.delete_many({})  # Clear all records after test

# Test for the POST /members endpoint
def test_add_member(client):
    # Read the image into memory using BytesIO
    with open('test_images/profile.jpg', 'rb') as img:
        image_data = BytesIO(img.read())
    
    # Simulate a request to the add_member endpoint
    data = {
        'name': 'John Doe',
        'position': 'Developer',
        'reports_to': 'Jane Smith',
        'picture': (image_data, 'profile.jpg')
    }
    
    response = client.post('/members', data=data, content_type='multipart/form-data')
    
    # Check if the response code is 201 (Created)
    assert response.status_code == 201
    response_json = response.get_json()
    
    # Check that the member_id is present in the response
    assert "member_id" in response_json
    print("Add member response:", response_json)

# Test for the GET /members endpoint
def test_get_members(client):
    # Add a test member to the database
    members_collection = mongo.db.members
    members_collection.insert_one({
        "name": "Jane Doe",
        "position": "Designer",
        "reports_to": "John Smith",
        "picture": "test_images/profile.jpg"
    })
    
    # Simulate a request to the get_members endpoint
    response = client.get('/members')
    
    # Check if the response code is 200 (OK)
    assert response.status_code == 200
    response_json = response.get_json()
    
    # Check that the returned member list contains the expected data
    assert len(response_json['members']) == 1
    assert response_json['members'][0]['name'] == "Jane Doe"
    print("Get members response:", response_json)

# Test for the GET /members/<member_id> endpoint
def test_get_member_detail(client):
    # Add a test member to the database
    members_collection = mongo.db.members
    member_id = members_collection.insert_one({
        "name": "Jane Doe",
        "position": "Designer",
        "reports_to": "John Smith",
        "picture": "test_images/profile.jpg"
    }).inserted_id
    
    # Simulate a request to the get_member_detail endpoint
    response = client.get(f'/members/{str(member_id)}')
    
    # Check if the response code is 200 (OK)
    assert response.status_code == 200
    response_json = response.get_json()
    
    # Check that the returned member details match the inserted data
    assert response_json['_id'] == str(member_id)
    assert response_json['name'] == "Jane Doe"
    print("Get member detail response:", response_json)

# Test for the GET /members with pagination and search
def test_get_members_with_pagination_and_search(client):
    # Add multiple members to the database
    members_collection = mongo.db.members
    members_collection.insert_many([
        {"name": "Jane Doe", "position": "Designer", "reports_to": "John Smith", "picture": "test_images/profile.jpg"},
        {"name": "John Doe", "position": "Developer", "reports_to": "Jane Smith", "picture": "test_images/profile.jpg"},
        {"name": "Anna Doe", "position": "Manager", "reports_to": "Jane Doe", "picture": "test_images/profile.jpg"}
    ])
    
    # Test search functionality (search for "Jane")
    response = client.get('/members?search=Jane')
    assert response.status_code == 200
    response_json = response.get_json()
    
    # Expect to find 2 members with the name "Jane" (case-insensitive search)
    assert len(response_json['members']) == 3

    # Check that "Jane Doe" is in the results (order may not matter)
    print("Search members response:", response_json)
    member_names = [member['name'] for member in response_json['members']]
    assert "Jane Doe" in member_names
    assert "John Doe" in member_names
    assert "Anna Doe" in member_names


    # Test pagination (get page 1 with 2 members per page)
    response = client.get('/members?page=1')
    assert response.status_code == 200
    response_json = response.get_json()
    
