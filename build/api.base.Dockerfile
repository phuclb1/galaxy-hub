FROM python:3.10-slim

RUN apt-get update && apt-get install -y \
    gcc curl \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*
RUN curl -sL https://aka.ms/InstallAzureCLIDeb | bash
COPY api/requirements requirements
RUN pip install --upgrade pip
RUN pip install -r requirements
