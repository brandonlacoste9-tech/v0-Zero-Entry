-- User profiles with credits for the managed service model
-- Free: 3 credits, Pro: 500 credits, Business: 2000 credits

CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'business')),
  credits INTEGER DEFAULT 3,
  total_documents_processed INTEGER DEFAULT 0,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own profile" ON user_profiles 
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON user_profiles 
  FOR UPDATE USING (auth.uid() = id);

-- Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, plan, credits)
  VALUES (NEW.id, NEW.email, 'free', 3);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on auth.users insert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to deduct credits (called from app)
CREATE OR REPLACE FUNCTION deduct_credit(user_uuid UUID)
RETURNS TABLE (success BOOLEAN, remaining_credits INTEGER, message TEXT) AS $$
DECLARE
  current_credits INTEGER;
BEGIN
  SELECT credits INTO current_credits FROM user_profiles WHERE id = user_uuid;
  
  IF current_credits IS NULL THEN
    RETURN QUERY SELECT FALSE, 0, 'User profile not found'::TEXT;
    RETURN;
  END IF;
  
  IF current_credits <= 0 THEN
    RETURN QUERY SELECT FALSE, 0, 'Insufficient credits. Please upgrade your plan.'::TEXT;
    RETURN;
  END IF;
  
  UPDATE user_profiles 
  SET credits = credits - 1, 
      total_documents_processed = total_documents_processed + 1,
      updated_at = NOW()
  WHERE id = user_uuid;
  
  RETURN QUERY SELECT TRUE, current_credits - 1, 'Credit deducted successfully'::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
