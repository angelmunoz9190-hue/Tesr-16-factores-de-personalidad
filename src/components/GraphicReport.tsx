import React, { useState } from 'react';
import {
  Download,
  FileSpreadsheet,
  CheckCircle,
  AlertTriangle,
  Award,
  BookOpen,
  Info,
  Calendar,
  User,
  GraduationCap,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileText,
  Printer,
  ShieldCheck,
} from 'lucide-react';
import { EvaluationRecord } from '../services/googleSheets';
import {
  FACTORS_METADATA,
  FactorCode,
  calculateSecondaryFactors,
  calculateTeachingCompetencies,
  calculateTeachingSuitability,
} from '../data/scalesData';
import { generate16PFPdf } from '../services/pdfReport';

interface GraphicReportProps {
  record: EvaluationRecord;
  onSaveToGoogleSheets: (record: EvaluationRecord) => Promise<void>;
  isSavingToSheets: boolean;
  sheetsSavedSuccess: boolean;
  spreadsheetUrl: string | null;
  onNewEvaluation: () => void;
  onExportCSV: () => void;
}

export const GraphicReport: React.FC<GraphicReportProps> = ({
  record,
  onSaveToGoogleSheets,
  isSavingToSheets,
  sheetsSavedSuccess,
  spreadsheetUrl,
  onNewEvaluation,
  onExportCSV,
}) => {
  const [selectedFactor, setSelectedFactor] = useState<FactorCode | null>('A');
  const [showFullTable, setShowFullTable] = useState(true);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const factorOrder: FactorCode[] = [
    'A',
    'B',
    'C',
    'E',
    'F',
    'G',
    'H',
    'I',
    'L',
    'M',
    'N',
    'O',
    'Q1',
    'Q2',
    'Q3',
    'Q4',
  ];

  const suitability = calculateTeachingSuitability(record.estens, record.name);
  const secondaries = calculateSecondaryFactors(record.estens);
  const competencies = calculateTeachingCompetencies(record.estens);

  const handleDownloadPdf = async () => {
    try {
      setIsGeneratingPdf(true);
      await generate16PFPdf(record);
    } catch (e) {
      console.error(e);
      alert('Hubo un error al generar el PDF. Por favor reintente.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Dimensions for responsive profile chart
  // Chart width 100%, 10 columns for stens 1 to 10
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Top Action & Summary Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-blue-100 text-blue-700">
                <GraduationCap className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Reporte Psicométrico Oficial 16PF • Perfil Docente
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Licenciatura en Enseñanza de Lenguas Extranjeras (Español e Inglés) • Cuestionario Forma A
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md shadow-blue-700/20 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingPdf ? 'Generando PDF...' : 'Descargar Reporte PDF'}</span>
            </button>

            <button
              onClick={() => onSaveToGoogleSheets(record)}
              disabled={isSavingToSheets}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs shadow transition cursor-pointer ${
                sheetsSavedSuccess
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>
                {isSavingToSheets
                  ? 'Guardando...'
                  : sheetsSavedSuccess
                  ? 'Guardado en Google Sheets ✓'
                  : 'Guardar en Google Sheets'}
              </span>
            </button>

            <button
              onClick={onExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 transition cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Exportar CSV</span>
            </button>

            <button
              onClick={onNewEvaluation}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs transition cursor-pointer"
            >
              <span>Nueva Evaluación</span>
            </button>
          </div>
        </div>

        {/* Candidate Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-6 text-xs">
          <div className="sm:col-span-2">
            <span className="text-slate-400 font-medium block">Aspirante:</span>
            <span className="font-extrabold text-slate-900 text-sm">{record.name}</span>
          </div>

          <div>
            <span className="text-slate-400 font-medium block">Folio de Admisión:</span>
            <span className="font-bold text-slate-800 text-sm">{record.folio}</span>
          </div>

          <div>
            <span className="text-slate-400 font-medium block">Sexo y Baremo:</span>
            <span className="font-bold text-slate-800">
              {record.gender === 'M' ? 'Hombre (Adultos I)' : 'Mujer (Adultos II)'}
            </span>
          </div>

          <div>
            <span className="text-slate-400 font-medium block">Edad y Énfasis:</span>
            <span className="font-bold text-slate-800">
              {record.age} años • {record.emphasis}
            </span>
          </div>

          <div>
            <span className="text-slate-400 font-medium block">Fecha de Evaluación:</span>
            <span className="font-bold text-slate-800">
              {new Date(record.timestamp).toLocaleDateString('es-MX')}
            </span>
          </div>
        </div>

        {/* Suitability Banner */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 via-slate-50 to-blue-50/40 border border-blue-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-base shadow-sm">
              {suitability.overallPercentage}%
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-wider text-slate-500">
                  Dictamen de Idoneidad Docente en Lenguas:
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    suitability.verdict === 'Altamente Idóneo'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : suitability.verdict === 'Favorable'
                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                      : suitability.verdict === 'Favorable con Observaciones'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                >
                  {suitability.verdict}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">{suitability.summary}</p>
            </div>
          </div>

          {spreadsheetUrl && (
            <a
              href={spreadsheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-blue-700 hover:text-blue-900 font-semibold underline underline-offset-2 whitespace-nowrap"
            >
              <span>Ver en Google Sheets</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* --- SECTION 1: PERFIL GRÁFICO 16PF (THE CLASSIC PSYCHOMETRIC CURVE) --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>Perfil Psicométrico de los 16 Factores de Personalidad (16PF)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Escala de Estenes (1 a 10). La zona sombreada central (4 a 7) representa el rango normal / promedio poblacional.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-blue-200/80 inline-block border border-blue-300"></span>
              <span className="text-slate-600">Franja Promedio (4-7)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
              <span className="text-slate-600">Puntaje del Aspirante</span>
            </span>
          </div>
        </div>

        {/* Visual 16PF Chart Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[840px] border border-slate-300 rounded-xl overflow-hidden text-xs">
            {/* Header row */}
            <div className="grid grid-cols-12 bg-blue-800 text-white font-bold py-2.5 px-3 items-center text-center">
              <div className="col-span-1 text-center font-extrabold">Factor</div>
              <div className="col-span-3 text-left pl-2">Baja Puntuación (Polos 1-3)</div>
              <div className="col-span-5 grid grid-cols-10 text-center">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
                  <span key={s} className="font-extrabold">
                    {s}
                  </span>
                ))}
              </div>
              <div className="col-span-3 text-right pr-2">Alta Puntuación (Polos 8-10)</div>
            </div>

            {/* Rows with background bands and points */}
            <div className="relative divide-y divide-slate-200">
              {factorOrder.map((fCode, idx) => {
                const meta = FACTORS_METADATA[fCode];
                const sten = record.estens[fCode] || 5;
                const pb = record.rawScores[fCode] || 0;
                const isSelected = selectedFactor === fCode;
                const isRowEven = idx % 2 === 0;

                return (
                  <div
                    key={fCode}
                    onClick={() => setSelectedFactor(fCode)}
                    className={`grid grid-cols-12 items-center py-2 px-3 transition cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/90 ring-1 ring-blue-500'
                        : isRowEven
                        ? 'bg-white hover:bg-slate-50'
                        : 'bg-slate-50/60 hover:bg-slate-100/60'
                    }`}
                  >
                    {/* Factor Code & PB */}
                    <div className="col-span-1 flex items-center justify-center gap-1">
                      <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-900 font-black text-xs flex items-center justify-center">
                        {fCode}
                      </span>
                    </div>

                    {/* Low Description */}
                    <div className="col-span-3 text-left pl-2 text-[11px] text-slate-600 truncate" title={meta.lowScoreLabel}>
                      {meta.lowScoreLabel}
                    </div>

                    {/* 10 Sten Columns Area */}
                    <div className="col-span-5 grid grid-cols-10 h-7 items-center relative">
                      {/* Sombreado de franja promedio (columnas 4, 5, 6, 7 -> indices 3, 4, 5, 6) */}
                      <div className="absolute inset-y-0 left-[30%] right-[30%] bg-blue-100/40 pointer-events-none border-x border-blue-200/50"></div>

                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => {
                        const isPoint = s === sten;
                        return (
                          <div
                            key={s}
                            className="flex items-center justify-center relative h-full border-r border-slate-100 last:border-r-0"
                          >
                            {/* Grid vertical dot */}
                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>

                            {/* Point on candidate sten */}
                            {isPoint && (
                              <div
                                className="absolute z-10 w-6 h-6 rounded-full bg-blue-600 text-white font-extrabold text-[11px] flex items-center justify-center shadow-md ring-2 ring-white animate-scale-in"
                                title={`Factor ${fCode}: Esten ${sten} (PB: ${pb})`}
                              >
                                {sten}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* High Description */}
                    <div className="col-span-3 text-right pr-2 text-[11px] text-slate-600 truncate" title={meta.highScoreLabel}>
                      {meta.highScoreLabel}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Factor Detail Card */}
        {selectedFactor && (
          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-200 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                  {selectedFactor}
                </span>
                <span className="font-bold text-slate-800 text-sm">
                  {FACTORS_METADATA[selectedFactor].name}
                </span>
                <span className="text-slate-400 text-xs">
                  ({FACTORS_METADATA[selectedFactor].technicalName})
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="text-slate-600">
                  Puntuación Bruta (PB):{' '}
                  <strong className="text-slate-900">{record.rawScores[selectedFactor]}</strong>
                </span>
                <span className="text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full font-bold">
                  Esten: {record.estens[selectedFactor]} de 10
                </span>
                <span className="text-slate-600">
                  Rango Docente Óptimo:{' '}
                  <strong className="text-slate-900">
                    {FACTORS_METADATA[selectedFactor].optimalTeachingRange[0]} -{' '}
                    {FACTORS_METADATA[selectedFactor].optimalTeachingRange[1]}
                  </strong>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
              <div>
                <span className="font-bold text-slate-800 block mb-1">
                  Diagnóstico del Aspirante en este Factor:
                </span>
                <p className="leading-relaxed">
                  {record.estens[selectedFactor] >= 8
                    ? FACTORS_METADATA[selectedFactor].highDescription
                    : record.estens[selectedFactor] <= 3
                    ? FACTORS_METADATA[selectedFactor].lowDescription
                    : FACTORS_METADATA[selectedFactor].averageDescription}
                </p>
              </div>

              <div>
                <span className="font-bold text-blue-900 block mb-1">
                  Relevancia para la Enseñanza de Lenguas Extranjeras (Español e Inglés):
                </span>
                <p className="text-blue-950/80 leading-relaxed">
                  {FACTORS_METADATA[selectedFactor].teachingRelevance}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- SECTION 2: COMPETENCIAS DOCENTES PARA ENSEÑANZA DE IDIOMAS --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span>Competencias Clave para la Enseñanza del Español e Inglés</span>
          </h3>
          <p className="text-xs text-slate-500">
            Cálculo ponderado a partir de los factores primarios del 16PF adaptado al perfil de egreso docente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {competencies.map((c, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                  {c.category}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    c.level === 'Excelente'
                      ? 'bg-emerald-100 text-emerald-800'
                      : c.level === 'Competente'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {c.level}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900">{c.name}</h4>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Ajuste Competencial:</span>
                  <span>{c.score}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${c.score}%` }}
                  ></div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-snug">{c.description}</p>
              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 italic">
                {c.evaluatorTips}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- SECTION 3: FACTORES DE SEGUNDO ORDEN (CATTELL) --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>Factores Globales / de Segundo Orden (Cattell)</span>
          </h3>
          <p className="text-xs text-slate-500">
            Dimensiones integradas de personalidad que influyen en el estilo de docencia y adaptación al trabajo institucional
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {secondaries.map((sec) => (
            <div
              key={sec.id}
              className="p-4 rounded-xl border border-slate-200 bg-white text-center space-y-2 hover:shadow-md transition"
            >
              <span className="text-xs font-black text-blue-600 tracking-wider block">
                {sec.id}
              </span>
              <h5 className="text-xs font-bold text-slate-800">{sec.name}</h5>

              {/* Sten Badge */}
              <div className="my-2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-700 text-white font-extrabold text-sm shadow">
                {sec.sten}
              </div>

              <div className="text-[11px] font-semibold text-slate-600">
                Nivel: <strong className="text-slate-900">{sec.level}</strong>
              </div>

              <p className="text-[11px] text-slate-500 leading-tight">{sec.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- SECTION 4: DICTAMEN DE ADMISIÓN Y PREGUNTAS PARA ENTREVISTA --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <span>Recomendaciones para el Comité de Selección y Entrevista Vocacional</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
          {/* Strengths and attention areas */}
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <h5 className="font-bold text-emerald-900 mb-2 flex items-center gap-1.5 text-xs">
                <CheckCircle className="w-4 h-4 text-emerald-700" />
                <span>Fortalezas Identificadas para la Docencia de Lenguas:</span>
              </h5>
              <ul className="list-disc list-inside space-y-1 text-emerald-800">
                {suitability.strengths.map((str, i) => (
                  <li key={i}>{str}</li>
                ))}
              </ul>
            </div>

            {suitability.areasOfAttention.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <h5 className="font-bold text-amber-900 mb-2 flex items-center gap-1.5 text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>Áreas de Observación y Acompañamiento Tutorial:</span>
                </h5>
                <ul className="list-disc list-inside space-y-1 text-amber-800">
                  {suitability.areasOfAttention.map((area, i) => (
                    <li key={i}>{area}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Recommended Interview Questions */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 space-y-3">
            <h5 className="font-bold text-blue-900 text-xs flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-700" />
              <span>Preguntas Sugeridas para la Entrevista con el Comité:</span>
            </h5>
            <div className="space-y-2">
              {suitability.interviewQuestions.map((q, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-white border border-blue-100 text-slate-800">
                  <span className="font-bold text-blue-800 mr-1.5">P{i + 1}:</span>
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
