FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
  apt-get install -y --no-install-recommends \
  gcc \
  python3-dev \
  && rm -rf /var/lib/apt/lists/*

# Copy requirements first to leverage Docker cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY agent/ ./agent/

# Set environment variables
ENV PYTHONUNBUFFERED=1

CMD ["python", "-m", "agent.agent"] 