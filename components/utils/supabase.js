import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://olqtpdqxvnjstqnwmpek.supabase.co"
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9scXRwZHF4dm5qc3RxbndtcGVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5OTY4MzQsImV4cCI6MjAxNTU3MjgzNH0.7Msr_CojoMbn5x4fp8_n-NqMXqQ-iRiaXk3xGlgB6K4'

export const supabase = createClient(supabaseUrl, supabaseKey)