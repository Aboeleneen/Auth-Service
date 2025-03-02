# NestJS Authentication API

A secure authentication system built with NestJS, MongoDB, and JWT.

## Features

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- MongoDB integration
- Swagger API documentation
- Input validation
- Protected routes
- CORS enabled

## Prerequisites

- Node.js (>= 18.16.0)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
MONGODB_URI=mongodb://localhost/auth-demo
JWT_SECRET=your-secret-key
PORT=3000
```

## Running the Application

### Development
```bash
npm run start:dev
```

### Production
```bash
npm run build
npm run start:prod
```

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

## Security Features
- Password hashing using bcrypt
- JWT-based authentication
- Input validation using class-validator
- Protected routes using Guards
- CORS enabled

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Docker

This application can be run using Docker and Docker Compose.

### Prerequisites

- Docker
- Docker Compose

### Running with Docker Compose

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Create a `.env` file based on the `.env.example` file:
```bash
cp .env.example .env
```

3. Update the environment variables in the `.env` file as needed. The default values in `.env.example` are configured to work with Docker Compose.

4. Build and start the containers:
```bash
docker-compose up -d
```

5. Access the application at `http://localhost:3000` and the Swagger API documentation at `http://localhost:3000/api`.

### Building and Running the Docker Image Manually

1. Build the Docker image:
```bash
docker build -t nestjs-app .
```

2. Run the container:
```bash
docker run -p 3000:3000 --env-file .env nestjs-app
```

### Stopping the Containers

```bash
docker-compose down
```

### Removing Volumes

```bash
docker-compose down -v
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
