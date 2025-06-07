import SearchBar from "@/components/SearchBar";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h2 className="text-3xl font-semibold mb-4">Encontre Informações sobre CIDs e Medicamentos</h2>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl">
        Utilize a barra de busca abaixo para pesquisar por código CID ou pelo nome da doença e acessar informações relevantes sobre medicamentos associados, posologias, riscos e interações.
      </p>
      <SearchBar />
      {/* Pode adicionar mais conteúdo aqui, como links rápidos ou informações adicionais */}
    </div>
  );
}

