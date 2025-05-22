#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { Command } from 'commander';

const program = new Command();

// Define the program
program
  .name('env-manager')
  .description('CLI to manage environment variables')
  .version('1.0.0');

// Command to validate environment files
program
  .command('validate')
  .description('Validate environment files')
  .option('-e, --env <env>', 'Environment to validate (development/production)')
  .action((options) => {
    const env = options.env || 'development';
    const envFile = path.join(process.cwd(), `.env.${env}`);
    
    if (!fs.existsSync(envFile)) {
      console.error(`❌ Environment file not found: ${envFile}`);
      process.exit(1);
    }

    try {
      // Run the TypeScript validation
      execSync('npx ts-node src/utils/env.ts', { stdio: 'inherit' });
      console.log(`✅ Environment validation successful for ${env}`);
    } catch (error) {
      console.error(`❌ Environment validation failed for ${env}`);
      process.exit(1);
    }
  });

// Command to generate environment files
program
  .command('generate')
  .description('Generate environment files from example')
  .option('-e, --env <env>', 'Environment to generate (development/production)')
  .action((options) => {
    const env = options.env || 'development';
    const exampleFile = path.join(process.cwd(), '.env.example');
    const envFile = path.join(process.cwd(), `.env.${env}`);

    if (!fs.existsSync(exampleFile)) {
      console.error('❌ Example environment file not found');
      process.exit(1);
    }

    if (fs.existsSync(envFile)) {
      console.log(`⚠️ Environment file already exists: ${envFile}`);
      return;
    }

    try {
      const exampleContent = fs.readFileSync(exampleFile, 'utf8');
      fs.writeFileSync(envFile, exampleContent);
      console.log(`✅ Generated environment file: ${envFile}`);
    } catch (error) {
      console.error(`❌ Failed to generate environment file: ${error}`);
      process.exit(1);
    }
  });

// Command to check for missing environment variables
program
  .command('check')
  .description('Check for missing environment variables')
  .option('-e, --env <env>', 'Environment to check (development/production)')
  .action((options) => {
    const env = options.env || 'development';
    const envFile = path.join(process.cwd(), `.env.${env}`);
    const exampleFile = path.join(process.cwd(), '.env.example');

    if (!fs.existsSync(envFile) || !fs.existsSync(exampleFile)) {
      console.error('❌ Environment files not found');
      process.exit(1);
    }

    try {
      const envContent = fs.readFileSync(envFile, 'utf8');
      const exampleContent = fs.readFileSync(exampleFile, 'utf8');

      const envVars = new Set(envContent.split('\n').map(line => line.split('=')[0]));
      const exampleVars = new Set(exampleContent.split('\n').map(line => line.split('=')[0]));

      const missingVars = [...exampleVars].filter(varName => !envVars.has(varName));

      if (missingVars.length > 0) {
        console.log(`❌ Missing environment variables in ${env}:`);
        missingVars.forEach(varName => console.log(`  - ${varName}`));
        process.exit(1);
      }

      console.log(`✅ All environment variables present in ${env}`);
    } catch (error) {
      console.error(`❌ Failed to check environment variables: ${error}`);
      process.exit(1);
    }
  });

// Parse command line arguments
program.parse(process.argv); 