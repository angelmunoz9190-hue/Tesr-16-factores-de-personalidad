import React, { useState, useEffect } from 'react';
import {
  ClipboardCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  HelpCircle,
  AlertCircle,
  User,
  Clock,
  Sparkles,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { QUESTIONS_16PF, Question16PF } from '../data/questions16pf';
import { calculate16PFScores, generateSampleAnswers } from '../utils/scoreCalculator';
import { EvaluationRecord } from '../services/googleSheets';

interface CandidateTestProps {
  onComplete: (record: EvaluationRecord) => void;
}

export const CandidateTest: React.FC<CandidateTestProps> = ({ onComplete }) => {
  // Candidate Info
  const [name, setName] = useState('');
  const [folio, setFolio] = useState('');
  const [gender, setGender] = useState<'M' | 'F'>('F');
  const [age, setAge] = useState<number>(18);
  const [emphasis, setEmphasis] = useState('Español e Inglés');

  // Test state
  const [isStarted, setIsStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, 'a' | 'b' | 'c'>>({});
  const [currentPage, setCurrentPage] = useState(0); // 10 questions per page (19 pages total)
  const pageSize = 10;
  const totalPages = Math.ceil(QUESTIONS_16PF.length / pageSize);

  // Example state for practice
  const [exampleAnswers, setExampleAnswers] = useState<Record<number, string>>({});

  // Restore answers from localStorage on mount if available
  useEffect(() => {
    const saved = localStorage.getItem('16pf_in_progress_answers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setAnswers(parsed);
        }
      } catch (e) {
        console.error(e);
      }
    }

    const savedInfo = localStorage.getItem('16pf_in_progress_candidate');
    if (savedInfo) {
      try {
        const parsed = JSON.parse(savedInfo);
        if (parsed.name) setName(parsed.name);
        if (parsed.folio) setFolio(parsed.folio);
        if (parsed.gender) setGender(parsed.gender);
        if (parsed.age) setAge(parsed.age);
        if (parsed.emphasis) setEmphasis(parsed.emphasis);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save progress
  const handleSelectAnswer = (qId: number, val: 'a' | 'b' | 'c') => {
    const nextAnswers = { ...answers, [qId]: val };
    setAnswers(nextAnswers);
    localStorage.setItem('16pf_in_progress_answers', JSON.stringify(nextAnswers));
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / QUESTIONS_16PF.length) * 100);

  const startTest = () => {
    if (!name.trim()) {
      alert('Por favor escribe el nombre completo del aspirante.');
      return;
    }
    const candidateInfo = { name, folio, gender, age, emphasis };
    localStorage.setItem('16pf_in_progress_candidate', JSON.stringify(candidateInfo));
    setIsStarted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinish = () => {
    if (answeredCount < 187) {
      const confirmSubmit = window.confirm(
        `Has respondido ${answeredCount} de las 187 preguntas. ¿Deseas finalizar la prueba ahora? Las preguntas sin responder podrían afectar la precisión del baremo.`
      );
      if (!confirmSubmit) return;
    }

    const record = calculate16PFScores(answers, {
      name,
      folio,
      gender,
      age,
      emphasis,
    });

    // Clear test in progress
    localStorage.removeItem('16pf_in_progress_answers');
    onComplete(record);
  };

  const loadDemoAnswers = () => {
    const demo = generateSampleAnswers('ideal');
    setAnswers(demo);
    localStorage.setItem('16pf_in_progress_answers', JSON.stringify(demo));
    setName(name || 'Sofía Mendoza Alvarado');
    setFolio(folio || 'LELE-2026-084');
    setGender('F');
    setAge(21);
    setIsStarted(true);
  };

  const currentQuestions = QUESTIONS_16PF.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {!isStarted ? (
        /* REGISTRATION & INSTRUCTIONS VIEW */
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white p-6 sm:p-8">
            <span className="inline-block bg-blue-500/30 text-blue-100 text-xs font-semibold px-3 py-1 rounded-full border border-blue-400/30 mb-3">
              Proceso de Admisión 2026-2027
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Cuestionario 16 Factores de Personalidad (16PF)
            </h2>
            <p className="mt-2 text-blue-100 text-sm sm:text-base leading-relaxed">
              Licenciatura en Enseñanza de Lenguas Extranjeras (Español e Inglés). Esta evaluación nos permite conocer sus aptitudes de comunicación, temperamento pedagógico y adaptación al aula bilingüe.
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Candidate Information Form */}
            <div>
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-blue-600" />
                <span>1. Ficha del Aspirante</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Carlos Eduardo Ramírez Peña"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Folio / Matrícula
                  </label>
                  <input
                    type="text"
                    value={folio}
                    onChange={(e) => setFolio(e.target.value)}
                    placeholder="Ej. LELE-2026-042"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Sexo (para baremo estandarizado) *
                  </label>
                  <div className="flex gap-4 pt-1.5">
                    <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        checked={gender === 'F'}
                        onChange={() => setGender('F')}
                        className="text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <span>Mujer (Baremo Femenino)</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        checked={gender === 'M'}
                        onChange={() => setGender('M')}
                        className="text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <span>Hombre (Baremo Masculino)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Edad (años) *
                  </label>
                  <input
                    type="number"
                    min={15}
                    max={80}
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value) || 18)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Énfasis Lingüístico
                  </label>
                  <select
                    value={emphasis}
                    onChange={(e) => setEmphasis(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm outline-none transition bg-white"
                  >
                    <option value="Español e Inglés">Bilingüe: Español e Inglés</option>
                    <option value="Enseñanza del Inglés">Énfasis en Lengua Inglesa</option>
                    <option value="Enseñanza del Español">Énfasis en Lengua Española</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Official Instructions */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-5 h-5 text-blue-600" />
                <span>2. Instrucciones para Responder</span>
              </h3>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>
                  A continuación encontrará <strong>187 preguntas</strong>. En este cuestionario <strong>no hay respuestas buenas ni malas</strong>, ya que cada persona tiene distintas actitudes, preferencias y estilos pedagógicos.
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 pl-1">
                  <li><strong>Conteste con sinceridad:</strong> Exprese lo que es cierto para usted en la realidad cotidiana.</li>
                  <li><strong>No medite demasiado:</strong> Dé la primera respuesta que le venga a la mente de modo natural.</li>
                  <li><strong>Evite la opción intermedia (b):</strong> Utilice la opción de en medio únicamente cuando le sea verdaderamente imposible inclinarse por la opción (a) o (c).</li>
                  <li><strong>No deje preguntas en blanco:</strong> Cada reactivo aporta información valiosa para su diagnóstico de admisión.</li>
                  <li><strong>Tiempo aproximado:</strong> 35 a 45 minutos. Puede avanzar a su propio ritmo.</li>
                </ul>
              </div>
            </div>

            {/* Practice Examples */}
            <div className="border-t border-slate-200 pt-6">
              <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-3">
                Ejemplos de Práctica (Forma A):
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg border border-slate-200 bg-white">
                  <span className="font-bold text-slate-800 block mb-1">
                    Ejemplo 1: Me gusta ver juegos deportivos entre equipos:
                  </span>
                  <div className="flex gap-2 text-slate-600">
                    <span>a) Sí</span>
                    <span>b) En ocasiones</span>
                    <span>c) No</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-white">
                  <span className="font-bold text-slate-800 block mb-1">
                    Ejemplo 2: Prefiero a la gente que es:
                  </span>
                  <div className="flex gap-2 text-slate-600">
                    <span>a) Reservada</span>
                    <span>b) Intermedia</span>
                    <span>c) Hace amigos rápidamente</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-white">
                  <span className="font-bold text-slate-800 block mb-1">
                    Ejemplo 3: El dinero no trae la felicidad:
                  </span>
                  <div className="flex gap-2 text-slate-600">
                    <span>a) Sí (cierto)</span>
                    <span>b) Intermedio</span>
                    <span>c) No (falso)</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-white">
                  <span className="font-bold text-slate-800 block mb-1">
                    Ejemplo 4: Mujer es a niña como gato es a:
                  </span>
                  <div className="flex gap-2 text-slate-600">
                    <span>a) Gatito</span>
                    <span>b) Perro</span>
                    <span>c) Niño</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={loadDemoAnswers}
                className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1.5 p-2 rounded hover:bg-blue-50 transition cursor-pointer"
                title="Carga respuestas de ejemplo de un aspirante idóneo para revisar el reporte inmediatamente"
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Simular Aspirante con Respuestas de Demostración</span>
              </button>

              <button
                type="button"
                onClick={startTest}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-600/25 transition cursor-pointer text-sm"
              >
                <span>Comenzar Cuestionario (187 reactivos)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* QUESTIONNAIRE RUNNER VIEW */
        <div className="space-y-6">
          {/* Top Floating Progress Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 sticky top-20 z-30">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs mb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{name}</span>
                <span className="text-slate-400">•</span>
                <span className="text-blue-600 font-medium">Folio: {folio || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-600 font-medium">
                  {answeredCount} de 187 contestadas ({progressPercent}%)
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-700 font-bold">
                  Página {currentPage + 1} de {totalPages}
                </span>
              </div>
            </div>

            {/* Progress visual bar */}
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Current Page Question Cards */}
          <div className="space-y-4">
            {currentQuestions.map((q) => {
              const currentAns = answers[q.id];
              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-xl p-5 border transition-all shadow-sm ${
                    currentAns
                      ? 'border-blue-300/80 bg-blue-50/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center">
                      {q.id}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm sm:text-base font-semibold text-slate-800 leading-snug mb-3">
                        {q.text}
                      </p>

                      {/* 3 Answer choices */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleSelectAnswer(q.id, 'a')}
                          className={`flex items-center gap-2.5 p-3 rounded-lg border text-left text-xs sm:text-sm font-medium transition cursor-pointer ${
                            currentAns === 'a'
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                              currentAns === 'a'
                                ? 'bg-white text-blue-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            a
                          </span>
                          <span className="flex-1">{q.options.a}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSelectAnswer(q.id, 'b')}
                          className={`flex items-center gap-2.5 p-3 rounded-lg border text-left text-xs sm:text-sm font-medium transition cursor-pointer ${
                            currentAns === 'b'
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                              currentAns === 'b'
                                ? 'bg-white text-blue-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            b
                          </span>
                          <span className="flex-1">{q.options.b}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSelectAnswer(q.id, 'c')}
                          className={`flex items-center gap-2.5 p-3 rounded-lg border text-left text-xs sm:text-sm font-medium transition cursor-pointer ${
                            currentAns === 'c'
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                              currentAns === 'c'
                                ? 'bg-white text-blue-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            c
                          </span>
                          <span className="flex-1">{q.options.c}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation & Controls */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              disabled={currentPage === 0}
              onClick={() => {
                setCurrentPage((p) => Math.max(0, p - 1));
                window.scrollTo({ top: 100, behavior: 'smooth' });
              }}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition ${
                currentPage === 0
                  ? 'text-slate-300 border border-slate-200 cursor-not-allowed'
                  : 'text-slate-700 border border-slate-300 hover:bg-slate-50 cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Página Anterior</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 hidden sm:inline">
                Pág. {currentPage + 1} de {totalPages}
              </span>
            </div>

            {currentPage < totalPages - 1 ? (
              <button
                type="button"
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages - 1, p + 1));
                  window.scrollTo({ top: 100, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow transition cursor-pointer"
              >
                <span>Página Siguiente</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-lg shadow-emerald-600/25 transition cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Finalizar y Generar Reporte 16PF</span>
              </button>
            )}
          </div>

          {/* Jump to question drawer grid */}
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Mapa General de Reactivos (1 a 187)
              </h4>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-blue-600 inline-block"></span>
                  Respondida
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-slate-200 inline-block"></span>
                  Pendiente
                </span>
              </div>
            </div>

            <div className="grid grid-cols-10 sm:grid-cols-19 gap-1 max-h-48 overflow-y-auto p-1 bg-slate-50 rounded-lg">
              {QUESTIONS_16PF.map((q) => {
                const isAns = !!answers[q.id];
                const pageForQ = Math.floor((q.id - 1) / pageSize);
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentPage(pageForQ);
                      window.scrollTo({ top: 100, behavior: 'smooth' });
                    }}
                    className={`h-7 rounded text-[11px] font-semibold flex items-center justify-center transition ${
                      isAns
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-blue-50'
                    }`}
                    title={`Pregunta ${q.id}: ${isAns ? 'Respondida (' + answers[q.id]?.toUpperCase() + ')' : 'Pendiente'}`}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
