import { NextRequest, NextResponse } from 'next/server';




// Define interfaces for the expected row structures from D1
interface CIDRow {
  id: string;
  code: string;
  name: string;
}

interface MedicamentoRow {
  id: string;
  nome: string;
  principioAtivo: string | null;
  classeTerapeutica: string | null;
}

interface PosologiaRow {
  id: string;
  medicamento_id: string;
  viaAdministracao: string | null;
  doseAdulto: string | null;
  dosePediatrica: string | null;
  frequencia: string | null;
  duracao: string | null;
  observacoes: string | null;
}

interface RiscoRow {
  id: string;
  medicamento_id: string;
  tipoRisco: string | null;
  descricao: string;
  probabilidade: string | null;
  gravidade: string | null;
  recomendacoes: string | null;
}

interface InteracaoRow {
  id: string;
  medicamento_id: string;
  medicamentoInteragente: string | null;
  descricaoInteracao: string;
  mecanismo: string | null;
  gravidade: string | null;
  recomendacoes: string | null;
}

// Define the structure for the final API response
interface CIDDetailsResponse {
  id: string;
  code: string;
  name: string;
  medicamentos: MedicamentoRow[];
  posologias: PosologiaRow[];
  riscos: RiscoRow[];
  interacoes: InteracaoRow[];
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const cidId = params.id;

    if (!cidId) {
      return NextResponse.json({ error: 'CID ID parameter is required.' }, { status: 400 });
    }

    // Get D1 binding
    const { env } = getRequestContext();
    const db = env.DB;

    // Prepare batch query to fetch all details related to the CID
    const batchQueries = [
      db.prepare('SELECT id, code, name FROM CIDs WHERE id = ?1').bind(cidId),
      db.prepare('SELECT id, nome, principioAtivo, classeTerapeutica FROM Medicamentos WHERE cid_id = ?1').bind(cidId),
      // Fetch related data using joins or subsequent queries based on medicamento IDs if needed
      // For simplicity, fetch all related to the CID's medicamentos
      db.prepare(`
        SELECT p.id, p.medicamento_id, p.viaAdministracao, p.doseAdulto, p.dosePediatrica, p.frequencia, p.duracao, p.observacoes
        FROM Posologias p
        JOIN Medicamentos m ON p.medicamento_id = m.id
        WHERE m.cid_id = ?1
      `).bind(cidId),
      db.prepare(`
        SELECT r.id, r.medicamento_id, r.tipoRisco, r.descricao, r.probabilidade, r.gravidade, r.recomendacoes
        FROM Riscos r
        JOIN Medicamentos m ON r.medicamento_id = m.id
        WHERE m.cid_id = ?1
      `).bind(cidId),
      db.prepare(`
        SELECT i.id, i.medicamento_id, i.medicamentoInteragente, i.descricaoInteracao, i.mecanismo, i.gravidade, i.recomendacoes
        FROM Interacoes i
        JOIN Medicamentos m ON i.medicamento_id = m.id
        WHERE m.cid_id = ?1
      `).bind(cidId),
    ];

    const results = await db.batch<[CIDRow, MedicamentoRow[], PosologiaRow[], RiscoRow[], InteracaoRow[]]>(batchQueries);

    const cidResult = results[0].results?.[0];
    const medicamentosResult = results[1].results || [];
    const posologiasResult = results[2].results || [];
    const riscosResult = results[3].results || [];
    const interacoesResult = results[4].results || [];

    if (!cidResult) {
      return NextResponse.json({ error: 'CID not found.' }, { status: 404 });
    }

    // Construct the response object
    const responseData: CIDDetailsResponse = {
      id: cidResult.id,
      code: cidResult.code,
      name: cidResult.name,
      medicamentos: medicamentosResult,
      posologias: posologiasResult,
      riscos: riscosResult,
      interacoes: interacoesResult,
    };

    return NextResponse.json(responseData);

  } catch (e) {
    console.error({ message: 'Error fetching CID details', error: e });
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Failed to fetch CID details', details: errorMessage }, { status: 500 });
  }
}

