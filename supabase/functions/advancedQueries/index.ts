import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function advancedQueries(req, res) {
  try {
    const queryType = req.query.type;

    let sqlQuery;
    switch (queryType) {
      case 'authorsWithMoreBooks':
        sqlQuery = `
          SELECT name, COUNT(*) as book_count
          FROM Authors
          JOIN Books ON Authors.author_id = Books.author_id
          GROUP BY Authors.name
          HAVING COUNT(*) > 5;
        `;
        break;
      case 'avgBookPriceByCountry':
        sqlQuery = `
          SELECT Authors.country, AVG(Books.price) as avg_price
          FROM Books
          JOIN Authors ON Authors.author_id = Books.author_id
          GROUP BY Authors.country;
        `;
        break;
      case 'booksByYear':
        const { year } = req.query;
        sqlQuery = `
          SELECT Books.title, Books.price, Books.publish_date, Authors.name
          FROM Books
          JOIN Authors ON Authors.author_id = Books.author_id
          WHERE EXTRACT(YEAR FROM Books.publish_date) = ${year}
          ORDER BY Books.price DESC;
        `;
        break;
      default:
        return res.status(400).json({ error: 'Invalid query type' });
    }

    const { data, error } = await supabase.rpc('execute_sql', { sql: sqlQuery });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
