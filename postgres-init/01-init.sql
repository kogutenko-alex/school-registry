-- PostgreSQL initialization script for School Registry
-- This script ensures the database is properly configured

-- Create the database if it doesn't exist (PostgreSQL Docker image already creates it from POSTGRES_DB)
-- But we can add any additional setup here

-- Grant permissions to the user
GRANT ALL PRIVILEGES ON DATABASE schooldb TO "user";

-- Set timezone
SET timezone = 'Europe/Kiev';

-- Log successful initialization
DO $$
BEGIN
    RAISE NOTICE 'School Registry database initialized successfully';
END $$; 
 