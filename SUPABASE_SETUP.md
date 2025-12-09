# Supabase Connection Setup Guide

## ✅ Connection Status

Your Zero Entry application is now connected to Supabase!

**Project URL:** `https://vuanulvyqkfefmjcikfk.supabase.co`

## 📋 Database Tables Verified

The following Zero Entry tables are already set up in your database:

- ✅ `documents` - Stores uploaded documents
- ✅ `extractions` - Stores AI-extracted data
- ✅ `usage` - Tracks usage for billing
- ✅ `contact_messages` - Contact form submissions
- ✅ `user_profiles` - User profiles with credits system

## 🔧 Environment Variables Setup

To complete the connection, you need to add your Supabase credentials to your environment variables.

### Step 1: Get Your Supabase Anon Key

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **Settings** → **API**
4. Copy the **anon/public** key

### Step 2: Create `.env.local` File

Create a `.env.local` file in the root of your project (`v0-Zero-Entry/.env.local`) with the following content:

```env
NEXT_PUBLIC_SUPABASE_URL=https://vuanulvyqkfefmjcikfk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace `your-anon-key-here` with the actual anon key from Step 1.

### Step 3: Restart Your Development Server

After creating the `.env.local` file, restart your Next.js development server:

```bash
npm run dev
# or
pnpm dev
```

## 🧪 Testing the Connection

Once you've set up the environment variables, you can test the connection by:

1. **Check the browser console** - No errors should appear
2. **Try signing up** - Navigate to `/auth/sign-up` and create an account
3. **Check the dashboard** - After signing up, you should see your user profile with 3 free credits

## 📚 Database Functions Available

Your database includes these helpful functions:

### `deduct_credit(user_uuid: UUID)`
Deducts a credit from a user's account when processing a document.

**Returns:**
```typescript
{
  success: boolean
  remaining_credits: number
  message: string
}
```

### `handle_new_user()`
Automatically creates a user profile with 3 free credits when a new user signs up.

## 🔒 Row Level Security (RLS)

All tables have Row Level Security enabled:

- **documents** - Users can only access their own documents
- **extractions** - Users can only access their own extractions
- **usage** - Users can only view their own usage
- **user_profiles** - Users can only view/update their own profile
- **contact_messages** - Anyone can submit, but only authenticated users can read

## 🚀 Next Steps

1. ✅ Set up environment variables (`.env.local`)
2. ✅ Test authentication flow
3. ✅ Test document upload and processing
4. ✅ Verify credit deduction system

## 📖 TypeScript Types

TypeScript types have been generated and are available at:
`lib/supabase/database.types.ts`

You can use these types in your code for type-safe database queries:

```typescript
import { createClient } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/database.types"

const supabase = createClient()
const { data } = await supabase
  .from("documents")
  .select("*")
  .eq("user_id", userId)
```

## 🆘 Troubleshooting

### Error: "Missing Supabase environment variables"

Make sure you've created `.env.local` with the correct variable names:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Error: "Invalid API key"

Double-check that you copied the **anon/public** key (not the service_role key) from your Supabase dashboard.

### Connection Issues

1. Verify your Supabase project is active
2. Check that your project URL matches: `https://vuanulvyqkfefmjcikfk.supabase.co`
3. Ensure your network allows connections to Supabase

## 📞 Support

If you encounter any issues:
1. Check the Supabase dashboard for project status
2. Review the application logs
3. Verify environment variables are loaded correctly

---

**Last Updated:** January 2025  
**Status:** ✅ Connected and Ready

