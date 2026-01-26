-- File: supabase/migrations/YYYYMMDD_add_image_uploads.sql
CREATE TABLE IF NOT EXISTS image_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL CHECK (content_type IN ('lesson', 'quiz_question')),
  content_id UUID NOT NULL,
  block_id TEXT NOT NULL, -- matches block.id in content_blocks JSONB

  -- Original image metadata
  bucket_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  mime_type TEXT NOT NULL,
  width INTEGER,
  height INTEGER,

  -- Vectorization fields
  vectorized_path TEXT,
  vectorized_size_bytes BIGINT,
  vectorization_status TEXT DEFAULT 'not_requested'
    CHECK (vectorization_status IN ('not_requested', 'pending', 'processing', 'completed', 'failed')),
  vectorization_error TEXT,
  vectorized_at TIMESTAMPTZ,

  -- Optional semantic metadata
  alt_text TEXT,
  caption TEXT,

  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_image_uploads_content ON image_uploads(content_type, content_id);
CREATE INDEX idx_image_uploads_block ON image_uploads(block_id);
CREATE INDEX idx_image_uploads_status ON image_uploads(vectorization_status);

-- Enable Row-Level Security
ALTER TABLE image_uploads ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view all image uploads"
  ON image_uploads FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own uploads"
  ON image_uploads FOR INSERT
  TO authenticated
  WITH CHECK (uploaded_by = auth.uid());

CREATE POLICY "Users can update their own uploads"
  ON image_uploads FOR UPDATE
  TO authenticated
  USING (uploaded_by = auth.uid());

CREATE POLICY "Users can delete their own uploads"
  ON image_uploads FOR DELETE
  TO authenticated
  USING (uploaded_by = auth.uid());