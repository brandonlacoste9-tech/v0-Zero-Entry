-- Ensure user profile is created when a new user signs up
-- This trigger automatically creates a profile with 3 free credits

-- First, create or replace the function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, credits, plan, total_documents_processed, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    3,  -- Free tier starts with 3 credits
    'free',
    0,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Ensure deduct_credit function exists and works correctly
CREATE OR REPLACE FUNCTION public.deduct_credit(user_uuid UUID)
RETURNS TABLE(success BOOLEAN, message TEXT, remaining_credits INTEGER) AS $$
DECLARE
  current_credits INTEGER;
BEGIN
  -- Get current credits with row lock
  SELECT credits INTO current_credits
  FROM user_profiles
  WHERE id = user_uuid
  FOR UPDATE;

  -- Check if user exists
  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE, 'User profile not found'::TEXT, 0;
    RETURN;
  END IF;

  -- Check if user has credits
  IF current_credits <= 0 THEN
    RETURN QUERY SELECT FALSE, 'No credits remaining'::TEXT, 0;
    RETURN;
  END IF;

  -- Deduct credit
  UPDATE user_profiles
  SET credits = credits - 1, updated_at = NOW()
  WHERE id = user_uuid;

  RETURN QUERY SELECT TRUE, 'Credit deducted successfully'::TEXT, (current_credits - 1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.deduct_credit(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;
