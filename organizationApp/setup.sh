#!/bin/bash

# Set up a Python virtual environment, install dependencies, and run the app

echo "Setting up virtual environment..."
python3 -m venv venv

echo "Activating virtual environment..."
source .venv/bin/activate

echo "Installing dependencies..."
pip install -r requirements.txt

echo "Don't forget to create a .env file with MongoDB and Cloudinary credentials!"

echo "The app is ready to run. Use 'npm start' to run the app."