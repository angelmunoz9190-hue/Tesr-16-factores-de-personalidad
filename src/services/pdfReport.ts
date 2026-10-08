import jsPDF from 'jspdf';
import { EvaluationRecord } from './googleSheets';
import { FACTORS_METADATA, FactorCode, calculateTeachingCompetencies, calculateTeachingSuitability, calculateSecondaryFactors } from '../data/scalesData';

export async function generate16PFPdf(record: EvaluationRecord) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Colors
  const cobalt = [0, 71, 171]; // #0047AB Cobalt Blue
  const darkNavy = [15, 23, 42]; // #0F172A
  const slateText = [71, 85, 105]; // #475569
  const lightBg = [241, 245, 249]; // #F1F5F9
  const borderLight = [226, 232, 240];

  // Helper for text
  const suitability = calculateTeachingSuitability(record.estens, record.name);
  const secondaries = calculateSecondaryFactors(record.estens);
  const competencies = calculateTeachingCompetencies(record.estens);

  // --- PAGE 1: PERFIL GRÁFICO 16PF Y DATOS GENERALES ---
  // Top Banner
  doc.setFillColor(cobalt[0], cobalt[1], cobalt[2]);
  doc.rect(0, 0, pageWidth, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('LICENCIATURA EN ENSEÑANZA DE LENGUAS EXTRANJERAS (ESPAÑOL E INGLÉS)', margin, 9);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text('PROCESO DE ADMISIÓN • EVALUACIÓN PSICOMÉTRICA OFICIAL (CUESTIONARIO 16PF)', margin, 16);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(`FOLIO: ${record.folio}`, pageWidth - margin, 16, { align: 'right' });

  // Candidate Data Card
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
  doc.roundedRect(margin, 28, contentWidth, 22, 2, 2, 'FD');

  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('Aspirante:', margin + 4, 34);
  doc.setFont('helvetica', 'normal');
  doc.text(record.name, margin + 22, 34);

  doc.setFont('helvetica', 'bold');
  doc.text('Sexo:', margin + 4, 40);
  doc.setFont('helvetica', 'normal');
  doc.text(record.gender === 'M' ? 'Hombre' : 'Mujer', margin + 22, 40);

  doc.setFont('helvetica', 'bold');
  doc.text('Edad:', margin + 50, 40);
  doc.setFont('helvetica', 'normal');
  doc.text(`${record.age} años`, margin + 61, 40);

  doc.setFont('helvetica', 'bold');
  doc.text('Énfasis:', margin + 85, 40);
  doc.setFont('helvetica', 'normal');
  doc.text(record.emphasis || 'Español e Inglés', margin + 100, 40);

  doc.setFont('helvetica', 'bold');
  doc.text('Fecha:', margin + 135, 40);
  doc.setFont('helvetica', 'normal');
  doc.text(new Date(record.timestamp).toLocaleDateString('es-MX'), margin + 147, 40);

  // Suitability Summary Pill
  doc.setFont('helvetica', 'bold');
  doc.text('Dictamen Vocacional:', margin + 4, 46);
  doc.setTextColor(cobalt[0], cobalt[1], cobalt[2]);
  doc.text(`${suitability.verdict.toUpperCase()} (${suitability.overallPercentage}%)`, margin + 40, 46);

  // Section Header: PERFIL 16PF
  let yPos = 55;
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('PERFIL GRÁFICO DE FACTORES DE PERSONALIDAD (16PF - FORMA A)', margin, yPos);

  yPos += 4;
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  doc.text('Franja sombreada (Estenes 4 a 7): Rango Promedio Poblacional. Desviaciones a polos 1-3 y 8-10 definen rasgos distintivos.', margin, yPos);

  // Graphical 16PF Chart Table
  yPos += 4;
  const factorOrder: FactorCode[] = ['A', 'B', 'C', 'E', 'F', 'G', 'H', 'I', 'L', 'M', 'N', 'O', 'Q1', 'Q2', 'Q3', 'Q4'];
  const chartX = margin;
  const factorColWidth = 10;
  const leftDescWidth = 42;
  const stenColWidth = 6.8;
  const stenAreaWidth = stenColWidth * 10; // 68 mm
  const rightDescWidth = 48;
  const rowHeight = 7.4;

  // Header row
  doc.setFillColor(cobalt[0], cobalt[1], cobalt[2]);
  doc.rect(chartX, yPos, contentWidth, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('F', chartX + 5, yPos + 4.8, { align: 'center' });
  doc.text('Baja Puntuación (Polos 1-3)', chartX + 12, yPos + 4.8);
  for (let s = 1; s <= 10; s++) {
    doc.text(String(s), chartX + factorColWidth + leftDescWidth + (s - 0.5) * stenColWidth, yPos + 4.8, { align: 'center' });
  }
  doc.text('Alta Puntuación (Polos 8-10)', chartX + factorColWidth + leftDescWidth + stenAreaWidth + 3, yPos + 4.8);

  yPos += 7;

  // Draw chart rows and points
  const points: { x: number; y: number }[] = [];

  factorOrder.forEach((fCode, idx) => {
    const isEven = idx % 2 === 0;
    const currentY = yPos + idx * rowHeight;
    const meta = FACTORS_METADATA[fCode];
    const sten = record.estens[fCode] || 5;
    const pb = record.rawScores[fCode] || 0;

    // Row background
    doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
    doc.rect(chartX, currentY, contentWidth, rowHeight, 'F');

    // Grid lines & Average band (stens 4 to 7)
    const bandStartX = chartX + factorColWidth + leftDescWidth + 3 * stenColWidth;
    doc.setFillColor(224, 238, 255); // soft cobalt tint
    doc.rect(bandStartX, currentY, 4 * stenColWidth, rowHeight, 'F');

    // Outer and vertical borders
    doc.setDrawColor(220, 226, 235);
    doc.rect(chartX, currentY, contentWidth, rowHeight, 'S');

    // Factor Code
    doc.setTextColor(cobalt[0], cobalt[1], cobalt[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text(fCode, chartX + 5, currentY + 4.8, { align: 'center' });

    // Left label
    doc.setTextColor(51, 65, 85);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    const shortLeft = meta.lowScoreLabel.length > 32 ? meta.lowScoreLabel.slice(0, 30) + '...' : meta.lowScoreLabel;
    doc.text(shortLeft, chartX + 11, currentY + 4.8);

    // Sten grid vertical lines
    doc.setDrawColor(230, 235, 245);
    for (let s = 1; s <= 10; s++) {
      const colX = chartX + factorColWidth + leftDescWidth + (s - 1) * stenColWidth;
      doc.line(colX, currentY, colX, currentY + rowHeight);
    }
    const endGridX = chartX + factorColWidth + leftDescWidth + stenAreaWidth;
    doc.line(endGridX, currentY, endGridX, currentY + rowHeight);

    // Right label
    const shortRight = meta.highScoreLabel.length > 34 ? meta.highScoreLabel.slice(0, 32) + '...' : meta.highScoreLabel;
    doc.text(shortRight, endGridX + 2, currentY + 4.8);

    // Calculate Point Coordinate
    const pointX = chartX + factorColWidth + leftDescWidth + (sten - 0.5) * stenColWidth;
    const pointY = currentY + rowHeight / 2;
    points.push({ x: pointX, y: pointY });
  });

  // Draw connecting curve/polyline for 16PF profile
  doc.setDrawColor(cobalt[0], cobalt[1], cobalt[2]);
  doc.setLineWidth(0.6);
  for (let i = 0; i < points.length - 1; i++) {
    doc.line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
  }

  // Draw circles with sten values on top of line
  points.forEach((p, idx) => {
    const fCode = factorOrder[idx];
    const sten = record.estens[fCode] || 5;

    doc.setFillColor(255, 255, 255);
    doc.circle(p.x, p.y, 2.2, 'FD');
    doc.setFillColor(cobalt[0], cobalt[1], cobalt[2]);
    doc.circle(p.x, p.y, 1.8, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(4.5);
    doc.text(String(sten), p.x, p.y + 1.2, { align: 'center' });
  });

  // Table of Raw Scores and Sten Below Chart
  yPos += factorOrder.length * rowHeight + 5;
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('PUNTUACIONES BRUTAS (PB) Y ESTENES:', margin, yPos);

  yPos += 3;
  const colW = contentWidth / 8;
  doc.setFontSize(6.5);
  doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
  doc.setFillColor(248, 250, 252);
  doc.rect(margin, yPos, contentWidth, 14, 'FD');

  // Row 1: A through I
  for (let i = 0; i < 8; i++) {
    const f = factorOrder[i];
    const x = margin + i * colW;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(cobalt[0], cobalt[1], cobalt[2]);
    doc.text(`${f}:`, x + 3, yPos + 4);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text(`PB ${record.rawScores[f]} | E ${record.estens[f]}`, x + 9, yPos + 4);
  }

  // Row 2: L through Q4
  for (let i = 8; i < 16; i++) {
    const f = factorOrder[i];
    const x = margin + (i - 8) * colW;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(cobalt[0], cobalt[1], cobalt[2]);
    doc.text(`${f}:`, x + 3, yPos + 10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text(`PB ${record.rawScores[f]} | E ${record.estens[f]}`, x + 11, yPos + 10);
  }

  // Footer Page 1
  doc.setFontSize(6.5);
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  doc.text('Página 1 de 2 • Sistema de Admisión Licenciatura en Enseñanza de Lenguas Extranjeras', margin, pageHeight - 6);
  doc.text(`Generado: ${new Date().toLocaleString('es-MX')}`, pageWidth - margin, pageHeight - 6, { align: 'right' });

  // --- PAGE 2: COMPETENCIAS DOCENTES, FACTORES SECUNDARIOS Y DICTAMEN ---
  doc.addPage();

  // Top Banner Page 2
  doc.setFillColor(cobalt[0], cobalt[1], cobalt[2]);
  doc.rect(0, 0, pageWidth, 16, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('EVALUACIÓN DE COMPETENCIAS DOCENTES Y FACTORES GLOBALES', margin, 10);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`ASPIRANTE: ${record.name} • FOLIO: ${record.folio}`, pageWidth - margin, 10, { align: 'right' });

  yPos = 24;

  // 1. Competencias Docentes para la Enseñanza de Idiomas
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('1. COMPETENCIAS CLAVE PARA LA ENSEÑANZA DE LENGUAS EXTRANJERAS (ESPAÑOL E INGLÉS)', margin, yPos);

  yPos += 5;
  competencies.forEach((c) => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
    doc.roundedRect(margin, yPos, contentWidth, 14, 1.5, 1.5, 'FD');

    // Title and score badge
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(cobalt[0], cobalt[1], cobalt[2]);
    doc.text(c.name, margin + 4, yPos + 4.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text(`${c.score}% - ${c.level.toUpperCase()}`, margin + contentWidth - 36, yPos + 4.5);

    // Progress mini bar
    const barW = 30;
    doc.setFillColor(226, 232, 240);
    doc.rect(margin + contentWidth - 36, yPos + 6, barW, 2.2, 'F');
    doc.setFillColor(cobalt[0], cobalt[1], cobalt[2]);
    doc.rect(margin + contentWidth - 36, yPos + 6, (barW * c.score) / 100, 2.2, 'F');

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(slateText[0], slateText[1], slateText[2]);
    doc.text(c.description, margin + 4, yPos + 9, { maxWidth: contentWidth - 42 });

    doc.setFont('helvetica', 'italic');
    doc.text(`Factores: ${c.factorsInvolved}`, margin + 4, yPos + 12.5);

    yPos += 16;
  });

  // 2. Factores de Segundo Orden (Cattell)
  yPos += 2;
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('2. FACTORES GLOBALES / DE SEGUNDO ORDEN (CATTELL)', margin, yPos);

  yPos += 4;
  const secW = (contentWidth - 8) / 5;
  secondaries.forEach((s, idx) => {
    const x = margin + idx * (secW + 2);
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
    doc.roundedRect(x, yPos, secW, 22, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(cobalt[0], cobalt[1], cobalt[2]);
    doc.text(s.id, x + secW / 2, yPos + 4.5, { align: 'center' });

    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.setFontSize(6.2);
    doc.text(s.name.split(' ')[0], x + secW / 2, yPos + 8.5, { align: 'center' });

    // Sten Circle
    doc.setFillColor(cobalt[0], cobalt[1], cobalt[2]);
    doc.circle(x + secW / 2, yPos + 13.5, 3.2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text(String(s.sten), x + secW / 2, yPos + 15, { align: 'center' });

    doc.setTextColor(slateText[0], slateText[1], slateText[2]);
    doc.setFontSize(5.5);
    doc.text(s.level, x + secW / 2, yPos + 19.5, { align: 'center' });
  });

  // 3. Resumen y Preguntas Sugeridas para Entrevista
  yPos += 27;
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('3. DICTAMEN DE ADMISIÓN Y SUGERENCIAS PARA ENTREVISTA VOCACIONAL', margin, yPos);

  yPos += 4;
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
  doc.roundedRect(margin, yPos, contentWidth, 34, 2, 2, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  const splitSummary = doc.splitTextToSize(suitability.summary, contentWidth - 8);
  doc.text(splitSummary, margin + 4, yPos + 5);

  const qStartY = yPos + 14;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(cobalt[0], cobalt[1], cobalt[2]);
  doc.text('Preguntas recomendadas para la entrevista con el comité:', margin + 4, qStartY);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  suitability.interviewQuestions.slice(0, 2).forEach((q, i) => {
    doc.text(`• ${q}`, margin + 6, qStartY + 4.5 + i * 4.2, { maxWidth: contentWidth - 12 });
  });

  // 4. Firmas de Validación
  yPos += 40;
  const sigW = 60;
  const sigY = yPos + 18;

  doc.setDrawColor(150, 150, 150);
  doc.line(margin + 10, sigY, margin + 10 + sigW, sigY);
  doc.line(pageWidth - margin - 10 - sigW, sigY, pageWidth - margin - 10, sigY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('PSICÓLOGO(A) EVALUADOR(A)', margin + 10 + sigW / 2, sigY + 4, { align: 'center' });
  doc.text('COORDINACIÓN DE ADMISIÓN / LENGUAS', pageWidth - margin - 10 - sigW / 2, sigY + 4, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  doc.text('Firma y Cédula Profesional', margin + 10 + sigW / 2, sigY + 7.5, { align: 'center' });
  doc.text('Licenciatura en Enseñanza de Lenguas Extranjeras', pageWidth - margin - 10 - sigW / 2, sigY + 7.5, { align: 'center' });

  // Footer Page 2
  doc.setFontSize(6.5);
  doc.text('Página 2 de 2 • Documento Confidencial de Uso Exclusivo del Comité de Selección', margin, pageHeight - 6);
  doc.text(`ID Registro: ${record.id}`, pageWidth - margin, pageHeight - 6, { align: 'right' });

  // Download PDF
  const cleanName = (record.name || 'Aspirante').replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`16PF_Reporte_${cleanName}_${record.folio}.pdf`);
}
