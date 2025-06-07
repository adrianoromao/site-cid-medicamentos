import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">Consulta CID-Medicamentos</h1>
        {/* Adicionar navegação se necessário no futuro */}
      </div>
    </header>
  );
};

export default Header;

