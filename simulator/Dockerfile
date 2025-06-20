# Use official Python slim image
FROM python:3.11-slim

# Set working directory inside the container
WORKDIR /app

# Copy requirements and install dependencies
COPY ../requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy simulator code into container
COPY ../simulator ./simulator

# Set environment variables (optional)
ENV PYTHONUNBUFFERED=1

# Run the simulator script
CMD ["python", "-m", "simulator.simulator"]
