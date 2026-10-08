import React from 'react';
import {
  GraduationCap,
  FileSpreadsheet,
  BarChart3,
  ClipboardPen,
  History,
  FileText,
  ExternalLink,
  CheckCircle2,
  LogIn,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { User } from 'firebase/auth';

interface NavbarProps {
  currentTab: 'test' | 'capture' | 'report' | 'history';
  setCurrentTab: (tab: 'test' | 'capture' | 'report' | 'history') => void;
  hasActiveReport: boolean;
  googleUser: User | null;
  spreadsheetUrl: string | null;
  onOpenGoogleModal: () => void;
  onGoogleSignIn: () => void;
  onGoogleSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  hasActiveReport,
  googleUser,
  spreadsheetUrl,
  onOpenGoogleModal,
  onGoogleSignIn,
  onGoogleSignOut,
}) => {
  return (
    <header className="bg-slate-900 border-b border-blue-900/60 sticky top-0 z-40 shadow-md">
      {/* Top University Brand Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white px-4 py-2 border-b border-blue-700/50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-blue-600/80 text-white font-bold text-[11px]">
              LE
            </span>
            <span className="font-semibold text-white">Licenciatura en Enseñanza de Lenguas Extranjeras</span>
            <span className="hidden sm:inline text-blue-200">•</span>
            <span className="hidden sm:inline text-blue-100 font-normal">Español e Inglés • Proceso de Admisión</span>
          </div>

          {/* Google Sheets Status */}
          <div className="flex items-center gap-2">
            {googleUser ? (
              <div className="flex items-center gap-2 bg-blue-950/80 px-2.5 py-1 rounded border border-blue-600/40 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-blue-100 hidden md:inline truncate max-w-[140px]">
                  {googleUser.email}
                </span>
                {spreadsheetUrl && (
                  <a
                    href={spreadsheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-300 hover:text-emerald-200 font-semibold underline underline-offset-2 ml-1"
                    title="Abrir hoja vinculada en Google Sheets"
                  >
                    <span>Hoja Sheets</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <button
                  onClick={onOpenGoogleModal}
                  className="text-xs text-blue-200 hover:text-white px-1.5 py-0.5 rounded hover:bg-blue-800 transition"
                  title="Configurar Google Sheets"
                >
                  Config
                </button>
                <button
                  onClick={onGoogleSignOut}
                  className="text-xs text-rose-300 hover:text-rose-100 px-1 py-0.5"
                  title="Cerrar sesión de Google"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={onGoogleSignIn}
                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded font-medium transition text-xs shadow-sm cursor-pointer"
                title="Conectar con Google para guardar respuestas en Sheets"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-blue-100" />
                <span>Vincular Google Sheets</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Nav Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20 border border-blue-400/30">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight">
                16PF <span className="text-blue-400 font-semibold text-sm">Forma A (187 reactivos)</span>
              </h1>
              <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-500/30">
                Psicometría Oficial
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Evaluación diagnóstica de personalidad para la formación docente bilingüe
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setCurrentTab('test')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
              currentTab === 'test'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ClipboardPen className="w-4 h-4" />
            <span>Test Aspirante (Online)</span>
          </button>

          <button
            onClick={() => setCurrentTab('capture')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
              currentTab === 'capture'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Hoja de Captura Rápida (Excel)</span>
          </button>

          <button
            onClick={() => setCurrentTab('report')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
              currentTab === 'report'
                ? 'bg-blue-600 text-white shadow-sm'
                : hasActiveReport
                ? 'text-blue-300 hover:text-white hover:bg-slate-800'
                : 'text-slate-500 hover:text-slate-400 hover:bg-slate-800/50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Reporte Gráfico 16PF</span>
            {hasActiveReport && (
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
            )}
          </button>

          <button
            onClick={() => setCurrentTab('history')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
              currentTab === 'history'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Historial de Aspirantes</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
