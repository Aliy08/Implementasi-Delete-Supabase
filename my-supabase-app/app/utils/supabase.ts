// File: app/utils/supabase.ts

import { createClient } from '@supabase/supabase-js';

// Pastikan variabel lingkungan dibaca sebagai string
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eiqlutvtnakikzpytvem.supabase.co';
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpcWx1dHZ0bmFraWt6cHl0dmVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwMTgwNDUsImV4cCI6MjA3NjU5NDA0NX0.ye12eJwIVGWuBIYGnS1bK1o-a7lN33bppgsXKsbV71M';


// Melakukan pengecekan saat runtime
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.');
}

// Inisialisasi dan export client Supabase
// Catatan: Jika menggunakan fitur Autentikasi lanjutan,
// Anda disarankan menggunakan helper khusus dari @supabase/ssr.
export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
);
