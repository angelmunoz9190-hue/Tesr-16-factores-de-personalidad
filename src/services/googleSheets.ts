import { getAccessToken } from './googleAuth';
import { FactorCode } from '../data/scalesData';

export interface EvaluationRecord {
  id: string;
  timestamp: string;
  folio: string;
  name: string;
  gender: 'M' | 'F';
  age: number;
  emphasis: string; // 'Español' | 'Inglés' | 'Ambos'
  rawScores: Record<FactorCode, number>;
  estens: Record<FactorCode, number>;
  secondaryFactors: {
    QI: number;
    QII: number;
    QIII: number;
    QIV: number;
    QV: number;
  };
  competencies: {
    comunicacion: number;
    estabilidad: number;
    innovacion: number;
    rigor: number;
    liderazgo: number;
  };
  suitabilityScore: number;
  suitabilityVerdict: string;
  answers: Record<number, 'a' | 'b' | 'c'>;
}

const DEFAULT_SHEET_TITLE = '16PF - Admisión Enseñanza de Lenguas Extranjeras';

export const SHEET_HEADERS = [
  'ID / Folio',
  'Fecha y Hora',
  'Nombre del Aspirante',
  'Sexo',
  'Edad',
  'Énfasis de Idioma',
  'Idoneidad Docente (%)',
  'Dictamen Vocacional',
  // Factores A - Q4 (Puntuación Bruta y Esten)
  'PB A', 'Esten A',
  'PB B', 'Esten B',
  'PB C', 'Esten C',
  'PB E', 'Esten E',
  'PB F', 'Esten F',
  'PB G', 'Esten G',
  'PB H', 'Esten H',
  'PB I', 'Esten I',
  'PB L', 'Esten L',
  'PB M', 'Esten M',
  'PB N', 'Esten N',
  'PB O', 'Esten O',
  'PB Q1', 'Esten Q1',
  'PB Q2', 'Esten Q2',
  'PB Q3', 'Esten Q3',
  'PB Q4', 'Esten Q4',
  // Factores Secundarios
  'QI Extraversión',
  'QII Ansiedad',
  'QIII Dureza Mental',
  'QIV Independencia',
  'QV Autocontrol',
  // Competencias Docentes %
  'Comp: Comunicación y Dinamismo (%)',
  'Comp: Estabilidad y Clima Aula (%)',
  'Comp: Innovación Didáctica (%)',
  'Comp: Rigor y Ética (%)',
  'Comp: Liderazgo Colegiado (%)',
  // 187 Reactivos (R1 a R187)
  ...Array.from({ length: 187 }, (_, i) => `R${i + 1}`),
];

export async function createGoogleSpreadsheet(title: string = DEFAULT_SHEET_TITLE): Promise<{ id: string; url: string }> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('No hay sesión activa de Google. Por favor inicia sesión primero.');
  }

  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title,
      },
      sheets: [
        {
          properties: {
            title: 'Resultados 16PF',
            gridProperties: {
              frozenRowCount: 1,
            },
          },
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || `Error al crear hoja de cálculo: ${response.statusText}`
    );
  }

  const data = await response.json();
  const spreadsheetId = data.spreadsheetId;

  // Insert Header Row
  await appendRowToSpreadsheet(spreadsheetId, SHEET_HEADERS, 'Resultados 16PF!A1');

  const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
  localStorage.setItem('16pf_active_spreadsheet_id', spreadsheetId);
  localStorage.setItem('16pf_active_spreadsheet_url', spreadsheetUrl);

  return { id: spreadsheetId, url: spreadsheetUrl };
}

export async function appendRowToSpreadsheet(
  spreadsheetId: string,
  rowValues: (string | number)[],
  range: string = 'Resultados 16PF!A:A'
): Promise<boolean> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('No hay sesión de Google disponible.');
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
    range
  )}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [rowValues],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || `Error al guardar registro en Google Sheets: ${response.statusText}`
    );
  }

  return true;
}

export function recordToRowValues(rec: EvaluationRecord): (string | number)[] {
  const row: (string | number)[] = [
    rec.folio,
    rec.timestamp,
    rec.name,
    rec.gender === 'M' ? 'Hombre' : 'Mujer',
    rec.age,
    rec.emphasis,
    rec.suitabilityScore,
    rec.suitabilityVerdict,
    rec.rawScores.A, rec.estens.A,
    rec.rawScores.B, rec.estens.B,
    rec.rawScores.C, rec.estens.C,
    rec.rawScores.E, rec.estens.E,
    rec.rawScores.F, rec.estens.F,
    rec.rawScores.G, rec.estens.G,
    rec.rawScores.H, rec.estens.H,
    rec.rawScores.I, rec.estens.I,
    rec.rawScores.L, rec.estens.L,
    rec.rawScores.M, rec.estens.M,
    rec.rawScores.N, rec.estens.N,
    rec.rawScores.O, rec.estens.O,
    rec.rawScores.Q1, rec.estens.Q1,
    rec.rawScores.Q2, rec.estens.Q2,
    rec.rawScores.Q3, rec.estens.Q3,
    rec.rawScores.Q4, rec.estens.Q4,
    rec.secondaryFactors.QI,
    rec.secondaryFactors.QII,
    rec.secondaryFactors.QIII,
    rec.secondaryFactors.QIV,
    rec.secondaryFactors.QV,
    rec.competencies.comunicacion,
    rec.competencies.estabilidad,
    rec.competencies.innovacion,
    rec.competencies.rigor,
    rec.competencies.liderazgo,
  ];

  // Append 187 answers
  for (let i = 1; i <= 187; i++) {
    row.push(rec.answers[i] ? rec.answers[i].toUpperCase() : '-');
  }

  return row;
}

export function exportToCSV(records: EvaluationRecord[], filename: string = '16pf_resultados.csv') {
  const rows = [SHEET_HEADERS];
  for (const rec of records) {
    rows.push(recordToRowValues(rec).map((v) => `"${String(v).replace(/"/g, '""')}"`));
  }

  const csvContent = '\uFEFF' + rows.map((r) => r.join(',')).join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
