import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://sgklpulswavrdvbtuhea.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNna2xwdWxzd2F2cmR2YnR1aGVhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNTI2MzA5OSwiZXhwIjoyMDMwODM5MDk5fQ.XjD1ZxLG8nKBM33dxyaX_GHgY-M24CLF8L0hl8PhNKg')