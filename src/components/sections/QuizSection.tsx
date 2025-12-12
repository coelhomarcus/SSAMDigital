import { useState } from "react";
import {
  ClipboardCheck,
  CheckCircle,
  Info,
  RefreshCw,
  ArrowRight,
  Award,
} from "lucide-react";

export const QuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const questions = [
    {
      question:
        "Quem é responsável pelo entulho gerado em uma obra particular?",
      options: [
        "A Prefeitura",
        "O Gerador (Dono da obra)",
        "O vizinho",
        "Ninguém",
      ],
      correct: 1,
      explanation:
        "O gerador é legalmente responsável pela destinação correta dos resíduos de sua obra.",
    },
    {
      question: "Onde é permitido descartar entulho de construção?",
      options: [
        "Terrenos baldios",
        "Na calçada",
        "Em caçambas licenciadas",
        "No lixo comum",
      ],
      correct: 2,
      explanation:
        "Apenas empresas licenciadas podem transportar entulho para aterros apropriados.",
    },
    {
      question: "O que acontece se você deixar entulho na calçada?",
      options: [
        "Nada",
        "A prefeitura recolhe de graça",
        "Gera multa por obstrução",
        "Ajuda a nivelar a rua",
      ],
      correct: 2,
      explanation:
        "Obstruir o passeio público é infração sujeita a multa imediata.",
    },
    {
      question:
        "Posso jogar restos de tijolo no lixo doméstico (caminhão compactador)?",
      options: [
        "Sim, se for pouco",
        "Não, estraga o caminhão",
        "Sim, se estiver ensacado",
        "Talvez",
      ],
      correct: 1,
      explanation:
        "Materiais duros danificam o sistema hidráulico dos caminhões de lixo comum.",
    },
    {
      question: "Para que servem os Ecopontos Municipais?",
      options: [
        "Para grandes construtoras",
        "Para descarte de pequenos volumes (até 1m³)",
        "Para lixo hospitalar",
        "Para festas",
      ],
      correct: 1,
      explanation:
        "Ecopontos são destinados a pequenos geradores, recebendo até 1m³ de resíduos gratuitamente.",
    },
    {
      question: "Queimar lixo ou entulho no quintal é:",
      options: [
        "Uma forma de limpeza",
        "Crime ambiental",
        "Permitido no verão",
        "Bom para o solo",
      ],
      correct: 1,
      explanation:
        "Queimadas urbanas são crimes ambientais e prejudicam a saúde pública.",
    },
    {
      question: "Como descartar sofás e móveis velhos?",
      options: [
        "Jogar no rio",
        "Deixar na esquina",
        "Contratar caçamba ou levar ao Ecoponto",
        "Queimar",
      ],
      correct: 2,
      explanation:
        "Móveis velhos são volumosos e devem ter destinação específica, não podendo ir para o lixo comum.",
    },
    {
      question: "Qual o risco de acumular entulho em terrenos?",
      options: [
        "Nenhum",
        "Atrai animais peçonhentos e mosquitos",
        "Valoriza o terreno",
        "Melhora a drenagem",
      ],
      correct: 1,
      explanation:
        "Entulho acumulado vira abrigo para escorpiões, ratos e foco de dengue.",
    },
    {
      question: "O que fazer ao ver alguém descartando entulho irregularmente?",
      options: [
        "Ajudar a descarregar",
        "Ignorar",
        "Denunciar aos órgãos competentes",
        "Jogar mais lixo",
      ],
      correct: 2,
      explanation:
        "A fiscalização colaborativa é essencial. Denuncie pelo canal oficial.",
    },
    {
      question: "Qual prazo ideal para pedir uma caçamba antes da obra?",
      options: [
        "No dia que começar",
        "48 horas antes",
        "Depois que terminar",
        "Uma semana depois",
      ],
      correct: 1,
      explanation:
        "O planejamento evita que o entulho fique exposto na rua aguardando a caçamba.",
    },
  ];

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto animate-fadeIn bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 text-white p-8 text-center">
          <div className="inline-block p-4 rounded-full bg-slate-800 mb-4">
            <Award size={48} className="text-yellow-400" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Resultado Final</h2>
          <div className="text-6xl font-bold text-green-400 mb-4">
            {score} <span className="text-2xl text-slate-400">/ 10</span>
          </div>
          <p className="text-slate-300">
            {score >= 8
              ? "Parabéns! Você é um cidadão exemplar."
              : score >= 5
              ? "Bom trabalho, mas atenção a alguns detalhes."
              : "Precisamos reforçar alguns conceitos importantes."}
          </p>
        </div>

        <div className="p-8">
          <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
            <Info className="text-blue-500" /> Dicas Importantes para Memorizar:
          </h3>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
              <CheckCircle className="text-green-600 shrink-0 mt-1" size={18} />
              <span className="text-slate-700 text-sm">
                <strong>Planejamento:</strong> Sempre contrate a caçamba ANTES
                de gerar o entulho.
              </span>
            </li>
            <li className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
              <CheckCircle className="text-green-600 shrink-0 mt-1" size={18} />
              <span className="text-slate-700 text-sm">
                <strong>Separação:</strong> Não misture gesso, madeira e
                plástico com alvenaria (tijolo/concreto). Isso encarece a
                reciclagem.
              </span>
            </li>
            <li className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
              <CheckCircle className="text-green-600 shrink-0 mt-1" size={18} />
              <span className="text-slate-700 text-sm">
                <strong>Volume:</strong> Se a reforma for pequena (menos de
                1m³), use os Ecopontos da cidade.
              </span>
            </li>
          </ul>

          <button
            onClick={restartQuiz}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded shadow-md transition flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} />
            Refazer Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
          <ClipboardCheck className="text-green-600" />
          Quiz de Conscientização
        </h2>
        <p className="text-slate-500 text-sm">
          Teste seus conhecimentos sobre limpeza urbana e legislação.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2">
          <div
            className="bg-green-600 h-2 transition-all duration-300"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>

        <div className="p-8">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Questão {currentQuestion + 1} de {questions.length}
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-2 mb-6">
            {questions[currentQuestion].question}
          </h3>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => {
              let buttonStyle =
                "border-slate-200 hover:bg-slate-50 hover:border-slate-300";

              if (isAnswered) {
                if (index === questions[currentQuestion].correct) {
                  buttonStyle =
                    "bg-green-100 border-green-500 text-green-800 font-bold";
                } else if (index === selectedOption) {
                  buttonStyle = "bg-red-100 border-red-500 text-red-800";
                } else {
                  buttonStyle = "border-slate-200 opacity-50";
                }
              } else if (selectedOption === index) {
                buttonStyle = "border-slate-400 bg-slate-100";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${buttonStyle}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="mt-6 pt-6 border-t border-slate-100 animate-fadeIn">
              <div
                className={`p-4 rounded-lg mb-4 text-sm ${
                  selectedOption === questions[currentQuestion].correct
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                <strong>
                  {selectedOption === questions[currentQuestion].correct
                    ? "Correto!"
                    : "Incorreto."}
                </strong>{" "}
                {questions[currentQuestion].explanation}
              </div>
              <button
                onClick={nextQuestion}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded shadow-sm flex items-center justify-center gap-2"
              >
                {currentQuestion < questions.length - 1
                  ? "Próxima Pergunta"
                  : "Ver Resultado"}{" "}
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
