#!/usr/bin/env node
import { execSync } from 'child_process';
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

const program = new Command();

program
  .name('setup-db')
  .description('Database setup utility')
  .version('1.0.0');

program
  .command('create')
  .description('Create the database')
  .action(() => {
    try {
      // Create database using psql
      execSync('psql -U postgres -c "CREATE DATABASE marketspace;"', { stdio: 'inherit' });
      console.log('✅ Database created successfully');
    } catch (error) {
      console.error('❌ Failed to create database:', error);
      process.exit(1);
    }
  });

program
  .command('migrate')
  .description('Run database migrations')
  .action(() => {
    try {
      const migrationFile = path.join(process.cwd(), 'prisma/migrations/20240408_init/migration.sql');
      if (!fs.existsSync(migrationFile)) {
        console.error('❌ Migration file not found');
        process.exit(1);
      }

      // Run migration using psql
      execSync(`psql -U postgres -d marketspace -f "${migrationFile}"`, { stdio: 'inherit' });
      console.log('✅ Migrations applied successfully');
    } catch (error) {
      console.error('❌ Failed to apply migrations:', error);
      process.exit(1);
    }
  });

program
  .command('seed')
  .description('Seed the database with test data')
  .action(() => {
    try {
      // Run the seed script
      execSync('npx ts-node prisma/seed.ts', { stdio: 'inherit' });
      console.log('✅ Database seeded successfully');
    } catch (error) {
      console.error('❌ Failed to seed database:', error);
      process.exit(1);
    }
  });

program
  .command('reset')
  .description('Reset the database (drop and recreate)')
  .action(() => {
    try {
      // Drop and recreate database
      execSync('psql -U postgres -c "DROP DATABASE IF EXISTS marketspace;"', { stdio: 'inherit' });
      execSync('psql -U postgres -c "CREATE DATABASE marketspace;"', { stdio: 'inherit' });
      console.log('✅ Database reset successfully');

      // Run migrations
      const migrationFile = path.join(process.cwd(), 'prisma/migrations/20240408_init/migration.sql');
      execSync(`psql -U postgres -d marketspace -f "${migrationFile}"`, { stdio: 'inherit' });
      console.log('✅ Migrations applied successfully');

      // Seed the database
      execSync('npx ts-node prisma/seed.ts', { stdio: 'inherit' });
      console.log('✅ Database seeded successfully');
    } catch (error) {
      console.error('❌ Failed to reset database:', error);
      process.exit(1);
    }
  });

program.parse(process.argv); 