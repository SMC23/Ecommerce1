const {  createClient } = require('@supabase/supabase-js')
const supabase = createClient(
    process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)
console.log('✅ Conectado a SUPABASE')
module.exports = supabase 