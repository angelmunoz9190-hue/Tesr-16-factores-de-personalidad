import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Navbar } from './components/Navbar';
import { CandidateTest } from './components/CandidateTest';
import { FastCaptureSheet } from './components/FastCaptureSheet';
import { GraphicReport } from './components/GraphicReport';
import { EvaluationsHistory } from './components/EvaluationsHistory';
import { GoogleSheetsModal } from './components/GoogleSheetsModal';
import {
  initAuth,
  googleSignIn,
  googleLogout,
  getAccessToken,
} from './services/googleAuth';
import {
  EvaluationRecord,
  appendRowToSpreadsheet,
  createGoogleSpreadsheet,
  recordToRowValues,
  exportToCSV,
} from './services/googleSheets';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'test' | 'capture' | 'report' | 'history'>('test');
  const [activeRecord, setActiveRecord] = useState<EvaluationRecord | null>(null);
  const [records, setRecords] = useState<EvaluationRecord[]>([]);

  // Google Sheets state
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [activeSpreadsheetId, setActiveSpreadsheetId] = useState<string | null>(null);
  const [spreadsheetUrl, setSpreadsheetUrl] = useState<string | null>(null);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [isSavingToSheets, setIsSavingToSheets] = useState(false);
  const [sheetsSavedSuccess, setSheetsSavedSuccess] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Initialize auth & local storage
  useEffect(() => {
    // 1. Init Firebase Auth listener
    const unsubscribe = initAuth(
      (user) => {
        setGoogleUser(user);
      },
      () => {
        setGoogleUser(null);
      }
    );

    // 2. Load stored active sheet
    const storedSheetId = localStorage.getItem('16pf_active_spreadsheet_id');
    const storedSheetUrl = localStorage.getItem('16pf_active_spreadsheet_url');
    if (storedSheetId) setActiveSpreadsheetId(storedSheetId);
    if (storedSheetUrl) setSpreadsheetUrl(storedSheetUrl);

    // 3. Load saved evaluations history
    const storedHistory = localStorage.getItem('16pf_evaluations_history');
    if (storedHistory) {
      try {
        const parsed = JSON.parse(storedHistory);
        if (Array.isArray(parsed)) {
          setRecords(parsed);
          if (parsed.length > 0) {
            setActiveRecord(parsed[0]);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Save new record to history
  const handleRecordGenerated = (newRecord: EvaluationRecord) => {
    setActiveRecord(newRecord);
    setSheetsSavedSuccess(false);

    // Update history
    setRecords((prev) => {
      const updated = [newRecord, ...prev.filter((r) => r.id !== newRecord.id)];
      localStorage.setItem('16pf_evaluations_history', JSON.stringify(updated));
      return updated;
    });

    // Switch to graphic report
    setCurrentTab('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Evaluación de ${newRecord.name} calculada con éxito.`);
  };

  // Google sign in / out
  const handleGoogleSignIn = async () => {
    try {
      const res = await googleSignIn();
      if (res) {
        setGoogleUser(res.user);
        showToast(`Sesión iniciada con ${res.user.email}`);

        // If no sheet is active, auto-create one
        if (!activeSpreadsheetId) {
          try {
            const newSheet = await createGoogleSpreadsheet();
            setActiveSpreadsheetId(newSheet.id);
            setSpreadsheetUrl(newSheet.url);
            showToast('Hoja de cálculo creada automáticamente en Google Drive');
          } catch (e) {
            console.error(e);
          }
        }
      }
    } catch (err: any) {
      console.error(err);
      alert('No se pudo iniciar sesión con Google: ' + (err.message || 'Error de autenticación'));
    }
  };

  const handleGoogleSignOut = async () => {
    await googleLogout();
    setGoogleUser(null);
    showToast('Sesión de Google cerrada.');
  };

  // Save candidate evaluation to Google Sheets
  const handleSaveToGoogleSheets = async (rec: EvaluationRecord) => {
    try {
      setIsSavingToSheets(true);

      // Check Google auth
      if (!googleUser) {
        const proceed = window.confirm(
          'Para guardar en Google Sheets necesitas iniciar sesión con tu cuenta de Google. ¿Deseas iniciar sesión ahora?'
        );
        if (proceed) {
          await handleGoogleSignIn();
        } else {
          setIsSavingToSheets(false);
          return;
        }
      }

      // Check or create spreadsheet
      let targetSheetId = activeSpreadsheetId;
      if (!targetSheetId) {
        const newSheet = await createGoogleSpreadsheet();
        targetSheetId = newSheet.id;
        setActiveSpreadsheetId(newSheet.id);
        setSpreadsheetUrl(newSheet.url);
      }

      // Append row
      const rowValues = recordToRowValues(rec);
      await appendRowToSpreadsheet(targetSheetId, rowValues);

      setSheetsSavedSuccess(true);
      showToast(`¡Resultados de ${rec.name} guardados en Google Sheets!`);
    } catch (err: any) {
      console.error(err);
      alert('Error al guardar en Google Sheets: ' + (err.message || 'Error desconocido'));
    } finally {
      setIsSavingToSheets(false);
    }
  };

  const handleDeleteRecord = (id: string) => {
    setRecords((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      localStorage.setItem('16pf_evaluations_history', JSON.stringify(updated));
      return updated;
    });
    if (activeRecord?.id === id) {
      setActiveRecord(null);
      setCurrentTab('history');
    }
    showToast('Evaluación eliminada del historial.');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        hasActiveReport={!!activeRecord}
        googleUser={googleUser}
        spreadsheetUrl={spreadsheetUrl}
        onOpenGoogleModal={() => setIsGoogleModalOpen(true)}
        onGoogleSignIn={handleGoogleSignIn}
        onGoogleSignOut={handleGoogleSignOut}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl border border-blue-500/40 flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {currentTab === 'test' && (
          <CandidateTest onComplete={handleRecordGenerated} />
        )}

        {currentTab === 'capture' && (
          <FastCaptureSheet onGenerateReport={handleRecordGenerated} />
        )}

        {currentTab === 'report' && (
          activeRecord ? (
            <GraphicReport
              record={activeRecord}
              onSaveToGoogleSheets={handleSaveToGoogleSheets}
              isSavingToSheets={isSavingToSheets}
              sheetsSavedSuccess={sheetsSavedSuccess}
              spreadsheetUrl={spreadsheetUrl}
              onNewEvaluation={() => setCurrentTab('test')}
              onExportCSV={() => exportToCSV([activeRecord], `16PF_${activeRecord.folio}.csv`)}
            />
          ) : (
            <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 mx-auto flex items-center justify-center font-bold text-xl">
                16PF
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Aún no hay ningún reporte activo para mostrar
              </h3>
              <p className="text-sm text-slate-600">
                Selecciona una opción para comenzar la evaluación de un aspirante a la Licenciatura en Enseñanza de Lenguas Extranjeras:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setCurrentTab('test')}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow cursor-pointer"
                >
                  Aplicar Test Online (187 reactivos)
                </button>
                <button
                  onClick={() => setCurrentTab('capture')}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow cursor-pointer"
                >
                  Hoja de Captura Rápida (Excel)
                </button>
              </div>
            </div>
          )
        )}

        {currentTab === 'history' && (
          <EvaluationsHistory
            records={records}
            onSelectRecord={(rec) => {
              setActiveRecord(rec);
              setCurrentTab('report');
            }}
            onDeleteRecord={handleDeleteRecord}
            onSyncRecordToSheets={handleSaveToGoogleSheets}
            isSyncing={isSavingToSheets}
            spreadsheetUrl={spreadsheetUrl}
          />
        )}
      </main>

      {/* Google Sheets Modal */}
      <GoogleSheetsModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        googleUser={googleUser}
        activeSpreadsheetId={activeSpreadsheetId}
        spreadsheetUrl={spreadsheetUrl}
        onSpreadsheetConfigured={(id, url) => {
          setActiveSpreadsheetId(id);
          setSpreadsheetUrl(url);
          showToast('Hoja de Google Sheets configurada.');
          setIsGoogleModalOpen(false);
        }}
        onGoogleSignIn={handleGoogleSignIn}
        onGoogleSignOut={handleGoogleSignOut}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <p className="text-slate-200 font-semibold">
              Licenciatura en Enseñanza de Lenguas Extranjeras (Español e Inglés)
            </p>
            <p className="text-slate-500 text-[11px]">
              Sistema de Baremación e Informe Psicométrico 16PF Forma A • Baremos Adultos Hombres y Mujeres
            </p>
          </div>
          <div className="text-[11px] text-slate-500">
            Respaldo automático local & Sincronización con Google Sheets
          </div>
        </div>
      </footer>
    </div>
  );
}
