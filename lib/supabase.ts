import { createClient } from '@supabase/supabase-js'

// Only create client if environment variables are available
const createSupabaseClient = () => {
  // Try both client-side and server-side environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not found. Client will not be initialized.')
    return null
  }
  
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Initialize client only when needed
export const supabase = createSupabaseClient()

// Database table names
export const TABLES = {
  BLOG_POSTS: 'blog_posts',
  TEAM_MEMBERS: 'team_members',
  TESTIMONIALS: 'testimonials',
  HERO_IMAGES: 'hero_images',
  TREE_PACKAGES: 'tree_packages',
  BUTTONS: 'homepage_buttons',
  NEWSLETTER_SUBSCRIBERS: 'newsletter_subscribers',
  CONTACT_MESSAGES: 'contact_messages',
  ADMIN_USERS: 'admin_users'
} as const

// Row Level Security (RLS) policies
export const enableRLS = async () => {
  if (!supabase) {
    console.warn('Supabase client not available. Skipping RLS setup.')
    return
  }
  
  // Enable RLS on all tables
  const tables = Object.values(TABLES)
  
  for (const table of tables) {
    await supabase.rpc('enable_rls', { table_name: table })
  }
} 