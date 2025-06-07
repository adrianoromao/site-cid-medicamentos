import React from 'react';
import Link from 'next/link';

// Interface para definir a estrutura dos dados de exemplo do CID
interface CIDExample {
  id: string; // Usaremos o código CID como ID único para a URL
  code: string;
  name: string;
}

interface CIDListItemProps {
  cid: CIDExample;
}

const CIDListItem: React.FC<CIDListItemProps> = ({ cid }) => {
  return (
    <li className="border-b border-gray-200 py-3 hover:bg-gray-50">
      <Link href={`/cid/${cid.id}`} className="block p-2">
        <h3 className="text-lg font-semibold text-blue-700 hover:underline">{cid.code}</h3>
        <p className="text-gray-600">{cid.name}</p>
      </Link>
    </li>
  );
};

export default CIDListItem;

// Exportar a interface para uso na página de resultados
export type { CIDExample };

