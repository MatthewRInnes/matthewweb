# Create .gitignore
echo node_modules > .gitignore
echo .next >> .gitignore
echo .env >> .gitignore
echo .env.local >> .gitignore

# Remove existing directory
rd /s /q modern-marketspace

# Then clone again
git clone https://github.com/MatthewRInnes/modern-marketspace.git modern-marketspace-new

# Push to GitHub
git push -u origin main

# Go to Desktop
cd %USERPROFILE%\Desktop

# Go into the existing directory
cd modern-marketspace

# Fetch the latest changes
git fetch origin

# Reset to match the remote repository
git reset --hard origin/main

# Go to the project directory
cd %USERPROFILE%\Desktop\project-one

# Clear any existing installation
rd /s /q node_modules
del package-lock.json

# Install dependencies
npm install next react react-dom @prisma/client
npm install --save-dev typescript @types/react @types/node

# Start the development server
npm run dev

# Create the database
createdb project_one

# Run migrations
psql -d project_one -f src/db/migrations/001_initial.sql

# Create .env file
echo DATABASE_URL="postgresql://postgres:your_password@localhost:5432/project_one" > .env
echo JWT_SECRET="your-secret-key" >> .env

# Connect to database
psql -d project_one

# Inside psql, check tables
\dt

# Check if we have any data
SELECT * FROM users;
SELECT * FROM items;

-- Add test users
INSERT INTO users (id, email, password, name) VALUES 
('user1', 'test@example.com', '$2a$10$testpasswordhash', 'Test User'),
('user2', 'jane@example.com', '$2a$10$testpasswordhash', 'Jane Smith');

-- Add test items
INSERT INTO items (id, title, description, price, category, condition, seller_id) VALUES 
('item1', 'iPhone 13', 'Like new condition', 699.99, 'Electronics', 'Used', 'user1'),
('item2', 'Mountain Bike', 'Great for trails', 299.99, 'Sports', 'New', 'user2'),
('item3', 'Coffee Maker', 'Premium coffee machine', 89.99, 'Home', 'New', 'user1');

# Navigate to your home directory
cd %USERPROFILE%

# Create .npmrc file
echo registry=https://registry.npmjs.org/ > .npmrc

# Create tsconfig.json
npx tsc --init

# Create next.config.js
echo module.exports = { reactStrictMode: true } > next.config.js