# Estrutura do Site Web - Consulta CID-Medicamentos

## 1. Visão Geral

Este documento descreve a estrutura planejada para a versão web do aplicativo de consulta CID-Medicamentos. O site será desenvolvido utilizando Next.js, aproveitando sua capacidade de renderização no servidor e estrutura organizada. Inicialmente, o site utilizará dados de exemplo (placeholders) para permitir o desenvolvimento da interface e funcionalidades, com a possibilidade de integração com um banco de dados real posteriormente.

## 2. Estrutura de Páginas

O site será composto pelas seguintes páginas principais:

1.  **Página Inicial (`/`)**
    *   **Objetivo:** Servir como ponto de entrada e principal interface de busca.
    *   **Componentes:**
        *   Cabeçalho (Header) com título/logo.
        *   Barra de Busca (SearchBar) proeminente para inserir código CID ou nome da doença.
        *   Breve descrição do propósito do site.
        *   Rodapé (Footer).
    *   **Funcionalidade:** Ao submeter a busca, redireciona para a página de resultados.

2.  **Página de Resultados da Busca (`/resultados?q=[query]`)**
    *   **Objetivo:** Exibir a lista de CIDs que correspondem ao termo de busca.
    *   **Componentes:**
        *   Cabeçalho.
        *   Barra de Busca (pré-preenchida com a query, permitindo refinar a busca).
        *   Lista de Resultados: Exibição dos CIDs encontrados (código e nome).
            *   Cada item da lista será um link para a página de detalhes do CID (`CIDListItem`).
        *   Mensagem indicando "Nenhum resultado encontrado" se aplicável.
        *   Paginação (se a lista de resultados for potencialmente longa).
        *   Rodapé.
    *   **Funcionalidade:** Busca CIDs no backend (usando dados de exemplo) com base na query e exibe os resultados. Permite clicar em um CID para ver detalhes.

3.  **Página de Detalhes do CID (`/cid/[id]`)**
    *   **Objetivo:** Apresentar informações detalhadas sobre um CID específico.
    *   **Componentes:**
        *   Cabeçalho.
        *   Título principal com o Código e Nome do CID.
        *   Navegação por Abas/Seções (`TabNavigation`):
            *   **Medicamentos:** Lista/Tabela de medicamentos associados.
            *   **Posologias:** Lista/Tabela detalhando as posologias dos medicamentos listados.
            *   **Riscos:** Lista/Tabela dos riscos associados.
            *   **Interações:** Lista/Tabela das interações medicamentosas.
        *   Área de Conteúdo Dinâmico: Exibe a lista/tabela correspondente à aba selecionada (`DataTable`/`InfoList`).
        *   Indicadores de carregamento enquanto os dados são buscados.
        *   Mensagens para seções sem dados ("Nenhuma posologia encontrada", etc.).
        *   Rodapé.
    *   **Funcionalidade:** Busca informações detalhadas (medicamentos, posologias, riscos, interações - usando dados de exemplo) para o CID específico (`[id]`) no backend e as exibe nas respectivas seções/abas.

## 3. Componentes Reutilizáveis

*   `Header`: Cabeçalho padrão do site.
*   `Footer`: Rodapé padrão do site.
*   `SearchBar`: Componente de busca (input + botão).
*   `CIDListItem`: Componente para exibir um item na lista de resultados da busca.
*   `TabNavigation`: Componente para navegação entre as seções da página de detalhes.
*   `DataTable`/`InfoList`: Componentes genéricos para exibir listas/tabelas de dados (medicamentos, posologias, etc.).
*   `LoadingIndicator`: Componente para exibir feedback visual durante o carregamento de dados.
*   `EmptyStateMessage`: Componente para exibir mensagens quando não há dados.

## 4. Fluxo de Dados (com Dados de Exemplo)

1.  **Busca:** Usuário insere termo na `SearchBar` (Página Inicial).
2.  **Redirecionamento:** Navega para a Página de Resultados (`/resultados?q=...`).
3.  **Busca de Resultados:** A Página de Resultados busca (simuladamente, usando dados de exemplo) CIDs que correspondam à query.
4.  **Exibição de Resultados:** A lista de CIDs (dados de exemplo) é exibida usando `CIDListItem`.
5.  **Seleção de CID:** Usuário clica em um `CIDListItem`.
6.  **Navegação para Detalhes:** Navega para a Página de Detalhes (`/cid/[id]`).
7.  **Busca de Detalhes:** A Página de Detalhes busca (simuladamente, usando dados de exemplo) as informações detalhadas (medicamentos, posologias, etc.) para o `[id]` do CID.
8.  **Exibição de Detalhes:** Os dados de exemplo são exibidos nas respectivas abas/seções usando `DataTable`/`InfoList`.

## 5. Tecnologias Propostas

*   **Frontend:** Next.js (React)
*   **Estilização:** Tailwind CSS (incluído nos templates Next.js)
*   **Banco de Dados (Inicial):** Dados de exemplo embutidos no código ou em arquivos JSON simples.
*   **Banco de Dados (Futuro):** Cloudflare D1 (integrado com Next.js via Wrangler) ou outro banco de dados relacional/NoSQL.
*   **Deployment:** Plataforma de hospedagem com suporte a Next.js (Vercel, Netlify, Cloudflare Pages).

