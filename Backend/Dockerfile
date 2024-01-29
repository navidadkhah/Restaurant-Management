# Use an official Python runtime as a base image
FROM python:3.7

# Set the working directory in the container
WORKDIR /Backend

COPY . /Backend

COPY requirements.txt . 

RUN pip install -r requirements.txt

COPY . . 

EXPOSE 8000

CMD ["python","manage.py","runserver"]