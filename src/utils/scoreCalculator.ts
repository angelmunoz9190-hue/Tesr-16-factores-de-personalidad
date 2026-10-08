import { QUESTIONS_16PF } from '../data/questions16pf';
import { FactorCode, rawToEsten, calculateSecondaryFactors, calculateTeachingCompetencies, calculateTeachingSuitability } from '../data/scalesData';
import { EvaluationRecord } from '../services/googleSheets';

export function calculate16PFScores(
  answers: Record<number, 'a' | 'b' | 'c'>,
  candidateData: {
    name: string;
    gender: 'M' | 'F';
    age: number;
    folio: string;
    emphasis: string;
  }
): EvaluationRecord {
  const rawScores: Record<FactorCode, number> = {
    A: 0,
    B: 0,
    C: 0,
    E: 0,
    F: 0,
    G: 0,
    H: 0,
    I: 0,
    L: 0,
    M: 0,
    N: 0,
    O: 0,
    Q1: 0,
    Q2: 0,
    Q3: 0,
    Q4: 0,
  };

  // Tally raw scores
  QUESTIONS_16PF.forEach((q) => {
    const ans = answers[q.id];
    if (ans && q.factor !== 'VAL') {
      const pts = q.scores[ans] || 0;
      rawScores[q.factor] += pts;
    }
  });

  // Calculate estens using official conversion table based on gender
  const estens: Record<FactorCode, number> = {
    A: rawToEsten('A', rawScores.A, candidateData.gender),
    B: rawToEsten('B', rawScores.B, candidateData.gender),
    C: rawToEsten('C', rawScores.C, candidateData.gender),
    E: rawToEsten('E', rawScores.E, candidateData.gender),
    F: rawToEsten('F', rawScores.F, candidateData.gender),
    G: rawToEsten('G', rawScores.G, candidateData.gender),
    H: rawToEsten('H', rawScores.H, candidateData.gender),
    I: rawToEsten('I', rawScores.I, candidateData.gender),
    L: rawToEsten('L', rawScores.L, candidateData.gender),
    M: rawToEsten('M', rawScores.M, candidateData.gender),
    N: rawToEsten('N', rawScores.N, candidateData.gender),
    O: rawToEsten('O', rawScores.O, candidateData.gender),
    Q1: rawToEsten('Q1', rawScores.Q1, candidateData.gender),
    Q2: rawToEsten('Q2', rawScores.Q2, candidateData.gender),
    Q3: rawToEsten('Q3', rawScores.Q3, candidateData.gender),
    Q4: rawToEsten('Q4', rawScores.Q4, candidateData.gender),
  };

  // Secondary Factors
  const secondaries = calculateSecondaryFactors(estens);
  const secondaryMap = {
    QI: secondaries.find((s) => s.id === 'QI')?.sten || 5,
    QII: secondaries.find((s) => s.id === 'QII')?.sten || 5,
    QIII: secondaries.find((s) => s.id === 'QIII')?.sten || 5,
    QIV: secondaries.find((s) => s.id === 'QIV')?.sten || 5,
    QV: secondaries.find((s) => s.id === 'QV')?.sten || 5,
  };

  // Competencies
  const competencies = calculateTeachingCompetencies(estens);
  const compMap = {
    comunicacion: competencies[0]?.score || 70,
    estabilidad: competencies[1]?.score || 70,
    innovacion: competencies[2]?.score || 70,
    rigor: competencies[3]?.score || 70,
    liderazgo: competencies[4]?.score || 70,
  };

  // Suitability Report
  const suitability = calculateTeachingSuitability(estens, candidateData.name);

  return {
    id: `16PF-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    timestamp: new Date().toISOString(),
    folio: candidateData.folio || `LELE-${Math.floor(1000 + Math.random() * 9000)}`,
    name: candidateData.name.trim() || 'Aspirante Evaluado',
    gender: candidateData.gender,
    age: candidateData.age || 20,
    emphasis: candidateData.emphasis || 'Español e Inglés',
    rawScores,
    estens,
    secondaryFactors: secondaryMap,
    competencies: compMap,
    suitabilityScore: suitability.overallPercentage,
    suitabilityVerdict: suitability.verdict,
    answers,
  };
}

// Generate realistic mock sample data for testing with 1 click
export function generateSampleAnswers(profileType: 'ideal' | 'equilibrado' | 'reservado' = 'ideal'): Record<number, 'a' | 'b' | 'c'> {
  const ans: Record<number, 'a' | 'b' | 'c'> = {};

  QUESTIONS_16PF.forEach((q) => {
    if (q.factor === 'VAL') {
      ans[q.id] = 'a';
      return;
    }

    if (q.factor === 'B') {
      // Find answer giving 1 point
      if (q.scores.a === 1) ans[q.id] = profileType === 'reservado' && Math.random() > 0.4 ? 'b' : 'a';
      else if (q.scores.b === 1) ans[q.id] = profileType === 'reservado' && Math.random() > 0.4 ? 'a' : 'b';
      else ans[q.id] = profileType === 'reservado' && Math.random() > 0.4 ? 'a' : 'c';
      return;
    }

    // For other factors, choose options to simulate a solid language teaching applicant
    if (profileType === 'ideal') {
      if (['A', 'H', 'F', 'C', 'G', 'Q1', 'Q3'].includes(q.factor)) {
        // High scores preferred
        if (q.scores.a === 2) ans[q.id] = Math.random() > 0.15 ? 'a' : 'b';
        else if (q.scores.c === 2) ans[q.id] = Math.random() > 0.15 ? 'c' : 'b';
        else ans[q.id] = 'b';
      } else if (['L', 'O', 'Q4'].includes(q.factor)) {
        // Low scores preferred
        if (q.scores.a === 0) ans[q.id] = Math.random() > 0.2 ? 'a' : 'b';
        else if (q.scores.c === 0) ans[q.id] = Math.random() > 0.2 ? 'c' : 'b';
        else ans[q.id] = 'b';
      } else {
        // Balanced
        const roll = Math.random();
        ans[q.id] = roll < 0.35 ? 'a' : roll < 0.7 ? 'b' : 'c';
      }
    } else {
      const roll = Math.random();
      ans[q.id] = roll < 0.4 ? 'a' : roll < 0.75 ? 'b' : 'c';
    }
  });

  return ans;
}
