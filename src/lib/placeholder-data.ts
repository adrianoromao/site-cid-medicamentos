// Interfaces para os dados de exemplo detalhados

export interface MedicamentoExample {
  id: string;
  nome: string;
  principioAtivo: string;
  classeTerapeutica?: string;
}

export interface PosologiaExample {
  id: string;
  medicamentoId: string; // Relaciona com MedicamentoExample
  viaAdministracao: string;
  doseAdulto?: string;
  dosePediatrica?: string;
  frequencia?: string;
  duracao?: string;
  observacoes?: string;
}

export interface RiscoExample {
  id: string;
  medicamentoId: string; // Relaciona com MedicamentoExample
  tipoRisco: string; // Ex: Efeito Colateral, Contraindicação
  descricao: string;
  probabilidade?: string;
  gravidade?: string;
  recomendacoes?: string;
}

export interface InteracaoExample {
  id: string;
  medicamentoId: string; // Relaciona com MedicamentoExample
  medicamentoInteragente: string;
  descricaoInteracao: string;
  mecanismo?: string;
  gravidade?: string;
  recomendacoes?: string;
}

export interface CIDDetailsExample {
  id: string; // Código CID
  code: string;
  name: string;
  medicamentos: MedicamentoExample[];
  posologias: PosologiaExample[];
  riscos: RiscoExample[];
  interacoes: InteracaoExample[];
}

// Dados de exemplo para alguns CIDs
const placeholderCIDDetails: Record<string, CIDDetailsExample> = {
  A00: {
    id: "A00",
    code: "A00",
    name: "Cólera",
    medicamentos: [
      { id: "med1", nome: "Doxiciclina 100mg", principioAtivo: "Doxiciclina" },
      { id: "med2", nome: "Azitromicina 500mg", principioAtivo: "Azitromicina" },
      { id: "med3", nome: "Sais de Reidratação Oral", principioAtivo: "Sais diversos" },
    ],
    posologias: [
      { id: "pos1", medicamentoId: "med1", viaAdministracao: "Oral", doseAdulto: "300mg dose única", frequencia: "Única", duracao: "1 dia" },
      { id: "pos2", medicamentoId: "med2", viaAdministracao: "Oral", doseAdulto: "1g dose única", frequencia: "Única", duracao: "1 dia" },
      { id: "pos3", medicamentoId: "med3", viaAdministracao: "Oral", doseAdulto: "Conforme necessidade", frequencia: "Após cada evacuação líquida", duracao: "Enquanto durar a diarreia", observacoes: "Diluir o pó em 1L de água fervida ou filtrada." },
    ],
    riscos: [
      { id: "ris1", medicamentoId: "med1", tipoRisco: "Efeito Colateral", descricao: "Fotossensibilidade", probabilidade: "Comum" },
      { id: "ris2", medicamentoId: "med1", tipoRisco: "Contraindicação", descricao: "Gravidez, crianças < 8 anos" },
      { id: "ris3", medicamentoId: "med2", tipoRisco: "Efeito Colateral", descricao: "Náuseas, vômitos", probabilidade: "Comum" },
    ],
    interacoes: [
      { id: "int1", medicamentoId: "med1", medicamentoInteragente: "Antiácidos (alumínio, cálcio, magnésio)", descricaoInteracao: "Redução da absorção da doxiciclina", recomendacoes: "Administrar 2h antes ou depois." },
    ],
  },
  I10: {
    id: "I10",
    code: "I10",
    name: "Hipertensão essencial (primária)",
    medicamentos: [
      { id: "med4", nome: "Hidroclorotiazida 25mg", principioAtivo: "Hidroclorotiazida" },
      { id: "med5", nome: "Losartana Potássica 50mg", principioAtivo: "Losartana" },
      { id: "med6", nome: "Anlodipino 5mg", principioAtivo: "Anlodipino" },
    ],
    posologias: [
      { id: "pos4", medicamentoId: "med4", viaAdministracao: "Oral", doseAdulto: "12.5-25mg/dia", frequencia: "1x/dia", duracao: "Contínuo" },
      { id: "pos5", medicamentoId: "med5", viaAdministracao: "Oral", doseAdulto: "50-100mg/dia", frequencia: "1-2x/dia", duracao: "Contínuo" },
      { id: "pos6", medicamentoId: "med6", viaAdministracao: "Oral", doseAdulto: "5-10mg/dia", frequencia: "1x/dia", duracao: "Contínuo" },
    ],
    riscos: [
      { id: "ris4", medicamentoId: "med4", tipoRisco: "Efeito Colateral", descricao: "Hipocalemia, hiperuricemia", probabilidade: "Comum" },
      { id: "ris5", medicamentoId: "med5", tipoRisco: "Efeito Colateral", descricao: "Tontura, hipercalemia", probabilidade: "Comum" },
      { id: "ris6", medicamentoId: "med6", tipoRisco: "Efeito Colateral", descricao: "Edema periférico, cefaleia", probabilidade: "Comum" },
    ],
    interacoes: [
      { id: "int2", medicamentoId: "med4", medicamentoInteragente: "Lítio", descricaoInteracao: "Aumento da toxicidade do lítio", recomendacoes: "Monitorar níveis de lítio." },
      { id: "int3", medicamentoId: "med5", medicamentoInteragente: "AINEs", descricaoInteracao: "Redução do efeito anti-hipertensivo, risco de insuficiência renal", recomendacoes: "Monitorar função renal e pressão arterial." },
    ],
  },
  // Adicionar mais CIDs de exemplo se necessário
};

// Função para simular a busca dos detalhes do CID
export const getCIDDetails = (id: string): CIDDetailsExample | null => {
  // Simula um pequeno atraso, como se fosse uma chamada de API
  // await new Promise(resolve => setTimeout(resolve, 50)); 
  return placeholderCIDDetails[id] || null;
};

