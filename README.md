# YouTube Task Scheduler

A modern web application that helps you schedule and manage your YouTube tasks efficiently. Built with Next.js, Express, and PostgreSQL.

## Features

- YouTube playlist management
- Task scheduling and automation
- User authentication
- Modern UI with Tailwind CSS
- Real-time updates
- Google AI integration for content suggestions

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Express.js, TypeScript, Prisma
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **AI Integration**: Google Generative AI
- **Containerization**: Docker & Docker Compose

## Prerequisites

- Node.js 20.x
- Docker and Docker Compose (for Docker setup)
- PostgreSQL (for local setup)
- Google Cloud Platform account (for YouTube API)

## Getting Started

### Using Docker (Recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/youtube-task-scheduler.git
   cd youtube-task-scheduler
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@db:5432/youtube_scheduler"

   # Google OAuth
   GOOGLE_CLIENT_ID="your-client-id"
   GOOGLE_CLIENT_SECRET="your-client-secret"

   # JWT
   JWT_SECRET="your-jwt-secret"

   # Other configurations
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret"
   ```

3. Start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Database: localhost:5432

### Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/youtube-task-scheduler.git
   cd youtube-task-scheduler
   ```

2. Set up the database:
   ```bash
   # Create a PostgreSQL database
   createdb youtube_scheduler
   ```

3. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and server directories
   - Update the variables with your configuration

5. Generate Prisma client:
   ```bash
   cd server
   npx prisma generate
   ```

6. Start the development servers:
   ```bash
   # Terminal 1 - Frontend
   cd frontend
   npm run dev

   # Terminal 2 - Backend
   cd server
   npm run dev
   ```

## Development

### Available Scripts

Frontend:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

Backend:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all CI checks pass

## CI/CD

The project uses GitHub Actions for continuous integration:
- Linting and formatting checks run on every PR
- Build verification runs after linting passes
- Automated testing (coming soon)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers. 