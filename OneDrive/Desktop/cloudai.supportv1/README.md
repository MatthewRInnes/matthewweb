# Cloud AI Support

A modern AI support platform built with React, TypeScript, and Prisma.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cloudai.support.git
   cd cloudai.support
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL**
   - Install PostgreSQL if you haven't already
   - Create a new database named `marketspace`
   - Update the `.env` file with your database credentials:
     ```
     DATABASE_URL="postgresql://your_username:your_password@localhost:5432/marketspace"
     ```

4. **Set up environment variables**
   ```bash
   npm run env:generate        # For development
   npm run env:generate:prod   # For production
   ```
   Then update the generated `.env` files with your actual values.

5. **Initialize the database**
   ```bash
   npm run prisma:generate    # Generate Prisma client
   npm run prisma:migrate     # Run database migrations
   npm run prisma:seed        # Seed the database with test data
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Access the application**
   - Open http://localhost:5173 in your browser
   - Login with test credentials:
     - Admin: admin@cloudai.support / admin123
     - User: user@cloudai.support / user123

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run prisma:studio` - Open Prisma Studio (database GUI)
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed the database

## Project Structure

```
cloudai.support/
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── config/          # Configuration files
│   ├── pages/           # Page components
│   ├── styles/          # Global styles
│   ├── types/           # TypeScript types
│   └── utils/           # Utility functions
├── .env                 # Environment variables
├── package.json         # Project dependencies
└── README.md           # Project documentation
```

## Features

- User authentication and authorization
- AI support ticket management
- Customer support dashboard
- Real-time chat functionality
- Responsive design
- Dark/Light mode
- Type-safe database operations with Prisma

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
