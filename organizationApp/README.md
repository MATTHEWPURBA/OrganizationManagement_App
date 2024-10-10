Here's the updated `README.md` with the steps to set up and run the Flask backend:

---

# Flask Backend Setup Guide

Follow the steps below to set up and run the Flask backend on your local machine:

### Prerequisites
- Python 3.x (3.12 recommended)
- Node.js and npm installed
- MongoDB and Cloudinary credentials

### 1. Clone the Repository

Start by cloning the repository to your local machine and navigate into the project directory:

```bash
git clone https://github.com/MATTHEWPURBA/OrganizationManagement_App.git
cd organizationApp
```

### 2. Install Node Dependencies

To install all necessary Node.js dependencies, run:

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the `.env.example` file and create your own `.env` file:

```bash
npm run env
```

Once copied, open the `.env` file and add your MongoDB URI and Cloudinary credentials.

### 4. Set Up Python Environment and Dependencies

To set up the Python virtual environment and install the required Python dependencies, run:

```bash
npm run setup
```

This will:
- Create a virtual environment in the `.venv` folder.
- Install all necessary Python packages listed in `requirements.txt`.

### 5. Start the Flask Backend

After setting up everything, you can start the Flask app by running:

```bash
npm run start
```

This will:
- Activate the virtual environment.
- Start the Flask backend on `http://127.0.0.1:5001`.

### Notes:
- Ensure that your `.env` file is properly configured with your MongoDB URI and Cloudinary credentials.
- The app will run locally on port `5001` unless otherwise configured.

### License

This project is licensed under the ISC License.

---

This updated guide is more streamlined and fits within the new `package.json` workflow, making it easier for others to follow along.