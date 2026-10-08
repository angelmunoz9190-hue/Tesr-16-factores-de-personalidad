export interface Question16PF {
  id: number;
  text: string;
  options: {
    a: string;
    b: string;
    c: string;
  };
  factor: 'A' | 'B' | 'C' | 'E' | 'F' | 'G' | 'H' | 'I' | 'L' | 'M' | 'N' | 'O' | 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'VAL';
  // Scoring points for answers a, b, c
  scores: {
    a: number;
    b: number;
    c: number;
  };
}

// 187 Items of 16PF Forma A en Español
export const QUESTIONS_16PF: Question16PF[] = [
  {
    id: 1,
    text: "Entendí perfectamente las instrucciones de este cuestionario:",
    options: { a: "Sí", b: "En duda", c: "No" },
    factor: "VAL",
    scores: { a: 1, b: 0, c: 0 }
  },
  {
    id: 2,
    text: "Estoy dispuesto a contestar cada pregunta tan sinceramente como me sea posible:",
    options: { a: "Sí", b: "En duda", c: "No" },
    factor: "VAL",
    scores: { a: 1, b: 0, c: 0 }
  },
  {
    id: 3,
    text: "Preferiría tener una casa:",
    options: { a: "En una zona poblada", b: "Intermedio", c: "Aislada en un bosque" },
    factor: "A",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 4,
    text: "Yo tengo la energía suficiente para enfrentarme a mis dificultades:",
    options: { a: "Siempre", b: "Generalmente", c: "Pocas veces" },
    factor: "C",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 5,
    text: "Me siento un poco nervioso ante los animales salvajes, aunque estén enjaulados:",
    options: { a: "Sí", b: "Indeciso", c: "No" },
    factor: "C",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 6,
    text: "Evito criticar a las personas y a sus ideas:",
    options: { a: "Siempre", b: "A veces", c: "Nunca" },
    factor: "E",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 7,
    text: "Yo hago observaciones sarcásticas a las personas que creo que se las merecen:",
    options: { a: "Siempre", b: "A veces", c: "Nunca" },
    factor: "E",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 8,
    text: "Yo prefiero la música semiclásica que las canciones populares:",
    options: { a: "Cierto", b: "Intermedio", c: "Falso" },
    factor: "F",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 9,
    text: "Si yo viera pelear a los niños de mi vecino:",
    options: { a: "Dejaría que se arreglaran solos", b: "No sabría qué hacer", c: "Intentaría reconciliarlos" },
    factor: "F",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 10,
    text: "En las reuniones sociales:",
    options: { a: "Me hago notar", b: "No sé", c: "Prefiero permanecer a distancia" },
    factor: "G",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 11,
    text: "Yo preferiría ser:",
    options: { a: "Ingeniero constructor", b: "Indeciso", c: "Escritor de guiones (dramaturgo)" },
    factor: "H",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 12,
    text: "Yo prefiero detenerme a observar a un artista pintando que a escuchar a algunas personas discutiendo violentamente:",
    options: { a: "Cierto", b: "No sé", c: "Falso" },
    factor: "H",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 13,
    text: "Casi siempre puedo tolerar a la gente vanidosa que se cree la gran cosa:",
    options: { a: "Sí", b: "En duda", c: "No" },
    factor: "I",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 14,
    text: "Cuando un hombre es deshonesto, casi siempre lo puedes notar en su cara:",
    options: { a: "Sí", b: "En duda", c: "No" },
    factor: "L",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 15,
    text: "Sería mejor que las vacaciones fueran más largas y que todos tuvieran que tomarlas:",
    options: { a: "De acuerdo", b: "Indeciso", c: "En desacuerdo" },
    factor: "M",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 16,
    text: "Preferiría correr el riesgo de un trabajo con un sueldo elevado aunque irregular, que un trabajo con un sueldo menor y constante:",
    options: { a: "Sí", b: "En duda", c: "No" },
    factor: "N",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 17,
    text: "Yo hablo sobre mis sentimientos:",
    options: { a: "Sólo si es necesario", b: "Intermedio", c: "Cada vez que tengo la oportunidad" },
    factor: "O",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 18,
    text: "En ocasiones tengo la sensación de un vago peligro, o un miedo súbito por razones que no comprendo:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "Q1",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 19,
    text: "Cuando me regañan por algo que no hice, no me siento culpable:",
    options: { a: "Cierto", b: "Intermedio", c: "No" },
    factor: "Q2",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 20,
    text: "Con dinero puedo comprar casi todo:",
    options: { a: "Sí", b: "Dudoso", c: "No" },
    factor: "Q3",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 21,
    text: "En mis decisiones influyen más:",
    options: { a: "Mis emociones", b: "Mis sentimientos y razón por igual", c: "Mis razonamientos" },
    factor: "Q4",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 22,
    text: "La mayoría de las personas serían más felices si se relacionaran más con sus semejantes e hicieran lo mismo que otros:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "A",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 23,
    text: "Cuando me veo en un espejo, algunas veces confundo cuál es la derecha y cuál es la izquierda:",
    options: { a: "Cierto", b: "En duda", c: "Falso" },
    factor: "C",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 24,
    text: "Cuando estoy platicando me gusta:",
    options: { a: "Decir las cosas tal y como se me ocurren", b: "Intermedio", c: "Organizar primero mis pensamientos" },
    factor: "F",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 25,
    text: "Cuando algo en verdad me pone furioso, por lo general me calmo rápidamente:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "H",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 26,
    text: "Si yo tuviera el mismo sueldo y horario me gustaría más trabajar como:",
    options: { a: "Carpintero o cocinero", b: "Indeciso", c: "Mesero en un buen restaurante" },
    factor: "A",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 27,
    text: "Yo soy apto para:",
    options: { a: "Algunos pocos empleos", b: "Varios empleos", c: "Muchos empleos" },
    factor: "A",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 28,
    text: "\"Pala\" es a \"cavar\" como \"cuchillo\" es a:",
    options: { a: "Afilado", b: "Cortar", c: "Puntiagudo" },
    factor: "B",
    scores: { a: 0, b: 1, c: 0 }
  },
  {
    id: 29,
    text: "A veces no puedo dormir porque una idea me da vueltas en la cabeza:",
    options: { a: "Cierto", b: "Dudoso", c: "Falso" },
    factor: "C",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 30,
    text: "En mi vida privada, casi siempre alcanzo las metas que me propongo:",
    options: { a: "Cierto", b: "Dudoso", c: "Falso" },
    factor: "C",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 31,
    text: "Cuando una ley es anticuada debe ser cambiada:",
    options: { a: "Sólo después de una discusión considerable", b: "Intermedio", c: "Rápidamente" },
    factor: "E",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 32,
    text: "Me disgusta trabajar en un proyecto en el que se toman medidas rápidas que afectan a otros:",
    options: { a: "Cierto", b: "Intermedio", c: "Falso" },
    factor: "E",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 33,
    text: "La mayoría de la gente que conozco me considera como un conversador agradable:",
    options: { a: "Sí", b: "Indeciso", c: "No" },
    factor: "F",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 34,
    text: "Cuando veo a personas desaliñadas y desaseadas, yo:",
    options: { a: "Las acepto", b: "Intermedio", c: "Me disgusto" },
    factor: "F",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 35,
    text: "Me siento un poco apenado si de repente me convierto en el centro de atención en una reunión social:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "G",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 36,
    text: "Siempre me gusta participar en reuniones concurridas, por ejemplo: una fiesta, un mitin:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "H",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 37,
    text: "En la escuela prefiero (o preferí):",
    options: { a: "La música", b: "Indeciso", c: "Los trabajos manuales" },
    factor: "H",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 38,
    text: "Cuando estoy encargado de hacer algo, yo insisto en que se sigan mis instrucciones o bien renuncio:",
    options: { a: "Sí", b: "A veces", c: "No" },
    factor: "I",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 39,
    text: "Para los padres es más importante:",
    options: { a: "Ayudar a sus niños a desarrollar sus afectos", b: "Intermedio", c: "Enseñar a sus niños cómo controlar sus emociones" },
    factor: "L",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 40,
    text: "En una tarea de grupo, yo más bien trataría de:",
    options: { a: "Imponer acuerdos", b: "Intermedio", c: "Hacer apuntes y ver que se obedezcan las reglas" },
    factor: "M",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 41,
    text: "De vez en cuando siento la necesidad de realizar actividades físicas rudas o pesadas:",
    options: { a: "Sí", b: "Indeciso", c: "No" },
    factor: "N",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 42,
    text: "Preferiría juntarme con gente bien educada a juntarme con individuos toscos y rebeldes:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "O",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 43,
    text: "Me siento muy afligido cuando la gente me critica en público:",
    options: { a: "Cierto", b: "Intermedio", c: "Falso" },
    factor: "Q1",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 44,
    text: "Cuando el jefe (o el maestro) me llama:",
    options: { a: "Veo una oportunidad para hablar de cosas que me interesan", b: "Indeciso", c: "Temo haber hecho algo mal" },
    factor: "Q2",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 45,
    text: "Lo que este mundo necesita son:",
    options: { a: "Ciudadanos firmes y serios", b: "No sé", c: "\"Idealistas\" con planes para mejorarlo" },
    factor: "Q3",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 46,
    text: "En todo lo que leo, estoy siempre pendiente de las intenciones propagandistas:",
    options: { a: "Sí", b: "Indeciso", c: "No" },
    factor: "Q4",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 47,
    text: "De adolescente participé en los deportes escolares:",
    options: { a: "Pocas veces", b: "Frecuentemente", c: "Muy frecuentemente" },
    factor: "A",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 48,
    text: "Yo conservo mi cuarto bien arreglado, con cada cosa en su lugar:",
    options: { a: "Sí", b: "Algunas veces", c: "No" },
    factor: "C",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 49,
    text: "A veces me pongo tenso e inquieto cuando pienso en los sucesos del día:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "F",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 50,
    text: "A veces dudo que la gente con la que hablo se interese realmente en lo que digo:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "H",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 51,
    text: "Si tuviera que escoger, preferiría ser:",
    options: { a: "Guardabosques", b: "Indeciso", c: "Maestro de escuela" },
    factor: "A",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 52,
    text: "En santos y cumpleaños:",
    options: { a: "Me gusta hacer regalos personales", b: "Indeciso", c: "Creo que aun es poco molesto comprar regalos" },
    factor: "A",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 53,
    text: "\"Cansado\" es a \"trabajo\" como \"orgullo\" es a:",
    options: { a: "Sonrisa", b: "Éxito", c: "Felicidad" },
    factor: "B",
    scores: { a: 0, b: 1, c: 0 }
  },
  {
    id: 54,
    text: "¿Cuál de las siguientes palabras es de clase distinta a las otras dos?",
    options: { a: "Vela", b: "Luna", c: "Luz eléctrica" },
    factor: "B",
    scores: { a: 0, b: 1, c: 0 }
  },
  {
    id: 55,
    text: "He sido abandonado por mis amigos:",
    options: { a: "Casi nunca", b: "Ocasionalmente", c: "Muy a menudo" },
    factor: "C",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 56,
    text: "Yo tengo algunas cualidades por lo que me siento superior a la mayoría de la gente:",
    options: { a: "Sí", b: "Dudoso", c: "No" },
    factor: "E",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 57,
    text: "Cuando me enojo, yo me esfuerzo por ocultar mis sentimientos a los demás:",
    options: { a: "Cierto", b: "A veces", c: "Falso" },
    factor: "E",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 58,
    text: "Me gusta asistir a espectáculos, o ir a fiestas:",
    options: { a: "Más de una vez a la semana (más de lo normal)", b: "Una vez a la semana (lo normal)", c: "Menos de una vez a la semana (menos de lo normal)" },
    factor: "F",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 59,
    text: "Pienso que suficiente libertad es más importante que las buenas costumbres y el respeto a la ley:",
    options: { a: "Cierto", b: "Indeciso", c: "Falso" },
    factor: "F",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 60,
    text: "En presencia de personas de mayor experiencia, edad o posición, tiendo a permanecer callado:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "G",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 61,
    text: "Se me hace difícil hablar o recitar frente a un grupo numeroso:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "H",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 62,
    text: "Cuando estoy en un lugar extraño, tengo un buen sentido de la orientación (encuentro fácilmente dónde está el Norte, Sur, Este y Oeste):",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "H",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 63,
    text: "Si alguien se enoja conmigo, yo:",
    options: { a: "Trato de calmarlo", b: "Indeciso", c: "Me irrito" },
    factor: "I",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 64,
    text: "Cuando leo un artículo tendencioso o injusto en una revista tiendo a olvidarlo, más que a sentir ganas de \"devolverles el golpe\":",
    options: { a: "Cierto", b: "Dudoso", c: "Falso" },
    factor: "L",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 65,
    text: "Tiendo a olvidar muchas cosas triviales y sin importancia, como nombres de calles o de tiendas:",
    options: { a: "Sí", b: "Algunas veces", c: "No" },
    factor: "M",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 66,
    text: "Me gustaría llevar la vida de un veterinario, curando y operando animales:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "N",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 67,
    text: "Yo como mis alimentos con placer, aunque no siempre tan cuidadosa y apropiadamente como algunas personas:",
    options: { a: "Cierto", b: "Intermedio", c: "Falso" },
    factor: "O",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 68,
    text: "Algunas veces no tengo ganas de ver a nadie:",
    options: { a: "Raras veces", b: "Intermedio", c: "Muy frecuentemente" },
    factor: "Q1",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 69,
    text: "A veces las personas me dicen que muestro de manera demasiado clara mi agitación:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "Q2",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 70,
    text: "De adolescente, si mi opinión era distinta a la de mis padres, yo por lo general:",
    options: { a: "La mantenía", b: "Indeciso", c: "Aceptaba la autoridad de mis padres" },
    factor: "Q3",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 71,
    text: "Me gustaría tener una oficina para mí, que no fuera compartida con otra persona:",
    options: { a: "Sí", b: "Indeciso", c: "No" },
    factor: "Q4",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 72,
    text: "Preferiría disfrutar la vida discretamente a mi manera, más que ser admirado por mis éxitos:",
    options: { a: "Cierto", b: "Indeciso", c: "Falso" },
    factor: "A",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 73,
    text: "Me siento maduro en la mayoría de mis actos:",
    options: { a: "Verdadero", b: "Dudoso", c: "Falso" },
    factor: "C",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 74,
    text: "Cuando la gente me critica me enojo, en vez de sentirme ayudado:",
    options: { a: "Frecuentemente", b: "Ocasionalmente", c: "Nunca" },
    factor: "F",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 75,
    text: "Estoy dispuesto a expresar mis sentimientos sólo bajo mi estricto control:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "H",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 76,
    text: "Al inventar algo útil, preferiría:",
    options: { a: "Perfeccionarlo en el laboratorio", b: "Indeciso", c: "Vendérselo a la gente" },
    factor: "A",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 77,
    text: "\"Sorpresa\" es a \"extraño\" como \"miedo\" es a:",
    options: { a: "Valiente", b: "Ansioso", c: "Terrible" },
    factor: "B",
    scores: { a: 0, b: 0, c: 1 }
  },
  {
    id: 78,
    text: "¿Cuál de las siguientes fracciones es distinta a las otras dos?",
    options: { a: "3/7", b: "3/9", c: "3/11" },
    factor: "B",
    scores: { a: 0, b: 1, c: 0 }
  },
  {
    id: 79,
    text: "Yo no sé por qué, pero algunas personas como que me ignoran o me evitan:",
    options: { a: "Cierto", b: "Indeciso", c: "Falso" },
    factor: "C",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 80,
    text: "Las personas me tratan con menos consideración de lo que merecen mis buenas intenciones:",
    options: { a: "A menudo", b: "En ocasiones", c: "Nunca" },
    factor: "C",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 81,
    text: "En un grupo, me molesta que se digan albures o groserías aun cuando no haya mujeres delante:",
    options: { a: "Cierto", b: "Intermedio", c: "Falso" },
    factor: "E",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 82,
    text: "Yo tengo indudablemente menos amigos que la mayoría de la gente:",
    options: { a: "Sí", b: "En duda", c: "No" },
    factor: "E",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 83,
    text: "Detestaría estar en un lugar donde no hubiera muchas personas con quien platicar:",
    options: { a: "Cierto", b: "Indeciso", c: "Falso" },
    factor: "F",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 84,
    text: "Las personas dicen que soy descuidado a veces, aunque ellas me consideren simpático:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "F",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 85,
    text: "En distintas ocasiones de mi vida social, he experimentado miedo al público:",
    options: { a: "Frecuentemente", b: "En ocasiones", c: "Casi nunca" },
    factor: "G",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 86,
    text: "Cuando estoy en un grupo pequeño, me agrada permanecer en silencio y mejor dejar que otros hablen:",
    options: { a: "Cierto", b: "Intermedio", c: "Falso" },
    factor: "H",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 87,
    text: "Yo prefiero leer:",
    options: { a: "Una narración realista de batallas militares o políticas", b: "Indeciso", c: "Una novela sentimental e imaginativa" },
    factor: "H",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 88,
    text: "Cuando la gente mandona trata de imponerse, yo hago exactamente lo contrario de lo que ellas quieren:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "I",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 89,
    text: "Es una regla que mis jefes o los miembros de mi familia me consideren culpable sólo si existe una razón real:",
    options: { a: "Cierto", b: "Intermedio", c: "Falso" },
    factor: "L",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 90,
    text: "Me desagrada la manera como algunas personas observan con descaro o sin recato a otras, en las calles o en las tiendas:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "M",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 91,
    text: "En un viaje largo, preferiría:",
    options: { a: "Leer algo serio pero interesante", b: "Indeciso", c: "Platicar con el pasajero de junto" },
    factor: "N",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 92,
    text: "En una situación que puede volverse peligrosa, yo creo conveniente hacer ruido y escándalo, aunque se pierda la serenidad y la cortesía:",
    options: { a: "Sí", b: "Indeciso", c: "No" },
    factor: "O",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 93,
    text: "Si mis conocidos me tratan mal y me demuestran que les disgusto:",
    options: { a: "Me importa poco", b: "Intermedio", c: "Me pongo triste" },
    factor: "Q1",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 94,
    text: "Las alabanzas y los cumplidos que me dicen, me desagradan:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "Q2",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 95,
    text: "Me gustaría más bien tener un trabajo con:",
    options: { a: "Un sueldo fijo y seguro", b: "Intermedio", c: "Un sueldo bastante alto, que dependiera de mi constante persuasión a gente que me desagrada" },
    factor: "Q3",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 96,
    text: "Para mantenerme informado, yo prefiero:",
    options: { a: "Discutir los asuntos con las personas", b: "Intermedio", c: "Leer los reportes noticiosos diarios" },
    factor: "Q4",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 97,
    text: "Me gusta tomar parte activa en asuntos sociales, comités, etc.:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "A",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 98,
    text: "En el desempeño de una tarea, no estoy satisfecho hasta que no se ha realizado con atención el más mínimo detalle:",
    options: { a: "Cierto", b: "Intermedio", c: "Falso" },
    factor: "C",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 99,
    text: "A veces pequeñas contrariedades me irritan demasiado:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "F",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 100,
    text: "Yo siempre duermo profundo, nunca hablo ni camino durmiendo:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "H",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 101,
    text: "Sería muy interesante trabajar en una empresa:",
    options: { a: "Hablando con los clientes", b: "Intermedio", c: "Llevando las cuentas y el archivo" },
    factor: "A",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 102,
    text: "\"Tamaño\" es a \"longitud\" como \"deshonestidad\" es a:",
    options: { a: "Prisión", b: "Pecado", c: "Robo" },
    factor: "B",
    scores: { a: 0, b: 0, c: 1 }
  },
  {
    id: 103,
    text: "AB es a dc como SR es a:",
    options: { a: "qp", b: "pq", c: "tu" },
    factor: "B",
    scores: { a: 1, b: 0, c: 0 }
  },
  {
    id: 104,
    text: "Cuando la gente no es razonable:",
    options: { a: "Me quedo callado", b: "Intermedio", c: "Los desprecio" },
    factor: "C",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 105,
    text: "Si alguien habla en voz alta cuando estoy escuchando música:",
    options: { a: "Puedo concentrarme en la música y no me molesta", b: "Intermedio", c: "Acaban con mi placer y me molesto" },
    factor: "C",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 106,
    text: "Creo que soy bien descrito como:",
    options: { a: "Educado y tranquilo", b: "Intermedio", c: "Enérgico" },
    factor: "E",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 107,
    text: "Asisto a reuniones sociales sólo cuando tengo que hacerla, de otra manera trato de evitarlas:",
    options: { a: "Sí", b: "Indeciso", c: "No" },
    factor: "E",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 108,
    text: "Ser precavido y esperar poco es mejor que ser optimista y esperar siempre el éxito:",
    options: { a: "Cierto", b: "Indeciso", c: "Falso" },
    factor: "F",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 109,
    text: "Cuando pienso en las dificultades de mi trabajo:",
    options: { a: "Trato de planearlas anticipadamente", b: "Intermedio", c: "Supongo que podré manejarlas cuando se presenten" },
    factor: "F",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 110,
    text: "Para mí es fácil incorporarme con las personas en una reunión social:",
    options: { a: "Cierto", b: "Intermedio", c: "Falso" },
    factor: "G",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 111,
    text: "Cuando un poco de diplomacia y persuasión son necesarias para que la gente actúe, yo generalmente soy el primero en fomentarlas:",
    options: { a: "Cierto", b: "Indeciso", c: "Falso" },
    factor: "H",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 112,
    text: "Sería muy interesante ser:",
    options: { a: "Orientador vocacional de muchachos que tratan de encontrar su carrera", b: "Indeciso", c: "Ingeniero mecánico industrial" },
    factor: "H",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 113,
    text: "Si estoy completamente seguro de que una persona es injusta o es egoísta, se lo digo, aunque me traiga problemas:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "I",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 114,
    text: "A veces yo hago observaciones tontas en broma, sólo para que las personas se sorprendan y ver qué es lo que dicen:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "L",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 115,
    text: "Me gustaría ser reportero de teatro, ópera, conciertos:",
    options: { a: "Sí", b: "Indeciso", c: "No" },
    factor: "M",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 116,
    text: "Yo nunca siento la necesidad de hacer garabatos ni ponerme nervioso cuando estoy en una reunión:",
    options: { a: "Cierto", b: "Indeciso", c: "Falso" },
    factor: "N",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 117,
    text: "Si alguien me dice algo, que sé que es falso, yo muy probablemente me diga:",
    options: { a: "\"Él es un embustero\"", b: "Intermedio", c: "\"Aparentemente él está mal informado\"" },
    factor: "O",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 118,
    text: "Yo siento que me van a castigar, aun cuando no haya hecho nada malo:",
    options: { a: "A menudo", b: "Ocasionalmente", c: "Nunca" },
    factor: "Q1",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 119,
    text: "La idea de que las enfermedades tienen causas tanto físicas como mentales es muy exagerada:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "Q2",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 120,
    text: "La pompa y el esplendor de cualquier ceremonia estatal son cosas que deben conservarse:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "Q3",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 121,
    text: "Me molesta que las personas piensen que soy demasiado diferente o muy poco convencional:",
    options: { a: "Mucho", b: "Algo", c: "Nada" },
    factor: "Q4",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 122,
    text: "En la elaboración de alguna cosa, más bien yo trabajaría:",
    options: { a: "En equipo", b: "Indeciso", c: "Por mi propia cuenta" },
    factor: "A",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 123,
    text: "En algunos momentos me es difícil evitar un sentimiento de lástima hacia mí mismo:",
    options: { a: "A menudo", b: "En ocasiones", c: "Nunca" },
    factor: "C",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 124,
    text: "A menudo me enojo demasiado rápido con la gente:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "F",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 125,
    text: "Yo puedo cambiar viejos hábitos sin dificultad, y sin volver a ellos:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "H",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 126,
    text: "Si los salarios fueran los mismos, preferiría ser:",
    options: { a: "Abogado", b: "Indeciso", c: "Navegante o piloto" },
    factor: "A",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 127,
    text: "\"Mejor\" es a \"peor\" como \"más lento\" es a:",
    options: { a: "Rápido", b: "Óptimo", c: "Más veloz" },
    factor: "B",
    scores: { a: 0, b: 0, c: 1 }
  },
  {
    id: 128,
    text: "¿Cuáles de las siguientes letras deben ir al final de esta lista: xoooxxoooxxx?",
    options: { a: "oxxx", b: "ooxx", c: "xooo" },
    factor: "B",
    scores: { a: 0, b: 1, c: 0 }
  },
  {
    id: 129,
    text: "Cuando se llega la hora de algo que yo había planeado o anticipado, a veces no siento ganas de ir:",
    options: { a: "Cierto", b: "Intermedio", c: "Falso" },
    factor: "C",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 130,
    text: "Puedo trabajar con cuidado en muchas cosas, sin ser molestado por las personas que hacen ruido a mi alrededor:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "C",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 131,
    text: "A veces platico a personas desconocidas, cosas que me parecen importantes aunque no me las pregunten:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "E",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 132,
    text: "Yo paso mucho de mi tiempo libre platicando con amigos sobre reuniones sociales en las que nos divertimos en el pasado:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "E",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 133,
    text: "Me agrada hacer cosas temerarias y atrevidas nada más por gusto:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "F",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 134,
    text: "La escena de un cuarto desarreglado me molesta:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "F",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 135,
    text: "Me considero una persona muy sociable con la que es fácil llevarse:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "G",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 136,
    text: "En mi trato social:",
    options: { a: "Demuestro mis emociones como quiero", b: "Intermedio", c: "Me guardo mis emociones" },
    factor: "H",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 137,
    text: "Me gusta la música:",
    options: { a: "Alegre, ligera y animada", b: "Intermedio", c: "Emotiva y sentimental" },
    factor: "H",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 138,
    text: "Yo admiro más la belleza de un hermoso poema que la belleza de un arma bien hecha:",
    options: { a: "Sí", b: "Indeciso", c: "No" },
    factor: "I",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 139,
    text: "Si nadie se da cuenta de una buena observación mía:",
    options: { a: "No le doy importancia", b: "Indeciso", c: "Repito la frase para que la gente pueda escucharla nuevamente" },
    factor: "L",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 140,
    text: "Me gustaría trabajar como vigilante con criminales que estuvieran en libertad bajo palabra:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "M",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 141,
    text: "Uno debe tener cuidado al mezclarse con toda clase de extraños, por el peligro de una infección:",
    options: { a: "Sí", b: "Indeciso", c: "No" },
    factor: "N",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 142,
    text: "En un viaje al extranjero, yo preferiría ir en un \"tour\" planeado con un conductor de viajes experimentado, que planear por mí mismo los lugares que desearía visitar:",
    options: { a: "Sí", b: "Indeciso", c: "No" },
    factor: "O",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 143,
    text: "Me consideran, acertadamente, como una persona trabajadora y de mediano éxito:",
    options: { a: "Sí", b: "Indeciso", c: "No" },
    factor: "Q1",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 144,
    text: "Si las personas abusan de mi amistad, no lo resiento y lo olvido pronto:",
    options: { a: "Cierto", b: "Indeciso", c: "Falso" },
    factor: "Q2",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 145,
    text: "Si se desarrolla una discusión acalorada entre los miembros de un grupo, yo:",
    options: { a: "Quisiera ver a un \"ganador\"", b: "Intermedio", c: "Desearía que se calmaran rápidamente" },
    factor: "Q3",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 146,
    text: "Me gusta hacer mis planes yo solo, sin que nadie me interrumpa para aconsejarme:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "Q4",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 147,
    text: "A veces dejo que mis acciones se vean influidas por mis celos:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "A",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 148,
    text: "Yo creo firmemente que \"el jefe pudiera no tener la razón, pero siempre tendrá la razón por ser el jefe\":",
    options: { a: "Sí", b: "Indeciso", c: "No" },
    factor: "C",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 149,
    text: "Me pongo tenso cuando pienso en todas las cosas que me aquejan:",
    options: { a: "Sí", b: "A veces", c: "No" },
    factor: "F",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 150,
    text: "No me desconcierta que la gente me grite lo que tengo que hacer cuando estoy jugando:",
    options: { a: "Cierto", b: "Indeciso", c: "Falso" },
    factor: "H",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 151,
    text: "Preferiría la vida de:",
    options: { a: "Un artista", b: "Indeciso", c: "Secretario de un club social" },
    factor: "A",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 152,
    text: "¿Cuál de las siguientes palabras no corresponde a las otras dos?",
    options: { a: "Alguno", b: "Unos", c: "Muchos" },
    factor: "B",
    scores: { a: 1, b: 0, c: 0 }
  },
  {
    id: 153,
    text: "\"Llama\" es a \"calor\" como \"rosa\" es a:",
    options: { a: "Espina", b: "Pétalo rojo", c: "Perfume" },
    factor: "B",
    scores: { a: 0, b: 0, c: 1 }
  },
  {
    id: 154,
    text: "Tengo sueños tan intensos que me inquietan cuando duermo:",
    options: { a: "A menudo", b: "En ocasiones", c: "Casi nunca" },
    factor: "C",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 155,
    text: "Aunque las probabilidades de que algo tenga éxito estén completamente en contra, sigo pensando en aceptar el riesgo:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "C",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 156,
    text: "Me agrada saber bien lo que el grupo tiene que hacer para que así sea yo el que manda:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "E",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 157,
    text: "Preferiría vestirme sencilla y correctamente, y no con un estilo peculiar y llamativo:",
    options: { a: "Cierto", b: "Indeciso", c: "Falso" },
    factor: "F",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 158,
    text: "Me llama más la atención pasar una tarde con un pasatiempo tranquilo que en una fiesta animada:",
    options: { a: "Cierto", b: "Indeciso", c: "Falso" },
    factor: "F",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 159,
    text: "No hago caso a las sugerencias bien intencionadas de los demás, aunque pienso que debería:",
    options: { a: "En ocasiones", b: "Casi nunca", c: "Nunca" },
    factor: "G",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 160,
    text: "Siempre mi criterio para cualquier decisión se basa en los principios del bien y el mal:",
    options: { a: "Sí", b: "Indeciso", c: "No" },
    factor: "G",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 161,
    text: "Me disgusta un poco que un grupo me observe cuando trabajo:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "G",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 162,
    text: "Debido a que no siempre es posible obtener las cosas por medio de métodos graduables y razonables, a veces es necesario usar la fuerza:",
    options: { a: "Cierto", b: "Intermedio", c: "Falso" },
    factor: "H",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 163,
    text: "En la escuela prefiero (o preferí):",
    options: { a: "Español y literatura", b: "Indeciso", c: "Aritmética y matemáticas" },
    factor: "I",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 164,
    text: "A veces me causa problemas el que la gente hable mal de mí a mis espaldas, sin tener razón:",
    options: { a: "Sí", b: "Indeciso", c: "No" },
    factor: "I",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 165,
    text: "Platicar con la gente convencional, común y corriente:",
    options: { a: "Es a menudo interesante e importante", b: "Intermedio", c: "Me molesta porque dicen cosas tontas y superficiales" },
    factor: "L",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 166,
    text: "Algunas cosas me enojan tanto que prefiero no hablar de ellas:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "M",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 167,
    text: "Es muy importante en la educación:",
    options: { a: "Dar suficiente afecto a los niños", b: "Intermedio", c: "Que los niños aprendan hábitos y actitudes convenientes" },
    factor: "N",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 168,
    text: "La gente me considera una persona estable, sin perturbaciones, ante las altas y bajas de la vida:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "O",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 169,
    text: "Pienso que la sociedad debe crear nuevas costumbres por razones modernas y eliminar viejas costumbres o simples tradiciones:",
    options: { a: "Sí", b: "Indeciso", c: "No" },
    factor: "Q1",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 170,
    text: "Yo pienso que en el mundo actual es más importante resolver:",
    options: { a: "Los asuntos sobre moralidad", b: "Indeciso", c: "Las dificultades políticas" },
    factor: "Q2",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 171,
    text: "Yo aprendo mejor:",
    options: { a: "Leyendo un libro bien escrito", b: "Intermedio", c: "Participando en una discusión de grupo" },
    factor: "Q3",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 172,
    text: "Prefiero guiarme yo mismo en lugar de actuar según las reglas aprobadas:",
    options: { a: "Cierto", b: "Indeciso", c: "Falso" },
    factor: "Q4",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 173,
    text: "Prefiero esperar hasta que estoy seguro que es correcto lo que pienso decir, antes de exponer mis razones:",
    options: { a: "Siempre", b: "En general", c: "Solamente si es posible" },
    factor: "A",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 174,
    text: "Algunas cosas que no tienen importancia, \"me ponen los nervios de punta\":",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "C",
    scores: { a: 0, b: 1, c: 2 }
  },
  {
    id: 175,
    text: "Pocas veces digo cosas que pienso sin reflexionar y que después tengo que lamentar grandemente:",
    options: { a: "Cierto", b: "Indeciso", c: "Falso" },
    factor: "H",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 176,
    text: "Si me pidieran que trabajara en una obra de caridad:",
    options: { a: "Aceptaría", b: "Indeciso", c: "Diría con cortesía que estoy ocupado" },
    factor: "A",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 177,
    text: "¿Cuál de las siguientes palabras es distinta a las otras dos?",
    options: { a: "Ancho", b: "Zigzag", c: "Derecho" },
    factor: "B",
    scores: { a: 0, b: 1, c: 0 }
  },
  {
    id: 178,
    text: "\"Pronto\" es a \"nunca\" como \"cerca\" es a:",
    options: { a: "Nada", b: "Lejos", c: "Fuera" },
    factor: "B",
    scores: { a: 0, b: 1, c: 0 }
  },
  {
    id: 179,
    text: "Cuando cometo una torpeza social, yo puedo olvidarla pronto:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "C",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 180,
    text: "Me reconocen como un \"hombre de ideas\" porque siempre se me ocurren algunas cuando hay algún problema:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "M",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 181,
    text: "Yo creo que me muestro más:",
    options: { a: "Animado en reuniones de crítica y protesta", b: "Indeciso", c: "Tolerante a los deseos de otras personas" },
    factor: "E",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 182,
    text: "Me consideran como una persona muy entusiasta:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "F",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 183,
    text: "Prefiero un trabajo con variedad, viajes y cambios aunque tenga riesgos:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "H",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 184,
    text: "Soy una persona bastante estricta que insiste siempre en hacer las cosas tan correctamente como sea posible:",
    options: { a: "Cierto", b: "Intermedio", c: "Falso" },
    factor: "G",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 185,
    text: "Me agradan los trabajos que requieren concentración y habilidades precisas:",
    options: { a: "Sí", b: "Intermedio", c: "No" },
    factor: "G",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 186,
    text: "Me considero un tipo enérgico que se mantiene activo:",
    options: { a: "Sí", b: "Indeciso", c: "No" },
    factor: "G",
    scores: { a: 2, b: 1, c: 0 }
  },
  {
    id: 187,
    text: "Estoy seguro de haber contestado correctamente, y de no haber dejado ninguna pregunta sin contestar:",
    options: { a: "Sí", b: "Indeciso", c: "No" },
    factor: "VAL",
    scores: { a: 1, b: 0, c: 0 }
  }
];
