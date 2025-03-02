# NestJS Authentication API

A secure authentication system built with NestJS, MongoDB, and JWT.

## Features

- User registration and login
- JWT-based authentication
- Password and refresh token hashing with bcrypt
- MongoDB integration
- Swagger API documentation
- Input validation
- Protected routes
- CORS enabled
- Docker Compose
- validation of environment variables with Joi

## Prerequisites

- Docker and Docker Compose

## Installation & Running the Application

1. Clone the repository:
```bash
git clone https://github.com/Aboeleneen/Auth-Service.git
cd Auth-Service
```

2. Create a `.env` file based on the `.env.example` file:
```bash
cp .env.example .env
```

3. The default values in `.env.example` are configured to work with Docker Compose. Make sure to use the MongoDB URI with the Docker service name:
```
MONGODB_URI=mongodb://mongodb:27017/nestjs-db
```

4. Build and start the containers:
```bash
docker-compose up -d
```

This will start:
- The NestJS application on the port specified in your .env file (default: 3000)
- MongoDB database service on port 27017
- Both services will be connected via a Docker network

5. Access the application at `http://localhost:3000` and the Swagger API documentation at `http://localhost:3000/api`.

## API Documentation

Once the application is running, you can access the Swagger API documentation at:
```
http://localhost:3000/api
```

### Available Endpoints

#### Authentication
- `POST /auth/register` - Register a new user
  - Body: `{ "email": "string", "name": "string", "password": "string" }`
- `POST /auth/login` - Login user
  - Body: `{ "email": "string", "password": "string" }`
- `GET /auth/profile` - Get user profile (Protected route)
  - Header: `Authorization: Bearer <token>`

## Password Requirements
- Minimum length: 8 characters
- Must contain at least one letter
- Must contain at least one number
- Must contain at least one special character

## Docker Commands

### Stopping the Containers

```bash
docker-compose down
```

### Removing Volumes

To stop the containers and remove the MongoDB data volume:
```bash
docker-compose down -v
```

### Viewing Logs

To view the logs of the running containers:
```bash
docker-compose logs
```

To follow the logs in real-time:
```bash
docker-compose logs -f
```