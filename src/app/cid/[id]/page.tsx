
'use client';

import React, { useState, Suspense } from 'react';
import TabNavigation from '@/components/TabNavigation';

// --- Interfaces for API Response (assuming they match placeholder structure for now) ---
// It's good practice to define these based on the actual API response
interface MedicamentoAPI {
  id: string;
  nome: string;
  principioAtivo: string | null;
  classeTerapeutica: string | null;
}

interface PosologiaAPI {
  id: string;
  medicamento_id: string; // Note: API might return snake_case
  viaAdministracao: string | null;
  doseAdulto: string | null;
  dosePediatrica: string | null;
  frequencia: string | null;
  duracao: string | null;
  observacoes: string | null;
}

interface RiscoAPI {
  id: string;
  medicamento_id: string;
  tipoRisco: string | null;
  descricao: string;
  probabilidade: string | null;
  gravidade: string | null;
  recomendacoes: string | null;
}

interface InteracaoAPI {
  id: string;
  medicamento_id: string;
  medicamentoInteragente: string | null;
  descricaoInteracao: string;
  mecanismo: string | null;
  gravidade: string | null;
  recomendacoes: string | null;
}

interface CIDDetailsAPIResponse {
  id: string;
  code: string;
  name: string;
  medicamentos: MedicamentoAPI[];
  posologias: PosologiaAPI[];
  riscos: RiscoAPI[];
  interacoes: InteracaoAPI[];
}

// --- Data Fetching Function ---
async function fetchCIDDetails(id: string): Promise<CIDDetailsAPIResponse | null> {
  // Use relative path assuming API is in the same app
  const res = await fetch(`/api/cids/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    if (res.status === 404) {
      return null; // Explicitly return null for not found
    }
    // Log other errors
    console.error(`Failed to fetch CID details for ${id}:`, await res.text());
    // throw new Error('Failed to fetch CID details'); // Or throw error
    return null; // Return null on other errors for graceful handling in this case
  }

  return res.json();
}

// --- Reusable Components for Displaying Details (DataTable updated for responsiveness) ---

interface DataTableProps<T> {
  data: T[];
  columns: { header: string; accessor: (item: T) => React.ReactNode }[];
  emptyMessage: string;
}

function DataTable<T>({ data, columns, emptyMessage }: DataTableProps<T>) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500 italic text-center py-4">{emptyMessage}</p>;
  }
  return (
    // Add overflow-x-auto for horizontal scrolling on small screens
    <div className="overflow-x-auto shadow border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th key={col.header} scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            // Assuming items have a unique 'id' property from the API
            <tr key={(item as any).id || index}>
              {columns.map((col) => (
                <td key={col.header} className="px-4 py-4 text-sm text-gray-700 align-top">
                  {/* Allow wrapping for longer content within cells */}
                  <div className="whitespace-normal">{col.accessor(item)}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- Specific List Components using DataTable ---

const MedicamentosList: React.FC<{ data: MedicamentoAPI[] }> = ({ data }) => (
  <DataTable
    data={data}
    columns={[
      { header: 'Nome', accessor: (item) => item.nome },
      { header: 'Princípio Ativo', accessor: (item) => item.principioAtivo || 'N/A' },
      { header: 'Classe Terapêutica', accessor: (item) => item.classeTerapeutica || 'N/A' },
    ]}
    emptyMessage="Nenhum medicamento encontrado para este CID."
  />
);

// Helper to find medicamento name for related lists
const findMedicamentoNome = (id: string, medicamentos: MedicamentoAPI[]): string => {
    return medicamentos.find(m => m.id === id)?.nome || id; // Fallback to ID if not found
}

const PosologiasList: React.FC<{ data: PosologiaAPI[]; medicamentos: MedicamentoAPI[] }> = ({ data, medicamentos }) => (
  <DataTable
    data={data}
    columns={[
      { header: 'Medicamento', accessor: (item) => findMedicamentoNome(item.medicamento_id, medicamentos) },
      { header: 'Via', accessor: (item) => item.viaAdministracao || 'N/A' },
      { header: 'Dose Adulto', accessor: (item) => item.doseAdulto || 'N/A' },
      { header: 'Dose Pediátrica', accessor: (item) => item.dosePediatrica || 'N/A' },
      { header: 'Frequência', accessor: (item) => item.frequencia || 'N/A' },
      { header: 'Duração', accessor: (item) => item.duracao || 'N/A' },
      { header: 'Observações', accessor: (item) => item.observacoes || 'Nenhuma' },
    ]}
    emptyMessage="Nenhuma posologia encontrada para este CID."
  />
);

const RiscosList: React.FC<{ data: RiscoAPI[]; medicamentos: MedicamentoAPI[] }> = ({ data, medicamentos }) => (
  <DataTable
    data={data}
    columns={[
      { header: 'Medicamento', accessor: (item) => findMedicamentoNome(item.medicamento_id, medicamentos) },
      { header: 'Tipo', accessor: (item) => item.tipoRisco || 'N/A' },
      { header: 'Descrição', accessor: (item) => item.descricao },
      { header: 'Probabilidade', accessor: (item) => item.probabilidade || 'N/A' },
      { header: 'Gravidade', accessor: (item) => item.gravidade || 'N/A' },
      { header: 'Recomendações', accessor: (item) => item.recomendacoes || 'Nenhuma' },
    ]}
    emptyMessage="Nenhum risco encontrado para este CID."
  />
);

const InteracoesList: React.FC<{ data: InteracaoAPI[]; medicamentos: MedicamentoAPI[] }> = ({ data, medicamentos }) => (
  <DataTable
    data={data}
    columns={[
      { header: 'Medicamento', accessor: (item) => findMedicamentoNome(item.medicamento_id, medicamentos) },
      { header: 'Interage com', accessor: (item) => item.medicamentoInteragente || 'N/A' },
      { header: 'Descrição', accessor: (item) => item.descricaoInteracao },
      { header: 'Mecanismo', accessor: (item) => item.mecanismo || 'N/A' },
      { header: 'Gravidade', accessor: (item) => item.gravidade || 'N/A' },
      { header: 'Recomendações', accessor: (item) => item.recomendacoes || 'Nenhuma' },
    ]}
    emptyMessage="Nenhuma interação encontrada para este CID."
  />
);

// --- Main Detail Content Component (Async) ---

async function CIDDetailContent({ cidId }: { cidId: string }) {
  const cidDetails = await fetchCIDDetails(cidId);

  if (!cidDetails) {
    return <p className="text-red-600 text-center py-4">CID "{cidId}" não encontrado.</p>;
  }

  const tabs = ['Medicamentos', 'Posologias', 'Riscos', 'Interações'];

  return (
    <div>
      {/* Adjust heading sizes for responsiveness */}
      <h2 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">{cidDetails.code}</h2>
      <p className="text-lg md:text-xl text-gray-700 mb-4 md:mb-6">{cidDetails.name}</p>
      {/* ClientTabWrapper handles the state and rendering of tabs/tables */}
      <ClientTabWrapper cidDetails={cidDetails} tabs={tabs} />
    </div>
  );
}

// --- Client Component Wrapper for Tabs ---

interface ClientTabWrapperProps {
    cidDetails: CIDDetailsAPIResponse;
    tabs: string[];
}

function ClientTabWrapper({ cidDetails, tabs }: ClientTabWrapperProps) {
    const [activeTab, setActiveTab] = React.useState(tabs[0]);

    const renderTabContent = () => {
        switch (activeTab) {
          case 'Medicamentos':
            return <MedicamentosList data={cidDetails.medicamentos} />;
          case 'Posologias':
            return <PosologiasList data={cidDetails.posologias} medicamentos={cidDetails.medicamentos} />;
          case 'Riscos':
            return <RiscosList data={cidDetails.riscos} medicamentos={cidDetails.medicamentos} />;
          case 'Interações':
            return <InteracoesList data={cidDetails.interacoes} medicamentos={cidDetails.medicamentos} />;
          default:
            return null;
        }
    };

    return (
        <div>
            {/* TabNavigation might need responsive adjustments if many tabs exist */}
            <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="mt-4">
                {renderTabContent()}
            </div>
        </div>
    );
}


// --- Page Component ---

export default function CIDDetailPage({ params }: { params: { id: string } }) {
  const cidId = params.id;

  return (
    <Suspense fallback={<div className="text-center p-4">Carregando detalhes do CID...</div>}>
      {/* @ts-expect-error Async Server Component */}
      <CIDDetailContent cidId={cidId} />
    </Suspense>
  );
}

