import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { data: user, error: authError } = await supabase.auth.getUser(token);

  if (authError) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  try {
    const { author_id, limit = 10, page = 1 } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('Books')
      .select('*, Authors(name)')
      .range(offset, offset + limit - 1)
      .order('publish_date', { ascending: false });

    if (author_id) {
      query = query.eq('author_id', author_id);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
