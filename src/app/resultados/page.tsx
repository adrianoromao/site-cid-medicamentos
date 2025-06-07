
import React, { Suspense } from 'react';
import SearchBar from '@/components/SearchBar';
import CIDListItem, { CIDExample } from '@/components/CIDListItem';
import { headers } from 'next/headers'; // Import headers to get the host

// --- Data Fetching Function ---
async function fetchCIDs(query: string | undefined, host: string | null): Promise<CIDExample[]> {
  // Determine the base URL for the API call
  // Use the host from headers if available (server-side), otherwise assume relative path (client-side, though this component is server-side)
  const baseUrl = host ? `http://${host}` : ''; // Use http for local dev, adjust if https needed
  let fetchUrl = `${baseUrl}/api/cids`;

  if (query) {
    fetchUrl += `?q=${encodeURIComponent(query)}`;
  } else {
    fetchUrl += `?limit=20`; // Fetch initial limited list if no query
  }

  console.log(`Fetching CIDs from: ${fetchUrl}`); // Log the URL being fetched

  try {
    const res = await fetch(fetchUrl, { cache: 'no-store' });

    if (!res.ok) {
      console.error(`Failed to fetch CIDs (URL: ${fetchUrl}, Status: ${res.status}):`, await res.text());
      return []; // Return empty array on error
    }
    const data = await res.json();
    console.log(`Fetched CIDs data (query: ${query}):`, data); // Log fetched data
    return data;
  } catch (error) {
    console.error(`Network error fetching CIDs (URL: ${fetchUrl}):`, error);
    return []; // Return empty array on network error
  }
}

// --- Component to Display Search Results ---
// This component is now async to fetch data
async function SearchResults({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  // Extract query inside the async component
  const query = typeof searchParams?.q === 'string' ? searchParams.q : undefined;
  const host = headers().get('host'); // Get host from headers

  const cids = await fetchCIDs(query, host);

  return (
    <div className="mt-6">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">Resultados da Busca {query ? `por: "${query}"` : '(Exibindo CIDs iniciais)'}</h2>
      {cids.length > 0 ? (
        <ul className="bg-white shadow overflow-hidden sm:rounded-md divide-y divide-gray-200">
          {cids.map((cid) => (
            <CIDListItem key={cid.id} cid={cid} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-center py-4">
          {query ? `Nenhum resultado encontrado para "${query}".` : 'Nenhum CID encontrado.'}
        </p>
      )}
    </div>
  );
}

// --- The Page Component ---
// Passes searchParams directly to the Suspense boundary
export default function ResultadosPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
    // Extract initialQuery for the SearchBar here, it's fine for client components
    const initialQuery = typeof searchParams?.q === 'string' ? searchParams.q : undefined;

    return (
        <div>
            <SearchBar initialQuery={initialQuery} />
            <Suspense fallback={<div className="text-center p-4">Carregando resultados...</div>}>
                {/* Pass searchParams to the async component */}
                {/* @ts-expect-error Async Server Component is a valid pattern */}
                <SearchResults searchParams={searchParams} />
            </Suspense>
        </div>
    );
}

