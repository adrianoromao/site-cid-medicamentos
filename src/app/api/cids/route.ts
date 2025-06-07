import { NextRequest, NextResponse } from 'next/server';



// Define the expected structure for the D1 response
interface CIDRow {
  id: string;
  code: string;
  name: string;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    // Get D1 binding
    const { env } = getRequestContext();
    const db = env.DB;

    if (!query) {
      // Maybe return all CIDs or a specific subset if no query?
      // For now, let's return an empty array or an error if query is mandatory for search
      // Returning all might be too much data.
      // Let's assume query is needed for search.
      const allCidsStmt = db.prepare('SELECT id, code, name FROM CIDs LIMIT 20'); // Limit initial return
      const { results } = await allCidsStmt.all<CIDRow>();
      return NextResponse.json(results || []);
      // Or return error:
      // return NextResponse.json({ error: 'Search query parameter "q" is required.' }, { status: 400 });
    }

    const searchTerm = `%${query.toLowerCase()}%`;

    // Prepare SQL statement to search by code or name
    const stmt = db.prepare(
      'SELECT id, code, name FROM CIDs WHERE LOWER(code) LIKE ?1 OR LOWER(name) LIKE ?1 LIMIT 50'
    ).bind(searchTerm);

    const { results } = await stmt.all<CIDRow>();

    return NextResponse.json(results || []);

  } catch (e) {
    console.error({ message: 'Error fetching CIDs', error: e });
    // Ensure the error is an instance of Error
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Failed to fetch CIDs', details: errorMessage }, { status: 500 });
  }
}

