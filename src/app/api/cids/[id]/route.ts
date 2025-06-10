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
interface CIDDetailResponse {
  id: string;
  code: string;
  name: string;
  medications: any[];
  generalInfo: string;
}

// Converte a estrutura do DB para a estrutura da resposta detalhada
function mapDbToDetailResponse(entry: DBEntry): CIDDetailResponse {
  return {
    id: entry.cid,
    code: entry.cid,
    name: entry.diseaseName,
    medications: entry.medications || [],
    generalInfo: entry.generalInfo || '',
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Usa os dados importados do db.json
    const allData: DBEntry[] = dbData;
    
    // Encontra o CID pelo ID (cid)
    const cidResult = allData.find(entry => entry.cid === id);
    
    if (!cidResult) {
      return NextResponse.json({ error: 'CID not found.' }, { status: 404 });
    }
    
    // Mapeia para o formato de resposta detalhada
    const detailedResponse = mapDbToDetailResponse(cidResult);
    
    return NextResponse.json(detailedResponse);
    
  } catch (e) {
    console.error({ message: 'Error fetching CID details from JSON', error: e });
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: 'Failed to fetch CID details', details: errorMessage },
      { status: 500 }
    );
  }
}
