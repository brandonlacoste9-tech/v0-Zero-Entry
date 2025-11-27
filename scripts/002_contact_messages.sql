-- Contact form messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public contact form)
CREATE POLICY "Anyone can submit contact form" ON contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated admins can read (you'd add admin role later)
CREATE POLICY "Only admins can read messages" ON contact_messages
  FOR SELECT TO authenticated
  USING (true);
