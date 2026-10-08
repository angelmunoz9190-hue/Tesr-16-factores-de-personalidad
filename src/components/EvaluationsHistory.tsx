import React, { useState } from 'react';
import {
  History,
  Search,
  Download,
  FileSpreadsheet,
  FileText,
  Trash2,
  Eye,
  CheckCircle2,
  Calendar,
  User,
  Filter,
} from 'lucide-react';
import { EvaluationRecord, exportToCSV } from '../services/googleSheets';
import { generate16PFPdf } from '../services/pdfReport';

interface EvaluationsHistoryProps {
  records: EvaluationRecord[];
  onSelectRecord: (record: EvaluationRecord) => void;
  onDeleteRecord: (id: string) => void;
  onSyncRecordToSheets: (record: EvaluationRecord) => Promise<void>;
  isSyncing: boolean;
  spreadsheetUrl: string | null;
}

export const EvaluationsHistory: React.FC<EvaluationsHistoryProps> = ({
  records,
  onSelectRecord,
  onDeleteRecord,
  onSyncRecordToSheets,
  isSyncing,
  spreadsheetUrl,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [verdictFilter, setVerdictFilter] = useState('ALL');

  const filtered = records.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.folio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVerdict = verdictFilter === 'ALL' || r.suitabilityVerdict === verdictFilter;
    return matchesSearch && matchesVerdict;
  });

  const handleDownloadAllCSV = () => {
    if (records.length === 0) {
      alert('No hay evaluaciones para exportar.');
      return;
    }
    exportToCSV(records, `16PF_Base_Aspirantes_${new Date().toISOString().slice(0, 10)}.csv`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-blue-100 text-blue-700">
              <History className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Historial de Aspirantes Evaluados (16PF)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Registro acumulado de evaluaciones, puntuaciones de personalidad y dictámenes de admisión
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadAllCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Exportar Todo a CSV / Excel</span>
          </button>

          {spreadsheetUrl && (
            <a
              href={spreadsheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow transition cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Abrir Google Sheets</span>
            </a>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por nombre o folio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-slate-500 font-medium whitespace-nowrap">Filtrar Dictamen:</span>
          <select
            value={verdictFilter}
            onChange={(e) => setVerdictFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-xs bg-white"
          >
            <option value="ALL">Todos los dictámenes</option>
            <option value="Altamente Idóneo">Altamente Idóneo</option>
            <option value="Favorable">Favorable</option>
            <option value="Favorable con Observaciones">Favorable con Observaciones</option>
            <option value="Requiere Acompañamiento">Requiere Acompañamiento</option>
          </select>
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <History className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold">No se encontraron evaluaciones registradas</p>
            <p className="text-xs text-slate-400">
              Aplica una nueva prueba en línea o realiza la captura rápida para ver los resultados aquí.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs divide-y divide-slate-200">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-4 py-3">Folio</th>
                  <th className="px-4 py-3">Aspirante</th>
                  <th className="px-4 py-3">Sexo / Edad</th>
                  <th className="px-4 py-3">Idoneidad</th>
                  <th className="px-4 py-3">Dictamen</th>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-blue-50/30 transition">
                    <td className="px-4 py-3 font-bold text-blue-900">{r.folio}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">{r.name}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {r.gender === 'M' ? 'Hombre' : 'Mujer'} • {r.age} años
                    </td>
                    <td className="px-4 py-3 font-extrabold text-blue-700">
                      {r.suitabilityScore}%
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          r.suitabilityVerdict === 'Altamente Idóneo'
                            ? 'bg-emerald-100 text-emerald-800'
                            : r.suitabilityVerdict === 'Favorable'
                            ? 'bg-blue-100 text-blue-800'
                            : r.suitabilityVerdict === 'Favorable con Observaciones'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {r.suitabilityVerdict}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {new Date(r.timestamp).toLocaleDateString('es-MX')}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onSelectRecord(r)}
                          className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
                          title="Ver Reporte Gráfico Detallado"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => generate16PFPdf(r)}
                          className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                          title="Descargar PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onSyncRecordToSheets(r)}
                          disabled={isSyncing}
                          className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition"
                          title="Guardar en Google Sheets"
                        >
                          <FileSpreadsheet className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`¿Eliminar la evaluación de ${r.name}?`)) {
                              onDeleteRecord(r.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
