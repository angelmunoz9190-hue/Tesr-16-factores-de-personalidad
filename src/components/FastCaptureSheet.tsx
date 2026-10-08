import React, { useState, useRef, useEffect } from 'react';
import {
  FileSpreadsheet,
  CheckCircle2,
  Trash2,
  Sparkles,
  ArrowRight,
  User,
  Calendar,
  Layers,
  Keyboard,
  Info,
} from 'lucide-react';
import { calculate16PFScores, generateSampleAnswers } from '../utils/scoreCalculator';
import { EvaluationRecord } from '../services/googleSheets';

interface FastCaptureSheetProps {
  onGenerateReport: (record: EvaluationRecord) => void;
}

export const FastCaptureSheet: React.FC<FastCaptureSheetProps> = ({ onGenerateReport }) => {
  const [name, setName] = useState('');
  const [folio, setFolio] = useState('');
  const [gender, setGender] = useState<'M' | 'F'>('F');
  const [age, setAge] = useState<number>(20);
  const [emphasis, setEmphasis] = useState('Español e Inglés');
  const [answers, setAnswers] = useState<Record<number, 'a' | 'b' | 'c'>>({});
  const [activeQuestion, setActiveQuestion] = useState<number>(1);

  // Group 187 questions into 8 columns matching the official Excel capture sheet
  // Col 1: 1-25
  // Col 2: 26-50
  // Col 3: 51-75
  // Col 4: 76-100
  // Col 5: 101-125
  // Col 6: 126-150
  // Col 7: 151-175
  // Col 8: 176-187
  const columns = [
    { start: 1, end: 25 },
    { start: 26, end: 50 },
    { start: 51, end: 75 },
    { start: 76, end: 100 },
    { start: 101, end: 125 },
    { start: 126, end: 150 },
    { start: 151, end: 175 },
    { start: 176, end: 187 },
  ];

  const handleSetAnswer = (qNum: number, choice: 'a' | 'b' | 'c') => {
    setAnswers((prev) => ({ ...prev, [qNum]: choice }));
    // Auto advance to next question
    if (qNum < 187) {
      setActiveQuestion(qNum + 1);
    }
  };

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If typing in input, ignore
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'SELECT'
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      if (key === 'a' || key === 'b' || key === 'c') {
        e.preventDefault();
        handleSetAnswer(activeQuestion, key);
      } else if (e.key === 'ArrowDown' || e.key === 'Enter') {
        e.preventDefault();
        setActiveQuestion((prev) => (prev < 187 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveQuestion((prev) => (prev > 1 ? prev - 1 : prev));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setActiveQuestion((prev) => Math.min(187, prev + 25));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveQuestion((prev) => Math.max(1, prev - 25));
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        setAnswers((prev) => {
          const next = { ...prev };
          delete next[activeQuestion];
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeQuestion]);

  const answeredCount = Object.keys(answers).length;

  const handleFillDemo = (type: 'ideal' | 'equilibrado' | 'reservado' = 'ideal') => {
    const demo = generateSampleAnswers(type);
    setAnswers(demo);
    if (!name) setName('Mariana Lizárraga Gómez');
    if (!folio) setFolio('LELE-ADM-2026-031');
    setAge(19);
  };

  const handleClear = () => {
    if (window.confirm('¿Deseas borrar todas las respuestas capturadas?')) {
      setAnswers({});
      setActiveQuestion(1);
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('Por favor ingresa el nombre del aspirante.');
      return;
    }
    if (answeredCount < 187) {
      const confirmCont = window.confirm(
        `Se han capturado ${answeredCount} de las 187 respuestas. ¿Deseas generar el reporte con los reactivos actuales?`
      );
      if (!confirmCont) return;
    }

    const record = calculate16PFScores(answers, {
      name,
      folio: folio || `FOLIO-${Math.floor(1000 + Math.random() * 9000)}`,
      gender,
      age,
      emphasis,
    });

    onGenerateReport(record);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header Info Banner */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-blue-100 text-blue-700">
                <FileSpreadsheet className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Hoja de Captura Rápida de Respuestas (16PF Forma A)
                </h2>
                <p className="text-xs text-slate-500">
                  Diseño réplica de la plantilla oficial de vaciado para exámenes físicos en papel
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => handleFillDemo('ideal')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold transition cursor-pointer border border-blue-200"
              title="Cargar 187 respuestas simuladas para probar el reporte gráfico inmediatamente"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Cargar Respuestas de Ejemplo</span>
            </button>

            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600 font-semibold transition cursor-pointer border border-slate-200"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpiar Hoja</span>
            </button>

            <div className="bg-slate-900 text-white px-3.5 py-1.5 rounded-lg font-bold">
              {answeredCount} / 187 capturadas
            </div>
          </div>
        </div>

        {/* Candidate Information Header (Matching Excel Sheet) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-5">
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Nombre del Aspirante:
            </label>
            <input
              type="text"
              placeholder="Ej. Rodrigo Silva Valenzuela"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Folio de Admisión:
            </label>
            <input
              type="text"
              placeholder="LELE-2026-059"
              value={folio}
              onChange={(e) => setFolio(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Sexo (Baremo):
            </label>
            <div className="flex gap-4 pt-1.5 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
                <input
                  type="radio"
                  name="capture_gender"
                  checked={gender === 'F'}
                  onChange={() => setGender('F')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Mujer</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
                <input
                  type="radio"
                  name="capture_gender"
                  checked={gender === 'M'}
                  onChange={() => setGender('M')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Hombre</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Edad (años):
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value) || 18)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
            />
          </div>
        </div>

        {/* Keyboard Shortcut Helper Bar */}
        <div className="mt-4 bg-blue-50/70 border border-blue-200/60 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs text-blue-900">
          <div className="flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-blue-600" />
            <span className="font-semibold">Captura Rápida por Teclado:</span>
            <span className="text-blue-800">
              Presione las teclas <kbd className="px-1.5 py-0.5 bg-white rounded border border-blue-300 font-bold">A</kbd>, <kbd className="px-1.5 py-0.5 bg-white rounded border border-blue-300 font-bold">B</kbd> o <kbd className="px-1.5 py-0.5 bg-white rounded border border-blue-300 font-bold">C</kbd> para registrar y avanzar automáticamente al siguiente reactivo.
            </span>
          </div>
          <span className="text-[11px] text-blue-700">
            Reactivo activo: <strong className="text-blue-950 font-bold">#{activeQuestion}</strong>
          </span>
        </div>
      </div>

      {/* 8-Column Grid View (Identical to User's Excel Sheet Screenshot) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 overflow-x-auto">
        <div className="text-center font-bold text-slate-700 text-xs uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
          ASEGÚRESE DE QUE SE VEAN SUS MARCACIONES • HOJA DE RESPUESTAS FORMA A
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 min-w-[760px]">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="bg-slate-50/60 rounded-lg p-2 border border-slate-200">
              <div className="text-[11px] font-bold text-blue-800 text-center pb-1.5 border-b border-slate-200 mb-2">
                Cols {col.start} - {col.end}
              </div>

              <div className="space-y-1">
                {Array.from({ length: col.end - col.start + 1 }, (_, i) => {
                  const qNum = col.start + i;
                  const currentAns = answers[qNum];
                  const isActive = activeQuestion === qNum;

                  return (
                    <div
                      key={qNum}
                      onClick={() => setActiveQuestion(qNum)}
                      className={`flex items-center justify-between px-1.5 py-1 rounded text-[11px] transition cursor-pointer ${
                        isActive
                          ? 'bg-blue-600 text-white font-bold ring-2 ring-blue-400'
                          : currentAns
                          ? 'bg-blue-100/50 text-slate-800'
                          : 'hover:bg-slate-200/50 text-slate-600'
                      }`}
                    >
                      <span className={`w-6 font-semibold ${isActive ? 'text-white' : 'text-slate-700'}`}>
                        {qNum}
                      </span>

                      {/* Options a, b, c */}
                      <div className="flex items-center gap-1">
                        {(['a', 'b', 'c'] as const).map((opt) => {
                          const isSelected = currentAns === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSetAnswer(qNum, opt);
                              }}
                              className={`w-4 h-4 rounded text-[10px] font-bold flex items-center justify-center transition border ${
                                isSelected
                                  ? isActive
                                    ? 'bg-white text-blue-800 border-white'
                                    : 'bg-blue-600 text-white border-blue-600'
                                  : isActive
                                  ? 'bg-blue-700/60 text-blue-100 border-blue-400 hover:bg-blue-500'
                                  : 'bg-white text-slate-500 border-slate-300 hover:bg-slate-100'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {colIdx === 7 && (
                <div className="mt-3 text-[10px] text-center font-bold text-slate-500 border-t border-slate-200 pt-1">
                  Fin del cuestionario
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Submission Action */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Total reactivos respondidos:{' '}
            <strong className="text-slate-800 text-sm">{answeredCount} de 187</strong>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-600/25 transition cursor-pointer text-sm"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Generar Reporte Gráfico 16PF Oficial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
