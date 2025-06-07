import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 text-gray-600 p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Consulta CID-Medicamentos. Todos os direitos reservados.</p>
        {/* Adicionar links úteis ou informações de contato se necessário */}
      </div>
    </footer>
  );
};

export default Footer;

