-- Migration number: 0001 	 Auto-generated

-- Apagar tabelas antigas (se existirem)
DROP TABLE IF EXISTS Interacoes;
DROP TABLE IF EXISTS Riscos;
DROP TABLE IF EXISTS Posologias;
DROP TABLE IF EXISTS Medicamentos;
DROP TABLE IF EXISTS CIDs;

-- Criar tabela de CIDs
CREATE TABLE IF NOT EXISTS CIDs (
  id TEXT PRIMARY KEY, -- Usando o código CID como ID
  code TEXT NOT NULL,
  name TEXT NOT NULL
);

-- Criar tabela de Medicamentos
CREATE TABLE IF NOT EXISTS Medicamentos (
  id TEXT PRIMARY KEY, -- ID único para o medicamento (ex: 'med1')
  cid_id TEXT NOT NULL, -- Chave estrangeira para CIDs
  nome TEXT NOT NULL,
  principioAtivo TEXT,
  classeTerapeutica TEXT,
  FOREIGN KEY(cid_id) REFERENCES CIDs(id)
);

-- Criar tabela de Posologias
CREATE TABLE IF NOT EXISTS Posologias (
  id TEXT PRIMARY KEY, -- ID único para a posologia (ex: 'pos1')
  medicamento_id TEXT NOT NULL, -- Chave estrangeira para Medicamentos
  viaAdministracao TEXT,
  doseAdulto TEXT,
  dosePediatrica TEXT,
  frequencia TEXT,
  duracao TEXT,
  observacoes TEXT,
  FOREIGN KEY(medicamento_id) REFERENCES Medicamentos(id)
);

-- Criar tabela de Riscos
CREATE TABLE IF NOT EXISTS Riscos (
  id TEXT PRIMARY KEY, -- ID único para o risco (ex: 'ris1')
  medicamento_id TEXT NOT NULL, -- Chave estrangeira para Medicamentos
  tipoRisco TEXT, -- Ex: Efeito Colateral, Contraindicação
  descricao TEXT NOT NULL,
  probabilidade TEXT,
  gravidade TEXT,
  recomendacoes TEXT,
  FOREIGN KEY(medicamento_id) REFERENCES Medicamentos(id)
);

-- Criar tabela de Interações
CREATE TABLE IF NOT EXISTS Interacoes (
  id TEXT PRIMARY KEY, -- ID único para a interação (ex: 'int1')
  medicamento_id TEXT NOT NULL, -- Chave estrangeira para Medicamentos
  medicamentoInteragente TEXT,
  descricaoInteracao TEXT NOT NULL,
  mecanismo TEXT,
  gravidade TEXT,
  recomendacoes TEXT,
  FOREIGN KEY(medicamento_id) REFERENCES Medicamentos(id)
);

-- Inserir dados de exemplo

-- CID A00
INSERT INTO CIDs (id, code, name) VALUES (
  'A00', 'A00', 'Cólera'
);
INSERT INTO Medicamentos (id, cid_id, nome, principioAtivo) VALUES
  ('med1', 'A00', 'Doxiciclina 100mg', 'Doxiciclina'),
  ('med2', 'A00', 'Azitromicina 500mg', 'Azitromicina'),
  ('med3', 'A00', 'Sais de Reidratação Oral', 'Sais diversos');
INSERT INTO Posologias (id, medicamento_id, viaAdministracao, doseAdulto, frequencia, duracao, observacoes) VALUES
  ('pos1', 'med1', 'Oral', '300mg dose única', 'Única', '1 dia', NULL),
  ('pos2', 'med2', 'Oral', '1g dose única', 'Única', '1 dia', NULL),
  ('pos3', 'med3', 'Oral', 'Conforme necessidade', 'Após cada evacuação líquida', 'Enquanto durar a diarreia', 'Diluir o pó em 1L de água fervida ou filtrada.');
INSERT INTO Riscos (id, medicamento_id, tipoRisco, descricao, probabilidade) VALUES
  ('ris1', 'med1', 'Efeito Colateral', 'Fotossensibilidade', 'Comum');
INSERT INTO Riscos (id, medicamento_id, tipoRisco, descricao) VALUES
  ('ris2', 'med1', 'Contraindicação', 'Gravidez, crianças < 8 anos');
INSERT INTO Riscos (id, medicamento_id, tipoRisco, descricao, probabilidade) VALUES
  ('ris3', 'med2', 'Efeito Colateral', 'Náuseas, vômitos', 'Comum');
INSERT INTO Interacoes (id, medicamento_id, medicamentoInteragente, descricaoInteracao, recomendacoes) VALUES
  ('int1', 'med1', 'Antiácidos (alumínio, cálcio, magnésio)', 'Redução da absorção da doxiciclina', 'Administrar 2h antes ou depois.');

-- CID I10
INSERT INTO CIDs (id, code, name) VALUES (
  'I10', 'I10', 'Hipertensão essencial (primária)'
);
INSERT INTO Medicamentos (id, cid_id, nome, principioAtivo) VALUES
  ('med4', 'I10', 'Hidroclorotiazida 25mg', 'Hidroclorotiazida'),
  ('med5', 'I10', 'Losartana Potássica 50mg', 'Losartana'),
  ('med6', 'I10', 'Anlodipino 5mg', 'Anlodipino');
INSERT INTO Posologias (id, medicamento_id, viaAdministracao, doseAdulto, frequencia, duracao) VALUES
  ('pos4', 'med4', 'Oral', '12.5-25mg/dia', '1x/dia', 'Contínuo'),
  ('pos5', 'med5', 'Oral', '50-100mg/dia', '1-2x/dia', 'Contínuo'),
  ('pos6', 'med6', 'Oral', '5-10mg/dia', '1x/dia', 'Contínuo');
INSERT INTO Riscos (id, medicamento_id, tipoRisco, descricao, probabilidade) VALUES
  ('ris4', 'med4', 'Efeito Colateral', 'Hipocalemia, hiperuricemia', 'Comum'),
  ('ris5', 'med5', 'Efeito Colateral', 'Tontura, hipercalemia', 'Comum'),
  ('ris6', 'med6', 'Efeito Colateral', 'Edema periférico, cefaleia', 'Comum');
INSERT INTO Interacoes (id, medicamento_id, medicamentoInteragente, descricaoInteracao, recomendacoes) VALUES
  ('int2', 'med4', 'Lítio', 'Aumento da toxicidade do lítio', 'Monitorar níveis de lítio.'),
  ('int3', 'med5', 'AINEs', 'Redução do efeito anti-hipertensivo, risco de insuficiência renal', 'Monitorar função renal e pressão arterial.');

-- Adicionar mais CIDs de exemplo
INSERT INTO CIDs (id, code, name) VALUES 
  ('A01', 'A01', 'Febres tifóide e paratifóide'),
  ('A02', 'A02', 'Outras infecções por Salmonella'),
  ('J10', 'J10', 'Influenza [gripe] devida a vírus da influenza [gripe] identificado'),
  ('J11', 'J11', 'Influenza [gripe] devida a vírus não identificado'),
  ('E11', 'E11', 'Diabetes mellitus não-insulino-dependente');

-- Criar índices para otimizar consultas
CREATE INDEX idx_medicamentos_cid_id ON Medicamentos(cid_id);
CREATE INDEX idx_posologias_medicamento_id ON Posologias(medicamento_id);
CREATE INDEX idx_riscos_medicamento_id ON Riscos(medicamento_id);
CREATE INDEX idx_interacoes_medicamento_id ON Interacoes(medicamento_id);
CREATE INDEX idx_cids_name ON CIDs(name);
CREATE INDEX idx_medicamentos_nome ON Medicamentos(nome);

