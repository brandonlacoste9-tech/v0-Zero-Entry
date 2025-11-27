-- ZeroEntry Database Schema
-- Tables for document processing SaaS

-- Documents table to store uploaded documents
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  document_type TEXT DEFAULT 'invoice',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Extractions table to store AI-extracted data
CREATE TABLE IF NOT EXISTS extractions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  extracted_data JSONB NOT NULL,
  accuracy DECIMAL(5,2),
  processing_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Usage tracking for billing
CREATE TABLE IF NOT EXISTS usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  month TEXT NOT NULL, -- Format: YYYY-MM
  documents_processed INTEGER DEFAULT 0,
  extractions_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, month)
);

-- Enable Row Level Security
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE extractions ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies for documents
CREATE POLICY "Users can view their own documents" ON documents 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own documents" ON documents 
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own documents" ON documents 
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own documents" ON documents 
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for extractions
CREATE POLICY "Users can view their own extractions" ON extractions 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own extractions" ON extractions 
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own extractions" ON extractions 
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for usage
CREATE POLICY "Users can view their own usage" ON usage 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own usage" ON usage 
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own usage" ON usage 
  FOR UPDATE USING (auth.uid() = user_id);
