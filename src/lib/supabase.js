import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for interacting with your database
export const supabase = createClient(
	"https://sgklpulswavrdvbtuhea.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNna2xwdWxzd2F2cmR2YnR1aGVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyNjMwOTksImV4cCI6MjAzMDgzOTA5OX0.irWdD3a-rs3CyFyAC-aZMClEWM7LyWVvlsOBZDoD-PY"
)
