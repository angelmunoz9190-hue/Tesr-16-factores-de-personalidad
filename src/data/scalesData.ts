export type FactorCode =
  | 'A'
  | 'B'
  | 'C'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'Q1'
  | 'Q2'
  | 'Q3'
  | 'Q4';

export interface FactorDefinition {
  code: FactorCode;
  name: string;
  technicalName: string;
  lowScoreLabel: string;
  highScoreLabel: string;
  lowDescription: string;
  averageDescription: string;
  highDescription: string;
  teachingRelevance: string; // Contextualized for Foreign Language Teaching (Spanish / English)
  optimalTeachingRange: [number, number]; // Target sten range for language teachers
}

export const FACTORS_METADATA: Record<FactorCode, FactorDefinition> = {
  A: {
    code: 'A',
    name: 'Afectotimia / Expresividad',
    technicalName: 'Sizotimia vs. Afectotimia',
    lowScoreLabel: 'Reservado, crítico, distante (Sizotimia)',
    highScoreLabel: 'Expresivo, afectuoso, participativo (Afectotimia)',
    lowDescription: 'Tiende a ser frío, distante, escéptico y rígido en sus relaciones interpersonales. Prefiere trabajar solo.',
    averageDescription: 'Equilibrio adecuado entre cercanía afectiva y distancia prudente en las interacciones.',
    highDescription: 'Abierto, afectuoso, comunicativo y complaciente. Facilidad para conectar con las personas y trabajar en equipo.',
    teachingRelevance: 'Crucial para la docencia de lenguas: permite establecer empatía, generar confianza lingüística en los alumnos y fomentar la participación oral sin temor al error.',
    optimalTeachingRange: [6, 9],
  },
  B: {
    code: 'B',
    name: 'Razonamiento / Inteligencia',
    technicalName: 'Baja vs. Alta Capacidad Mental Escolar',
    lowScoreLabel: 'Pensamiento concreto (Baja capacidad mental escolar)',
    highScoreLabel: 'Pensamiento abstracto, brillante (Alta capacidad mental escolar)',
    lowDescription: 'Le cuesta captar conceptos abstractos con rapidez, pensamiento más literal y concreto.',
    averageDescription: 'Capacidad de aprendizaje y razonamiento lógico acorde con la media poblacional.',
    highDescription: 'Alta agilidad mental, comprensión ágil de relaciones abstractas y facilidad para el análisis conceptual.',
    teachingRelevance: 'Fundamental para comprender y explicar estructuras gramaticales complejas, sintaxis, fonética y adaptaciones curriculares en español e inglés.',
    optimalTeachingRange: [6, 10],
  },
  C: {
    code: 'C',
    name: 'Estabilidad Emocional',
    technicalName: 'Debilidad del Yo vs. Fuerza del Yo',
    lowScoreLabel: 'Reactivo, inestable, fácilmente perturbable (Debilidad del yo)',
    highScoreLabel: 'Emocionalmente estable, maduro, realista (Fuerza del yo)',
    lowDescription: 'Baja tolerancia a la frustración, reactividad emocional ante imprevistos, propenso a desanimarse.',
    averageDescription: 'Nivel normal de equilibrio emocional en situaciones cotidianas de estudio y trabajo.',
    highDescription: 'Madurez emocional, serenidad bajo presión, capacidad para enfrentar situaciones complejas con templanza.',
    teachingRelevance: 'Esencial para el control del aula, tolerancia ante la diversidad de ritmos de aprendizaje y manejo de dinámicas grupales sin desgastarse emocionalmente.',
    optimalTeachingRange: [6, 9],
  },
  E: {
    code: 'E',
    name: 'Dominancia / Asertividad',
    technicalName: 'Sumisión vs. Dominancia',
    lowScoreLabel: 'Sumiso, obediente, dócil (Sumisión)',
    highScoreLabel: 'Afirmativo, asertivo, competitivo (Dominancia)',
    lowDescription: 'Conformista, evita conflictos a toda costa, le cuesta imponer límites o asumir el liderazgo.',
    averageDescription: 'Sabe acatar directrices y a la vez expresar su postura cuando la situación lo amerita.',
    highDescription: 'Enérgico, seguro de sus ideas, asertivo al coordinar grupos y con iniciativa de liderazgo.',
    teachingRelevance: 'Permite liderar la clase, conducir debates en lengua extranjera y mantener la disciplina pedagógica con respeto mutuo.',
    optimalTeachingRange: [5, 8],
  },
  F: {
    code: 'F',
    name: 'Animación / Entusiasmo',
    technicalName: 'Desurgencia vs. Surgencia',
    lowScoreLabel: 'Sobrio, taciturno, serio (Desurgencia)',
    highScoreLabel: 'Entusiasta, vivaz, espontáneo (Surgencia)',
    lowDescription: 'Silencioso, cauteloso, reflexivo en exceso; puede proyectar monotonía o desgano.',
    averageDescription: 'Capacidad de dinamismo social combinada con la prudencia y seriedad necesarias.',
    highDescription: 'Jovial, alegre, comunicativo, enérgico; genera entusiasmo y contagia dinamismo al grupo.',
    teachingRelevance: 'Vital para dinamizar la clase de idiomas, realizar juegos de rol, actividades lúdicas comunicativas y mantener el interés del estudiante.',
    optimalTeachingRange: [5, 8],
  },
  G: {
    code: 'G',
    name: 'Atención a Normas / Escrupulosidad',
    technicalName: 'Superyó débil vs. Superyó fuerte',
    lowScoreLabel: 'Despreocupado, desacata reglas (Superyó débil)',
    highScoreLabel: 'Escrupuloso, persistente, disciplinado (Superyó fuerte)',
    lowDescription: 'Poco afecto a cumplir reglamentos o plazos formales, informal y poco perseverante.',
    averageDescription: 'Cumplimiento adecuado de obligaciones habituales y normas institucionales.',
    highDescription: 'Gran sentido del deber, meticuloso con la planeación, ético, puntual y tenaz.',
    teachingRelevance: 'Garantiza la entrega puntual de planeaciones didácticas, diseño riguroso de evaluaciones y cumplimiento del programa de estudios de idiomas.',
    optimalTeachingRange: [6, 9],
  },
  H: {
    code: 'H',
    name: 'Atrevimiento / Audacia Social',
    technicalName: 'Trectia vs. Parmia',
    lowScoreLabel: 'Tímido, cohibido, retraído (Trectia)',
    highScoreLabel: 'Audaz, desinhibido, sociable (Parmia)',
    lowDescription: 'Sensible al escrutinio social, vergüenza al hablar frente a audiencias o desconocidos.',
    averageDescription: 'Se desenvuelve con soltura moderada en entornos sociales y académicos comunes.',
    highDescription: 'Desinhibido, disfruta interactuar con grupos nuevos, no teme exponerse públicamente.',
    teachingRelevance: 'Fundamental para impartir clases en una segunda lengua sin vergüenza, modelar pronunciación y actuar como moderador bilingüe seguro.',
    optimalTeachingRange: [6, 9],
  },
  I: {
    code: 'I',
    name: 'Sensibilidad Emocional',
    technicalName: 'Harria vs. Premsia',
    lowScoreLabel: 'Calculador, realista, severo (Harria)',
    highScoreLabel: 'Sensitivo, afectuoso, empático (Premsia)',
    lowDescription: 'Pragmático, frío ante los problemas emocionales ajenos, autosuficiente y distante del arte o la lírica.',
    averageDescription: 'Sensibilidad equilibrada, receptivo sin caer en hipersensibilidad desmedida.',
    highDescription: 'Sensible, intuitivo, empático hacia las necesidades de los demás, receptivo a la literatura y cultura.',
    teachingRelevance: 'Clave para la apreciación intercultural y literaria en la enseñanza del inglés y español, así como para detectar dificultades anímicas en los alumnos.',
    optimalTeachingRange: [5, 8],
  },
  L: {
    code: 'L',
    name: 'Vigilancia / Suspicacia',
    technicalName: 'Alaxia vs. Protensión',
    lowScoreLabel: 'Confiado, adaptable, sin suspicacia (Alaxia)',
    highScoreLabel: 'Suspicaz, escéptico, desconfiado (Protensión)',
    lowDescription: 'Confiado en la buena fe de las personas, tolerante, no guarda rencor, adaptable.',
    averageDescription: 'Cautela natural sin caer en paranoia ni en exceso de ingenuidad.',
    highDescription: 'Desconfiado, suspicaz, interpreta dobles intenciones, suele aislarse por recelo.',
    teachingRelevance: 'Puntuaciones bajas a medias (3-6) facilitan un clima de aula cálido, cooperativo y seguro, donde los alumnos no se sientan juzgados o perseguidos.',
    optimalTeachingRange: [3, 6],
  },
  M: {
    code: 'M',
    name: 'Abstracción / Imaginación',
    technicalName: 'Praxernia vs. Autia',
    lowScoreLabel: 'Práctico, realista, convencional (Praxernia)',
    highScoreLabel: 'Imaginativo, creativo, bohemio (Autia)',
    lowDescription: 'Centrado en detalles inmediatos, práctico, convencional, poco interesado en teorías o arte.',
    averageDescription: 'Equilibrio entre sentido práctico y capacidad de proyectar ideas innovadoras.',
    highDescription: 'Orientado a ideas, creativo, soñador, generador de propuestas didácticas originales.',
    teachingRelevance: 'Facilita el diseño de material didáctico creativo, recursos visuales e historias para la inmersión lingüística.',
    optimalTeachingRange: [5, 8],
  },
  N: {
    code: 'N',
    name: 'Privacidad / Astucia Social',
    technicalName: 'Ingenuidad vs. Astucia',
    lowScoreLabel: 'Ingenuo, directo, espontáneo (Ingenuidad)',
    highScoreLabel: 'Astuto, diplomático, calculador (Astucia)',
    lowDescription: 'Franco, transparente, a veces sin filtro verbal, inocente en política interpersonal.',
    averageDescription: 'Capacidad de diplomacia sin perder la autenticidad en el trato.',
    highDescription: 'Refinado, sabe qué decir y cuándo callar, perspicaz en el manejo de relaciones sociales.',
    teachingRelevance: 'Ayuda a gestionar desacuerdos entre alumnos, comunicación asertiva con padres o coordinadores y diplomacia institucional.',
    optimalTeachingRange: [5, 8],
  },
  O: {
    code: 'O',
    name: 'Aprensión / Seguridad en sí mismo',
    technicalName: 'Adecuación serena vs. Culpabilidad',
    lowScoreLabel: 'Seguro de sí, sereno, imperturbable (Adecuación serena)',
    highScoreLabel: 'Aprensivo, inseguro, preocupado (Propensión a la culpabilidad)',
    lowDescription: 'Seguro de su valor personal, no se perturba por críticas, confía en su capacidad.',
    averageDescription: 'Nivel saludable de autocrítica sin paralizarse ante la retroalimentación.',
    highDescription: 'Tendencia al autodesprecio, temor al fracaso, culpa excesiva, rumiación mental.',
    teachingRelevance: 'Puntuaciones bajas a medias (2-5) brindan la seguridad y autoconfianza necesarias para pararse frente a un grupo y recibir observaciones de mejora constructivamente.',
    optimalTeachingRange: [2, 5],
  },
  Q1: {
    code: 'Q1',
    name: 'Apertura al Cambio / Radicalismo',
    technicalName: 'Conservadurismo vs. Radicalismo',
    lowScoreLabel: 'Tradicional, conservador, resistente al cambio (Conservadurismo)',
    highScoreLabel: 'Abierto, innovador, experimentador (Radicalismo)',
    lowDescription: 'Apego estricto a métodos antiguos, desconfía de innovaciones tecnológicas o didácticas.',
    averageDescription: 'Acepta innovaciones comprobadas manteniendo respeto por las bases existentes.',
    highDescription: 'Curioso, ávido de probar metodologías contemporáneas, tecnologías digitales y enfoques lingüísticos comunicativos modernos.',
    teachingRelevance: 'Indispensable en la era digital para adoptar TIC, apps de idiomas, IA educativa y metodologías activas (CLIL, Flipped Classroom).',
    optimalTeachingRange: [6, 9],
  },
  Q2: {
    code: 'Q2',
    name: 'Autosuficiencia / Trabajo Grupal',
    technicalName: 'Adhesión al grupo vs. Autosuficiencia',
    lowScoreLabel: 'Dependiente del grupo, gregario (Dependencia grupal)',
    highScoreLabel: 'Autosuficiente, autónomo, individualista (Autosuficiencia)',
    lowDescription: 'Necesita constante compañía y consenso de otros para actuar o tomar decisiones.',
    averageDescription: 'Sabe colaborar en academias docentes y a la vez trabajar de forma autónoma en la preparación de clases.',
    highDescription: 'Prefiere trabajar solo, resuelve problemas por su cuenta sin requerir constante apoyo externo.',
    teachingRelevance: 'El rango medio (4-7) es el ideal: autonomía para gestionar su aula combinada con espíritu colegiado para el trabajo departamental de lenguas.',
    optimalTeachingRange: [4, 7],
  },
  Q3: {
    code: 'Q3',
    name: 'Perfeccionismo / Control',
    technicalName: 'Indiferencia vs. Control de la autoimagen',
    lowScoreLabel: 'Despreocupado, impulsivo, bajo control (Indiferencia)',
    highScoreLabel: 'Controlado, autoexigente, disciplinado (Control)',
    lowDescription: 'Poca fuerza de voluntad, impulsivo, descuidado con la imagen personal y los compromisos.',
    averageDescription: 'Nivel adecuado de autodisciplina y autocontrol de impulsos.',
    highDescription: 'Fuerte autodisciplina, cuida su prestigio profesional, metódico y estructurado.',
    teachingRelevance: 'Fundamental para el seguimiento de rúbricas de evaluación lingüística (CEFR / MCER), puntualidad y modelado conductual frente a los estudiantes.',
    optimalTeachingRange: [6, 9],
  },
  Q4: {
    code: 'Q4',
    name: 'Tensión / Ansiedad Flotante',
    technicalName: 'Tranquilidad vs. Tensión energética',
    lowScoreLabel: 'Relajado, tranquilo, pausado (Tranquilidad)',
    highScoreLabel: 'Tenso, frustrado, sobreexcitado (Tensión)',
    lowDescription: 'Calmado, satisfecho con el estado actual, rara vez se altera o sufre insomnio.',
    averageDescription: 'Nivel óptimo de activación que permite responder a las demandas cotidianas.',
    highDescription: 'Sobrecargado de tensión nerviosa, impaciente, frustrado, dificultades para desconectarse.',
    teachingRelevance: 'Puntuaciones bajas a medias (2-5) aseguran que el docente mantenga la paciencia pedagógica, tono de voz relajado y capacidad de gestionar el cansancio vocacional.',
    optimalTeachingRange: [2, 5],
  },
};

// Official Conversion Tables (From Manual Moderno / Adecco Psychometrics PDF)
// Maps Raw Score ranges to Sten (1 to 10)
export interface StenRange {
  sten: number;
  min: number;
  max: number;
}

// Table I: Hombres (Male)
export const CONVERSION_TABLE_MALE: Record<FactorCode, StenRange[]> = {
  A: [
    { sten: 1, min: 0, max: 3 },
    { sten: 2, min: 4, max: 5 },
    { sten: 3, min: 6, max: 7 },
    { sten: 4, min: 8, max: 8 },
    { sten: 5, min: 9, max: 10 },
    { sten: 6, min: 11, max: 12 },
    { sten: 7, min: 13, max: 13 },
    { sten: 8, min: 14, max: 15 },
    { sten: 9, min: 16, max: 17 },
    { sten: 10, min: 18, max: 20 },
  ],
  B: [
    { sten: 1, min: 0, max: 1 },
    { sten: 2, min: 2, max: 2 },
    { sten: 3, min: 3, max: 4 },
    { sten: 4, min: 5, max: 5 },
    { sten: 5, min: 6, max: 6 },
    { sten: 6, min: 7, max: 7 },
    { sten: 7, min: 8, max: 8 },
    { sten: 8, min: 8, max: 8 },
    { sten: 9, min: 9, max: 9 },
    { sten: 10, min: 10, max: 13 },
  ],
  C: [
    { sten: 1, min: 0, max: 9 },
    { sten: 2, min: 10, max: 12 },
    { sten: 3, min: 13, max: 14 },
    { sten: 4, min: 15, max: 17 },
    { sten: 5, min: 18, max: 19 },
    { sten: 6, min: 20, max: 21 },
    { sten: 7, min: 22, max: 23 },
    { sten: 8, min: 24, max: 24 },
    { sten: 9, min: 25, max: 25 },
    { sten: 10, min: 26, max: 26 },
  ],
  E: [
    { sten: 1, min: 0, max: 5 },
    { sten: 2, min: 6, max: 6 },
    { sten: 3, min: 7, max: 7 },
    { sten: 4, min: 8, max: 9 },
    { sten: 5, min: 10, max: 11 },
    { sten: 6, min: 12, max: 13 },
    { sten: 7, min: 14, max: 15 },
    { sten: 8, min: 16, max: 18 },
    { sten: 9, min: 19, max: 20 },
    { sten: 10, min: 21, max: 26 },
  ],
  F: [
    { sten: 1, min: 0, max: 4 },
    { sten: 2, min: 5, max: 6 },
    { sten: 3, min: 7, max: 8 },
    { sten: 4, min: 9, max: 10 },
    { sten: 5, min: 11, max: 13 },
    { sten: 6, min: 14, max: 15 },
    { sten: 7, min: 16, max: 17 },
    { sten: 8, min: 18, max: 20 },
    { sten: 9, min: 21, max: 22 },
    { sten: 10, min: 23, max: 26 },
  ],
  G: [
    { sten: 1, min: 0, max: 8 },
    { sten: 2, min: 9, max: 9 },
    { sten: 3, min: 10, max: 11 },
    { sten: 4, min: 12, max: 12 },
    { sten: 5, min: 13, max: 14 },
    { sten: 6, min: 15, max: 16 },
    { sten: 7, min: 17, max: 17 },
    { sten: 8, min: 18, max: 18 },
    { sten: 9, min: 19, max: 19 },
    { sten: 10, min: 20, max: 20 },
  ],
  H: [
    { sten: 1, min: 0, max: 6 },
    { sten: 2, min: 7, max: 7 },
    { sten: 3, min: 8, max: 10 },
    { sten: 4, min: 11, max: 13 },
    { sten: 5, min: 14, max: 17 },
    { sten: 6, min: 18, max: 19 },
    { sten: 7, min: 20, max: 22 },
    { sten: 8, min: 23, max: 24 },
    { sten: 9, min: 25, max: 25 },
    { sten: 10, min: 26, max: 26 },
  ],
  I: [
    { sten: 1, min: 0, max: 1 },
    { sten: 2, min: 2, max: 3 },
    { sten: 3, min: 4, max: 4 },
    { sten: 4, min: 5, max: 5 },
    { sten: 5, min: 6, max: 7 },
    { sten: 6, min: 8, max: 9 },
    { sten: 7, min: 10, max: 10 },
    { sten: 8, min: 11, max: 12 },
    { sten: 9, min: 13, max: 13 },
    { sten: 10, min: 14, max: 20 },
  ],
  L: [
    { sten: 1, min: 0, max: 2 },
    { sten: 2, min: 3, max: 3 },
    { sten: 3, min: 4, max: 5 },
    { sten: 4, min: 6, max: 7 },
    { sten: 5, min: 8, max: 9 },
    { sten: 6, min: 10, max: 10 },
    { sten: 7, min: 11, max: 12 },
    { sten: 8, min: 13, max: 14 },
    { sten: 9, min: 15, max: 15 },
    { sten: 10, min: 16, max: 20 },
  ],
  M: [
    { sten: 1, min: 0, max: 6 },
    { sten: 2, min: 7, max: 7 },
    { sten: 3, min: 8, max: 9 },
    { sten: 4, min: 10, max: 10 },
    { sten: 5, min: 11, max: 12 },
    { sten: 6, min: 13, max: 14 },
    { sten: 7, min: 15, max: 16 },
    { sten: 8, min: 17, max: 17 },
    { sten: 9, min: 18, max: 18 },
    { sten: 10, min: 19, max: 26 },
  ],
  N: [
    { sten: 1, min: 0, max: 5 },
    { sten: 2, min: 6, max: 6 },
    { sten: 3, min: 7, max: 8 },
    { sten: 4, min: 9, max: 10 },
    { sten: 5, min: 11, max: 11 },
    { sten: 6, min: 12, max: 12 },
    { sten: 7, min: 13, max: 14 },
    { sten: 8, min: 15, max: 15 },
    { sten: 9, min: 16, max: 17 },
    { sten: 10, min: 18, max: 20 },
  ],
  O: [
    { sten: 1, min: 0, max: 3 },
    { sten: 2, min: 4, max: 5 },
    { sten: 3, min: 6, max: 6 },
    { sten: 4, min: 7, max: 7 },
    { sten: 5, min: 8, max: 10 },
    { sten: 6, min: 11, max: 11 },
    { sten: 7, min: 12, max: 14 },
    { sten: 8, min: 15, max: 16 },
    { sten: 9, min: 17, max: 19 },
    { sten: 10, min: 20, max: 26 },
  ],
  Q1: [
    { sten: 1, min: 0, max: 4 },
    { sten: 2, min: 5, max: 6 },
    { sten: 3, min: 7, max: 7 },
    { sten: 4, min: 8, max: 9 },
    { sten: 5, min: 10, max: 10 },
    { sten: 6, min: 11, max: 12 },
    { sten: 7, min: 13, max: 14 },
    { sten: 8, min: 15, max: 15 },
    { sten: 9, min: 16, max: 16 },
    { sten: 10, min: 17, max: 20 },
  ],
  Q2: [
    { sten: 1, min: 0, max: 3 },
    { sten: 2, min: 4, max: 5 },
    { sten: 3, min: 6, max: 7 },
    { sten: 4, min: 8, max: 8 },
    { sten: 5, min: 9, max: 10 },
    { sten: 6, min: 11, max: 12 },
    { sten: 7, min: 13, max: 13 },
    { sten: 8, min: 14, max: 15 },
    { sten: 9, min: 16, max: 17 },
    { sten: 10, min: 18, max: 20 },
  ],
  Q3: [
    { sten: 1, min: 0, max: 5 },
    { sten: 2, min: 6, max: 8 },
    { sten: 3, min: 9, max: 10 },
    { sten: 4, min: 11, max: 12 },
    { sten: 5, min: 13, max: 13 },
    { sten: 6, min: 14, max: 15 },
    { sten: 7, min: 16, max: 16 },
    { sten: 8, min: 17, max: 17 },
    { sten: 9, min: 18, max: 18 },
    { sten: 10, min: 19, max: 20 },
  ],
  Q4: [
    { sten: 1, min: 0, max: 1 },
    { sten: 2, min: 2, max: 2 },
    { sten: 3, min: 3, max: 3 },
    { sten: 4, min: 4, max: 5 },
    { sten: 5, min: 6, max: 8 },
    { sten: 6, min: 9, max: 9 },
    { sten: 7, min: 10, max: 11 },
    { sten: 8, min: 12, max: 13 },
    { sten: 9, min: 14, max: 16 },
    { sten: 10, min: 17, max: 26 },
  ],
};

// Table II: Mujeres (Female)
export const CONVERSION_TABLE_FEMALE: Record<FactorCode, StenRange[]> = {
  A: [
    { sten: 1, min: 0, max: 5 },
    { sten: 2, min: 6, max: 6 },
    { sten: 3, min: 7, max: 8 },
    { sten: 4, min: 9, max: 9 },
    { sten: 5, min: 10, max: 11 },
    { sten: 6, min: 12, max: 12 },
    { sten: 7, min: 13, max: 13 },
    { sten: 8, min: 14, max: 14 },
    { sten: 9, min: 15, max: 15 },
    { sten: 10, min: 16, max: 20 },
  ],
  B: [
    { sten: 1, min: 0, max: 2 },
    { sten: 2, min: 3, max: 3 },
    { sten: 3, min: 4, max: 4 },
    { sten: 4, min: 5, max: 5 },
    { sten: 5, min: 6, max: 6 },
    { sten: 6, min: 7, max: 7 },
    { sten: 7, min: 8, max: 8 },
    { sten: 8, min: 9, max: 9 },
    { sten: 9, min: 10, max: 10 },
    { sten: 10, min: 11, max: 13 },
  ],
  C: [
    { sten: 1, min: 0, max: 12 },
    { sten: 2, min: 13, max: 13 },
    { sten: 3, min: 14, max: 14 },
    { sten: 4, min: 15, max: 17 },
    { sten: 5, min: 18, max: 19 },
    { sten: 6, min: 20, max: 20 },
    { sten: 7, min: 21, max: 22 },
    { sten: 8, min: 23, max: 23 },
    { sten: 9, min: 24, max: 25 },
    { sten: 10, min: 26, max: 26 },
  ],
  E: [
    { sten: 1, min: 0, max: 5 },
    { sten: 2, min: 6, max: 6 },
    { sten: 3, min: 7, max: 8 },
    { sten: 4, min: 9, max: 10 },
    { sten: 5, min: 11, max: 12 },
    { sten: 6, min: 13, max: 14 },
    { sten: 7, min: 15, max: 16 },
    { sten: 8, min: 17, max: 17 },
    { sten: 9, min: 18, max: 20 },
    { sten: 10, min: 21, max: 26 },
  ],
  F: [
    { sten: 1, min: 0, max: 3 },
    { sten: 2, min: 4, max: 6 },
    { sten: 3, min: 7, max: 8 },
    { sten: 4, min: 9, max: 10 },
    { sten: 5, min: 11, max: 12 },
    { sten: 6, min: 13, max: 14 },
    { sten: 7, min: 15, max: 16 },
    { sten: 8, min: 17, max: 17 },
    { sten: 9, min: 18, max: 21 },
    { sten: 10, min: 22, max: 26 },
  ],
  G: [
    { sten: 1, min: 0, max: 7 },
    { sten: 2, min: 8, max: 8 },
    { sten: 3, min: 9, max: 9 },
    { sten: 4, min: 10, max: 11 },
    { sten: 5, min: 12, max: 13 },
    { sten: 6, min: 14, max: 15 },
    { sten: 7, min: 16, max: 16 },
    { sten: 8, min: 17, max: 17 },
    { sten: 9, min: 18, max: 18 },
    { sten: 10, min: 19, max: 20 },
  ],
  H: [
    { sten: 1, min: 0, max: 5 },
    { sten: 2, min: 6, max: 7 },
    { sten: 3, min: 8, max: 9 },
    { sten: 4, min: 10, max: 12 },
    { sten: 5, min: 13, max: 14 },
    { sten: 6, min: 15, max: 16 },
    { sten: 7, min: 17, max: 20 },
    { sten: 8, min: 21, max: 23 },
    { sten: 9, min: 24, max: 24 },
    { sten: 10, min: 25, max: 26 },
  ],
  I: [
    { sten: 1, min: 0, max: 3 },
    { sten: 2, min: 4, max: 5 },
    { sten: 3, min: 6, max: 6 },
    { sten: 4, min: 7, max: 7 },
    { sten: 5, min: 8, max: 10 },
    { sten: 6, min: 11, max: 12 },
    { sten: 7, min: 13, max: 14 },
    { sten: 8, min: 15, max: 15 },
    { sten: 9, min: 16, max: 16 },
    { sten: 10, min: 17, max: 20 },
  ],
  L: [
    { sten: 1, min: 0, max: 4 },
    { sten: 2, min: 5, max: 5 },
    { sten: 3, min: 6, max: 6 },
    { sten: 4, min: 7, max: 7 },
    { sten: 5, min: 8, max: 8 },
    { sten: 6, min: 9, max: 10 },
    { sten: 7, min: 11, max: 11 },
    { sten: 8, min: 12, max: 13 },
    { sten: 9, min: 14, max: 14 },
    { sten: 10, min: 15, max: 20 },
  ],
  M: [
    { sten: 1, min: 0, max: 6 },
    { sten: 2, min: 7, max: 8 },
    { sten: 3, min: 9, max: 9 },
    { sten: 4, min: 10, max: 10 },
    { sten: 5, min: 11, max: 13 },
    { sten: 6, min: 14, max: 15 },
    { sten: 7, min: 16, max: 16 },
    { sten: 8, min: 17, max: 18 },
    { sten: 9, min: 19, max: 20 },
    { sten: 10, min: 21, max: 26 },
  ],
  N: [
    { sten: 1, min: 0, max: 5 },
    { sten: 2, min: 6, max: 7 },
    { sten: 3, min: 8, max: 8 },
    { sten: 4, min: 9, max: 9 },
    { sten: 5, min: 10, max: 10 },
    { sten: 6, min: 11, max: 12 },
    { sten: 7, min: 13, max: 13 },
    { sten: 8, min: 14, max: 14 },
    { sten: 9, min: 15, max: 15 },
    { sten: 10, min: 16, max: 20 },
  ],
  O: [
    { sten: 1, min: 0, max: 2 },
    { sten: 2, min: 3, max: 3 },
    { sten: 3, min: 4, max: 5 },
    { sten: 4, min: 6, max: 8 },
    { sten: 5, min: 9, max: 10 },
    { sten: 6, min: 11, max: 11 },
    { sten: 7, min: 12, max: 13 },
    { sten: 8, min: 14, max: 14 },
    { sten: 9, min: 15, max: 16 },
    { sten: 10, min: 17, max: 26 },
  ],
  Q1: [
    { sten: 1, min: 0, max: 3 },
    { sten: 2, min: 4, max: 5 },
    { sten: 3, min: 6, max: 7 },
    { sten: 4, min: 8, max: 9 },
    { sten: 5, min: 10, max: 11 },
    { sten: 6, min: 12, max: 12 },
    { sten: 7, min: 13, max: 14 },
    { sten: 8, min: 15, max: 15 },
    { sten: 9, min: 16, max: 16 },
    { sten: 10, min: 17, max: 20 },
  ],
  Q2: [
    { sten: 1, min: 0, max: 5 },
    { sten: 2, min: 6, max: 6 },
    { sten: 3, min: 7, max: 8 },
    { sten: 4, min: 9, max: 9 },
    { sten: 5, min: 10, max: 11 },
    { sten: 6, min: 12, max: 12 },
    { sten: 7, min: 13, max: 14 },
    { sten: 8, min: 15, max: 16 },
    { sten: 9, min: 17, max: 17 },
    { sten: 10, min: 18, max: 20 },
  ],
  Q3: [
    { sten: 1, min: 0, max: 4 },
    { sten: 2, min: 5, max: 6 },
    { sten: 3, min: 7, max: 9 },
    { sten: 4, min: 10, max: 11 },
    { sten: 5, min: 12, max: 12 },
    { sten: 6, min: 13, max: 15 },
    { sten: 7, min: 16, max: 16 },
    { sten: 8, min: 17, max: 17 },
    { sten: 9, min: 18, max: 18 },
    { sten: 10, min: 19, max: 20 },
  ],
  Q4: [
    { sten: 1, min: 0, max: 2 },
    { sten: 2, min: 3, max: 3 },
    { sten: 3, min: 4, max: 4 },
    { sten: 4, min: 5, max: 6 },
    { sten: 5, min: 7, max: 8 },
    { sten: 6, min: 9, max: 10 },
    { sten: 7, min: 11, max: 12 },
    { sten: 8, min: 13, max: 15 },
    { sten: 9, min: 16, max: 17 },
    { sten: 10, min: 18, max: 26 },
  ],
};

export function rawToEsten(factor: FactorCode, rawScore: number, gender: 'M' | 'F'): number {
  const table = gender === 'M' ? CONVERSION_TABLE_MALE : CONVERSION_TABLE_FEMALE;
  const factorRanges = table[factor];
  if (!factorRanges) return 5;

  for (const range of factorRanges) {
    if (rawScore >= range.min && rawScore <= range.max) {
      return range.sten;
    }
  }

  // Fallbacks if out of bounds
  if (rawScore < factorRanges[0].min) return 1;
  return 10;
}

export interface SecondaryFactor {
  id: 'QI' | 'QII' | 'QIII' | 'QIV' | 'QV';
  name: string;
  sten: number;
  level: 'Bajo' | 'Promedio' | 'Alto';
  description: string;
  teachingNote: string;
}

export function calculateSecondaryFactors(estens: Record<FactorCode, number>): SecondaryFactor[] {
  // Standard Cattell 16PF second-order formulas normalized to 1-10 sten
  const A = estens.A || 5;
  const B = estens.B || 5;
  const C = estens.C || 5;
  const E = estens.E || 5;
  const F = estens.F || 5;
  const G = estens.G || 5;
  const H = estens.H || 5;
  const I = estens.I || 5;
  const L = estens.L || 5;
  const M = estens.M || 5;
  const N = estens.N || 5;
  const O = estens.O || 5;
  const Q1 = estens.Q1 || 5;
  const Q2 = estens.Q2 || 5;
  const Q3 = estens.Q3 || 5;
  const Q4 = estens.Q4 || 5;

  // Extraversión (QI): 0.2*A + 0.3*E + 0.4*F + 0.5*H - 0.2*Q2 - 1.1 -> scaled to 1-10
  const rawExt = (2 * A + 3 * E + 4 * F + 5 * H - 2 * Q2 - 11) / 10;
  const stenExt = Math.min(10, Math.max(1, Math.round(rawExt)));

  // Ansiedad (QII): (3*L + 4*O + 4*Q4 - 2*C - 2*H - 2*Q3 + 38) / 10
  const rawAns = (3 * L + 4 * O + 4 * Q4 - 2 * C - 2 * H - 2 * Q3 + 38) / 10;
  const stenAns = Math.min(10, Math.max(1, Math.round(rawAns)));

  // Tenacidad / Dureza Mental (QIII): (77 - 2*A - 3*I - 4*M - 2*Q1) / 10
  const rawTen = (77 - 2 * A - 3 * I - 4 * M - 2 * Q1) / 10;
  const stenTen = Math.min(10, Math.max(1, Math.round(rawTen)));

  // Independencia (QIV): (4*E + 3*M + 4*Q1 + 2*Q2 - 3*A) / 10
  const rawInd = (4 * E + 3 * M + 4 * Q1 + 2 * Q2 - 3 * A) / 10;
  const stenInd = Math.min(10, Math.max(1, Math.round(rawInd)));

  // Autocontrol (QV): (4*G + 3*Q3 - 2*F - 2*M + 10) / 10
  const rawAut = (4 * G + 3 * Q3 - 2 * F - 2 * M + 10) / 10;
  const stenAut = Math.min(10, Math.max(1, Math.round(rawAut)));

  const getLevel = (s: number): 'Bajo' | 'Promedio' | 'Alto' => {
    if (s <= 3) return 'Bajo';
    if (s >= 8) return 'Alto';
    return 'Promedio';
  };

  return [
    {
      id: 'QI',
      name: 'Extraversión (Ajuste Social)',
      sten: stenExt,
      level: getLevel(stenExt),
      description:
        stenExt >= 8
          ? 'Orientado hacia las personas, dinámico, comunicativo, busca el contacto grupal con soltura.'
          : stenExt <= 3
          ? 'Introversión marcada, reservado, prefiere actividades individuales y grupos pequeños.'
          : 'Equilibrio entre sociabilidad activa y concentración reflexiva en tareas académicas.',
      teachingNote:
        stenExt >= 6
          ? 'Muy favorable para dinamizar el aula de lenguas e incentivar la expresión oral en idiomas.'
          : 'Requiere entrenamiento en dinámicas de interacción grupal para no sobrecargarse frente a grupos numerosos.',
    },
    {
      id: 'QII',
      name: 'Nivel de Ansiedad Global',
      sten: stenAns,
      level: getLevel(stenAns),
      description:
        stenAns >= 8
          ? 'Elevada tensión interior, vulnerabilidad al estrés, reactividad anímica ante presiones.'
          : stenAns <= 3
          ? 'Serenidad emocional sólida, alta tolerancia al estrés y capacidad de sosiego.'
          : 'Ansiedad adaptativa normal, con capacidad adecuada de afrontamiento en situaciones cotidianas.',
      teachingNote:
        stenAns <= 6
          ? 'Excelente estabilidad emocional para la gestión del clima en el aula y resolución pacífica de conflictos.'
          : 'Se sugiere monitorear estrategias de manejo de estrés ante semanas de exámenes y entregas masivas.',
    },
    {
      id: 'QIII',
      name: 'Dureza Mental / Tenacidad',
      sten: stenTen,
      level: getLevel(stenTen),
      description:
        stenTen >= 8
          ? 'Pragmático, firme, objetivo, poco influenciable por emociones circunstanciales.'
          : stenTen <= 3
          ? 'Receptivo, empático, altamente sensible a los factores artísticos, estéticos y emocionales.'
          : 'Equilibrio entre firmeza académica y sensibilidad pedagógica hacia los estudiantes.',
      teachingNote:
        'Puntuación intermedia a moderada favorece la empatía lingüística sin perder la exigencia académica.',
    },
    {
      id: 'QIV',
      name: 'Independencia y Liderazgo',
      sten: stenInd,
      level: getLevel(stenInd),
      description:
        stenInd >= 8
          ? 'Autónomo, persuasivo, defiende sus convicciones con firmeza, iniciativa directiva.'
          : stenInd <= 3
          ? 'Conciliador, prefiere seguir instrucciones dadas y acatar directrices sin cuestionar.'
          : 'Colaborador asertivo, aporta propuestas constructivas y respeta consensos.',
      teachingNote:
        stenInd >= 5
          ? 'Aporta seguridad para tomar decisiones didácticas, dirigir proyectos pedagógicos y coordinar academias.'
          : 'Favorable para el trabajo en equipo; podría requerir mayor impulso para asumir jefaturas docentes.',
    },
    {
      id: 'QV',
      name: 'Autocontrol y Disciplina',
      sten: stenAut,
      level: getLevel(stenAut),
      description:
        stenAut >= 8
          ? 'Fuerte gobierno de impulsos, altamente ordenado, escrupuloso con compromisos y reglamentos.'
          : stenAut <= 3
          ? 'Espontáneo, flexible pero con tendencia a la dispersión o postergación de plazos.'
          : 'Nivel adecuado de organización personal que permite responder a imprevistos con flexibilidad.',
      teachingNote:
        stenAut >= 6
          ? 'Garantiza planeaciones didácticas a tiempo, puntualidad institucional y rigor metodológico en lenguas.'
          : 'Convendría reforzar hábitos de planeación estructurada y cumplimiento de calendarios académicos.',
    },
  ];
}

export interface TeachingCompetency {
  name: string;
  category: string;
  score: number; // 0 to 100%
  level: 'Excelente' | 'Competente' | 'En Desarrollo';
  factorsInvolved: string;
  description: string;
  evaluatorTips: string;
}

export function calculateTeachingCompetencies(
  estens: Record<FactorCode, number>
): TeachingCompetency[] {
  const getVal = (f: FactorCode) => estens[f] || 5;

  // 1. Habilidades Comunicativas e Interpersonales (A, H, F)
  // Higher A, H, F is ideal for language teacher communication
  const c1Raw = (getVal('A') * 0.4 + getVal('H') * 0.35 + getVal('F') * 0.25) / 10;
  const c1Score = Math.min(100, Math.max(10, Math.round(c1Raw * 100)));

  // 2. Estabilidad Emocional y Gestión del Aula (C, low O, low Q4)
  // Higher C, low O (11-O), low Q4 (11-Q4)
  const c2Raw = (getVal('C') * 0.4 + (11 - getVal('O')) * 0.3 + (11 - getVal('Q4')) * 0.3) / 10;
  const c2Score = Math.min(100, Math.max(10, Math.round(c2Raw * 100)));

  // 3. Innovación Metodológica y Apertura Lingüística (Q1, M, B)
  const c3Raw = (getVal('Q1') * 0.4 + getVal('M') * 0.3 + getVal('B') * 0.3) / 10;
  const c3Score = Math.min(100, Math.max(10, Math.round(c3Raw * 100)));

  // 4. Responsabilidad Ética y Rigor Didáctico (G, Q3)
  const c4Raw = (getVal('G') * 0.5 + getVal('Q3') * 0.5) / 10;
  const c4Score = Math.min(100, Math.max(10, Math.round(c4Raw * 100)));

  // 5. Liderazgo Pedagógico y Trabajo Colegiado (E, N, balanced Q2)
  const q2Balanced = 10 - Math.abs(getVal('Q2') - 5.5) * 1.5;
  const c5Raw = (getVal('E') * 0.35 + getVal('N') * 0.35 + q2Balanced * 0.3) / 10;
  const c5Score = Math.min(100, Math.max(10, Math.round(c5Raw * 100)));

  const getLevel = (score: number): 'Excelente' | 'Competente' | 'En Desarrollo' => {
    if (score >= 75) return 'Excelente';
    if (score >= 55) return 'Competente';
    return 'En Desarrollo';
  };

  return [
    {
      name: 'Comunicación y Dinamismo en Aula',
      category: 'Expresión & Rapport',
      score: c1Score,
      level: getLevel(c1Score),
      factorsInvolved: 'A (Afectotimia), H (Audacia Social), F (Entusiasmo)',
      description:
        'Capacidad para interactuar con calidez, hablar en público sin inhibiciones y contagiar entusiasmo durante las sesiones en español e inglés.',
      evaluatorTips:
        'Evaluar en la entrevista la soltura verbal en ambos idiomas, contacto visual y calidez gestual.',
    },
    {
      name: 'Regulación Emocional y Clima de Aula',
      category: 'Resiliencia & Tolerancia',
      score: c2Score,
      level: getLevel(c2Score),
      factorsInvolved: 'C (Estabilidad), O (Baja Aprensión), Q4 (Baja Tensión)',
      description:
        'Paciencia y equilibrio psicológico para tolerar errores lingüísticos de los alumnos, resolver roces y mantener la serenidad ante la presión académica.',
      evaluatorTips:
        'Preguntar sobre situaciones pasadas de conflicto o frustración y observar su madurez de afrontamiento.',
    },
    {
      name: 'Innovación y Flexibilidad Metodológica',
      category: 'Didáctica & TIC',
      score: c3Score,
      level: getLevel(c3Score),
      factorsInvolved: 'Q1 (Apertura al Cambio), M (Creatividad), B (Razonamiento)',
      description:
        'Disposición hacia el aprendizaje continuo de nuevas corrientes lingüísticas, diseño de materiales lúdicos y uso de tecnologías educativas.',
      evaluatorTips:
        'Consultar su disposición a usar herramientas digitales, plataformas interactivas y métodos comunicativos contemporáneos.',
    },
    {
      name: 'Rigor Didáctico y Compromiso Ético',
      category: 'Planeación & Evaluación',
      score: c4Score,
      level: getLevel(c4Score),
      factorsInvolved: 'G (Atención a Normas), Q3 (Control / Perfeccionismo)',
      description:
        'Constancia para planear clases con anticipación, aplicar rúbricas alineadas al marco europeo (MCER) y mantener la puntualidad profesional.',
      evaluatorTips:
        'Revisar su disciplina de estudio, hábitos de organización de tiempo y responsabilidad con entregables.',
    },
    {
      name: 'Liderazgo Pedagógico y Trabajo Colegiado',
      category: 'Mediación & Academia',
      score: c5Score,
      level: getLevel(c5Score),
      factorsInvolved: 'E (Asertividad), N (Diplomacia), Q2 (Colaboración)',
      description:
        'Habilidad para conducir la disciplina del aula con respeto y coordinarse armónicamente con profesores de academia y directivos.',
      evaluatorTips:
        'Explorar su experiencia trabajando en proyectos en equipo y su estilo de mediación ante opiniones divergentes.',
    },
  ];
}

export interface SuitabilityReport {
  overallPercentage: number;
  verdict: 'Altamente Idóneo' | 'Favorable' | 'Favorable con Observaciones' | 'Requiere Acompañamiento';
  badgeColor: string;
  summary: string;
  strengths: string[];
  areasOfAttention: string[];
  interviewQuestions: string[];
}

export function calculateTeachingSuitability(
  estens: Record<FactorCode, number>,
  applicantName: string
): SuitabilityReport {
  const competencies = calculateTeachingCompetencies(estens);
  const avgComp =
    competencies.reduce((acc, curr) => acc + curr.score, 0) / competencies.length;

  const rounded = Math.round(avgComp);

  let verdict: SuitabilityReport['verdict'] = 'Favorable';
  let badgeColor = 'bg-blue-600 text-white';

  if (rounded >= 78) {
    verdict = 'Altamente Idóneo';
    badgeColor = 'bg-emerald-600 text-white';
  } else if (rounded >= 65) {
    verdict = 'Favorable';
    badgeColor = 'bg-blue-700 text-white';
  } else if (rounded >= 52) {
    verdict = 'Favorable con Observaciones';
    badgeColor = 'bg-amber-600 text-white';
  } else {
    verdict = 'Requiere Acompañamiento';
    badgeColor = 'bg-rose-600 text-white';
  }

  const strengths: string[] = [];
  const areasOfAttention: string[] = [];
  const interviewQuestions: string[] = [];

  // Evaluate specific factors
  if (estens.A >= 6 && estens.H >= 6) {
    strengths.push('Gran calidez interpersonal y desenvoltura social para liderar grupos en lenguas extranjeras.');
  } else if (estens.A <= 3 || estens.H <= 3) {
    areasOfAttention.push('Perfil reservado o tímido; puede costar trabajo la desinhibición comunicativa al hablar frente a grupo.');
    interviewQuestions.push('¿Cómo te sientes al tener que hablar o realizar presentaciones en público en inglés/español?');
  }

  if (estens.C >= 6 && estens.Q4 <= 5) {
    strengths.push('Sólido equilibrio emocional y serenidad ante la presión académica o conductas disruptivas.');
  } else if (estens.C <= 3 || estens.Q4 >= 8) {
    areasOfAttention.push('Sensibilidad al estrés y tensión acumulada; riesgo de sobrecarga ante exigencias intensas.');
    interviewQuestions.push('Cuéntanos sobre una situación académica de alta presión reciente: ¿qué hiciste para mantener la calma?');
  }

  if (estens.G >= 6 && estens.Q3 >= 6) {
    strengths.push('Alto sentido del deber, disciplina personal y meticulosidad para la planeación didáctica.');
  } else if (estens.G <= 4 || estens.Q3 <= 4) {
    areasOfAttention.push('Tendencia a la flexibilidad excesiva o informalidad en plazos y normas estructuradas.');
    interviewQuestions.push('¿Cómo organizas tu tiempo cuando tienes múltiples tareas con fechas de entrega cercanas?');
  }

  if (estens.Q1 >= 6 || estens.M >= 6) {
    strengths.push('Apertura mental a la innovación metodológica, creatividad lúdica y adopción de tecnologías educativas.');
  }

  if (estens.B >= 7) {
    strengths.push('Excelente capacidad de abstracción para el análisis lingüístico, semántico y fonológico.');
  }

  if (interviewQuestions.length < 3) {
    interviewQuestions.push('¿Qué te motivó a elegir la enseñanza del español e inglés como profesión de vida?');
    interviewQuestions.push('¿Qué estrategias usarías con un alumno que tiene mucho miedo a equivocarse al hablar en inglés?');
  }

  const summary = `${applicantName || 'El aspirante'} presenta un índice global de idoneidad docente del ${rounded}%, clasificado como "${verdict}" para el perfil de ingreso de la Licenciatura en Enseñanza de Lenguas Extranjeras (Español e Inglés). ${
    verdict === 'Altamente Idóneo'
      ? 'Sus rasgos de personalidad armonizan de forma sobresaliente con las competencias comunicativas, emocionales y pedagógicas requeridas para la docencia.'
      : verdict === 'Favorable'
      ? 'Muestra un perfil equilibrado con sólidas capacidades interpersonales y cognitivas acordes al plan formativo de la licenciatura.'
      : verdict === 'Favorable con Observaciones'
      ? 'Presenta aptitudes favorables pero se recomienda puntualizar en la entrevista los aspectos señalados para brindar el debido acompañamiento tutorial.'
      : 'Se detectan áreas que requieren fortalecimiento formativo y seguimiento tutorial cercano para el ejercicio docente.'
  }`;

  return {
    overallPercentage: rounded,
    verdict,
    badgeColor,
    summary,
    strengths,
    areasOfAttention,
    interviewQuestions,
  };
}
