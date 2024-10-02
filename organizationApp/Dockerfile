# Use Python base image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy and install requirements
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the app code
COPY . .

# Expose the Flask port
EXPOSE 5000
#Ensure that your Dockerfile is set up to copy your .env file
COPY .env ./

# Start the app
CMD ["python", "app.py"]