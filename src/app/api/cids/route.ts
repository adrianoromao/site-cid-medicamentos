import { NextRequest, NextResponse } from 'next/server';
import dbData from '@/lib/db.json';

// Configuração explícita para rota dinâmica
export const dynamic = 'force-dynamic';

// Define a estrutura esperada para os dados do JSON
interface DBEntry {
  cid: string;
  diseaseName: string;
  medications: any[]; 
  generalInfo: string;
}

// Define a estrutura esperada para a resposta da API
interface CIDResponse {
  id: string;
  code: string;
  name: string;
}

// Converte a estrutura do DB para a estrutura da resposta
function mapDbToResponse(entry: DBEntry): CIDResponse {
  return {
    id: entry.cid,
    code: entry.cid,
    name: entry.diseaseName,
  };
}

export async function GET(request: NextRequest) {
  try {
    // Obter a URL completa e extrair o parâmetro de consulta manualmente
    const url = new URL(request.url);
    const query = url.searchParams.get('q');

    // Usa os dados importados do db.json
    const allData: DBEntry[] = dbData;

    if (!query) {
      // Retornar todos os CIDs do JSON (limitado a 20 para a lista inicial)
      const limitedData = allData.slice(0, 20).map(mapDbToResponse);
      return NextResponse.json(limitedData);
    }

    const searchTerm = query.toLowerCase();

    // Filtrar CIDs que correspondem ao termo de busca no código (cid) ou nome (diseaseName)
    const filteredResults = allData
      .filter(
        (entry) =>
          entry.cid.toLowerCase().includes(searchTerm) ||
          entry.diseaseName.toLowerCase().includes(searchTerm)
      )
      .slice(0, 50) // Limitar a 50 resultados
      .map(mapDbToResponse); // Mapeia para a estrutura de resposta esperada

    return NextResponse.json(filteredResults);

  } catch (e) {
    console.error({ message: 'Error fetching CIDs from JSON', error: e });
    const errorMessage =
      e instanceof Error ? e.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: 'Failed to fetch CIDs', details: errorMessage },
      { status: 500 }
    );
  }
}
