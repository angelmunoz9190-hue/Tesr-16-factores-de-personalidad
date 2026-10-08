import React, { useState } from 'react';
import {
  X,
  FileSpreadsheet,
  CheckCircle2,
  ExternalLink,
  PlusCircle,
  Link2,
  AlertCircle,
  LogIn,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { createGoogleSpreadsheet } from '../services/googleSheets';

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  googleUser: User | null;
  activeSpreadsheetId: string | null;
  spreadsheetUrl: string | null;
  onSpreadsheetConfigured: (id: string, url: string) => void;
  onGoogleSignIn: () => void;
  onGoogleSignOut: () => void;
}

export const GoogleSheetsModal: React.FC<GoogleSheetsModalProps> = ({
  isOpen,
  onClose,
  googleUser,
  activeSpreadsheetId,
  spreadsheetUrl,
  onSpreadsheetConfigured,
  onGoogleSignIn,
  onGoogleSignOut,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleCreateNew = async () => {
    try {
      setIsCreating(true);
      setErrorMsg('');
      const res = await createGoogleSpreadsheet();
      onSpreadsheetConfigured(res.id, res.url);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error al crear la hoja de cálculo en Google Drive');
    } finally {
      setIsCreating(false);
    }
  };

  const handleLinkManual = () => {
    if (!manualInput.trim()) return;
    setErrorMsg('');

    let sheetId = manualInput.trim();
    // Check if user pasted full URL
    const match = sheetId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (match && match[1]) {
      sheetId = match[1];
    }

    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;
    localStorage.setItem('16pf_active_spreadsheet_id', sheetId);
    localStorage.setItem('16pf_active_spreadsheet_url', url);
    onSpreadsheetConfigured(sheetId, url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-blue-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-blue-700">
              <FileSpreadsheet className="w-5 h-5 text-white" />
            </span>
            <div>
              <h3 className="font-bold text-base">Conexión con Google Sheets</h3>
              <p className="text-xs text-blue-200">
                Almacenamiento en tiempo real de aspirantes y respuestas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-blue-200 hover:text-white p-1 rounded-lg hover:bg-blue-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs text-slate-700">
          {/* Account status */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  googleUser ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              ></div>
              <div>
                <span className="font-bold text-slate-900 block">
                  {googleUser ? 'Cuenta de Google Conectada' : 'No has iniciado sesión'}
                </span>
                <span className="text-slate-500 text-[11px]">
                  {googleUser
                    ? googleUser.email
                    : 'Inicia sesión para crear y sincronizar hojas de cálculo directamente.'}
                </span>
              </div>
            </div>

            <div>
              {googleUser ? (
                <button
                  onClick={onGoogleSignOut}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-rose-50 hover:text-rose-600 font-semibold text-slate-700 transition cursor-pointer"
                >
                  Cerrar Sesión
                </button>
              ) : (
                <button
                  onClick={onGoogleSignIn}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Conectar Cuenta</span>
                </button>
              )}
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Active Spreadsheet Status */}
          {activeSpreadsheetId ? (
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Hoja de Cálculo Activa:</span>
                </span>
                {spreadsheetUrl && (
                  <a
                    href={spreadsheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:text-emerald-900 font-bold underline inline-flex items-center gap-1"
                  >
                    <span>Abrir en Google Sheets</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              <div className="text-[11px] text-slate-600 font-mono bg-white p-2 rounded border border-emerald-200 truncate">
                ID: {activeSpreadsheetId}
              </div>
            </div>
          ) : (
            <div className="text-slate-500 text-center py-2">
              Aún no tienes una hoja de cálculo vinculada. Puedes crear una nueva en tu Drive o enlazar una existente.
            </div>
          )}

          {/* Create new sheet option */}
          <div className="space-y-4 pt-2 border-t border-slate-200">
            <div>
              <h4 className="font-bold text-slate-900 mb-1">
                Opción 1: Crear Nueva Hoja en mi Google Drive (Automático)
              </h4>
              <p className="text-slate-500 text-[11px] mb-3">
                Crea una hoja titulada <strong>"16PF - Admisión Enseñanza de Lenguas Extranjeras"</strong> con encabezados y columnas ya preconfigurados.
              </p>
              <button
                onClick={handleCreateNew}
                disabled={isCreating || !googleUser}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold transition shadow cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{isCreating ? 'Creando Hoja...' : 'Crear Nueva Hoja en Google Drive'}</span>
              </button>
            </div>

            {/* Link existing */}
            <div className="pt-3 border-t border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1">
                Opción 2: Vincular Hoja de Google Sheets Existente
              </h4>
              <p className="text-slate-500 text-[11px] mb-2">
                Pega el enlace o el ID de una hoja de cálculo compartida en la que tengas permisos de edición.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMd..."
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-xs"
                />
                <button
                  onClick={handleLinkManual}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold transition cursor-pointer"
                >
                  Vincular
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold transition cursor-pointer text-xs"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
