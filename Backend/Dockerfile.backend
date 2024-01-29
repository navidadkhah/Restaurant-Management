# Use an official Python runtime as a base image
FROM python:3.7

# Set the working directory in the container
WORKDIR /code

COPY requirements.txt /code/

RUN pip install -r requirements.txt

COPY . /code/
