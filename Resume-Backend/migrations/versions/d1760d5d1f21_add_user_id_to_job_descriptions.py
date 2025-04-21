"""Add user_id to job_descriptions

Revision ID: d1760d5d1f21
Revises: 7cdb8de59932
Create Date: 2024-03-19 14:42:42.123456

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd1760d5d1f21'
down_revision = '7cdb8de59932'
branch_labels = None
depends_on = None


def upgrade():
    # Create sequence for new integer IDs
    op.execute('CREATE SEQUENCE IF NOT EXISTS user_id_seq')
    
    # Add temp_id column to users table
    op.execute("""
        ALTER TABLE users 
        ADD COLUMN temp_id INTEGER DEFAULT nextval('user_id_seq')
    """)
    
    # Drop foreign key constraints first
    op.execute("""
        ALTER TABLE analysis_results
        DROP CONSTRAINT IF EXISTS analysis_results_user_id_fkey
    """)
    
    op.execute("""
        ALTER TABLE uploads
        DROP CONSTRAINT IF EXISTS uploads_user_id_fkey
    """)
    
    # Add temporary columns for user IDs
    op.execute("""
        ALTER TABLE analysis_results
        ADD COLUMN temp_user_id INTEGER
    """)
    
    op.execute("""
        ALTER TABLE uploads
        ADD COLUMN temp_user_id INTEGER
    """)
    
    # Update the temporary columns with the new integer IDs
    op.execute("""
        UPDATE analysis_results ar
        SET temp_user_id = u.temp_id
        FROM users u
        WHERE ar.user_id = u.id
    """)
    
    op.execute("""
        UPDATE uploads up
        SET temp_user_id = u.temp_id
        FROM users u
        WHERE up.user_id = u.id
    """)
    
    # Drop old columns and rename temp columns
    op.execute("""
        ALTER TABLE analysis_results
        DROP COLUMN user_id;
        
        ALTER TABLE analysis_results
        ALTER COLUMN temp_user_id SET NOT NULL;
        
        ALTER TABLE analysis_results
        RENAME temp_user_id TO user_id
    """)
    
    op.execute("""
        ALTER TABLE uploads
        DROP COLUMN user_id;
        
        ALTER TABLE uploads
        ALTER COLUMN temp_user_id SET NOT NULL;
        
        ALTER TABLE uploads
        RENAME temp_user_id TO user_id
    """)
    
    # Update users table
    op.execute("""
        ALTER TABLE users
        DROP COLUMN id CASCADE;
        
        ALTER TABLE users
        ALTER COLUMN temp_id SET NOT NULL;
        
        ALTER TABLE users
        RENAME temp_id TO id;
        
        ALTER TABLE users
        ADD PRIMARY KEY (id)
    """)
    
    # Add foreign key constraints back
    op.execute("""
        ALTER TABLE analysis_results
        ADD CONSTRAINT analysis_results_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES users(id)
    """)
    
    op.execute("""
        ALTER TABLE uploads
        ADD CONSTRAINT uploads_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES users(id)
    """)
    
    # Add user_id column to job_descriptions
    op.execute("""
        ALTER TABLE job_descriptions
        ADD COLUMN user_id INTEGER,
        ADD CONSTRAINT job_descriptions_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES users(id)
    """)
    
    # Update existing job descriptions to have a user_id if possible
    op.execute("""
        UPDATE job_descriptions jd
        SET user_id = u.id
        FROM users u
        WHERE jd.user_id IS NULL
        AND EXISTS (
            SELECT 1 FROM analysis_results ar
            WHERE ar.job_description_id = jd.id
            AND ar.user_id = u.id
        )
    """)


def downgrade():
    # Drop foreign key constraints
    op.execute("""
        ALTER TABLE analysis_results
        DROP CONSTRAINT IF EXISTS analysis_results_user_id_fkey
    """)
    
    op.execute("""
        ALTER TABLE uploads
        DROP CONSTRAINT IF EXISTS uploads_user_id_fkey
    """)
    
    op.execute("""
        ALTER TABLE job_descriptions
        DROP CONSTRAINT IF EXISTS job_descriptions_user_id_fkey
    """)
    
    # Create a new users table with TEXT id
    op.execute("""
        CREATE TABLE users_new (
            id TEXT PRIMARY KEY,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            is_admin BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            last_login TIMESTAMP WITH TIME ZONE
        )
    """)
    
    # Copy data from old table to new table
    op.execute("""
        INSERT INTO users_new (id, email, password_hash, is_admin, created_at, last_login)
        SELECT CAST(id AS TEXT), email, password_hash, is_admin, created_at, last_login
        FROM users
    """)
    
    # Drop old table and rename new table
    op.execute("DROP TABLE users CASCADE")
    op.execute("ALTER TABLE users_new RENAME TO users")
    
    # Create new analysis_results table with TEXT user_id
    op.execute("""
        CREATE TABLE analysis_results_new (
            id SERIAL PRIMARY KEY,
            user_id TEXT NOT NULL,
            job_id INTEGER,
            resume_text TEXT,
            analysis_data JSONB,
            score FLOAT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (job_id) REFERENCES job_descriptions(id)
        )
    """)
    
    # Copy data from old table to new table
    op.execute("""
        INSERT INTO analysis_results_new (id, user_id, job_id, resume_text, analysis_data, score, created_at)
        SELECT id, CAST(user_id AS TEXT), job_id, resume_text, analysis_data, score, created_at
        FROM analysis_results
    """)
    
    # Drop old table and rename new table
    op.execute("DROP TABLE analysis_results CASCADE")
    op.execute("ALTER TABLE analysis_results_new RENAME TO analysis_results")
    
    # Create new uploads table with TEXT user_id
    op.execute("""
        CREATE TABLE uploads_new (
            id SERIAL PRIMARY KEY,
            user_id TEXT NOT NULL,
            file_name TEXT NOT NULL,
            file_path TEXT NOT NULL,
            file_type TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)
    
    # Copy data from old table to new table
    op.execute("""
        INSERT INTO uploads_new (id, user_id, file_name, file_path, file_type, created_at)
        SELECT id, CAST(user_id AS TEXT), file_name, file_path, file_type, created_at
        FROM uploads
    """)
    
    # Drop old table and rename new table
    op.execute("DROP TABLE uploads CASCADE")
    op.execute("ALTER TABLE uploads_new RENAME TO uploads")
    
    # Drop user_id from job_descriptions
    op.execute("""
        ALTER TABLE job_descriptions
        DROP COLUMN user_id
    """)
    
    # Drop the sequence we created
    op.execute('DROP SEQUENCE IF EXISTS user_id_seq')
