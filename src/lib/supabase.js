import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase = null;

if (url && key && url !== "undefined" && key !== "undefined") {
  supabase = createClient(url, key);
}

export { supabase };
