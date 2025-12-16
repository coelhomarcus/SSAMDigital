import { useState } from "react";
import { ChevronDown, Search, HelpCircle, FileText, Truck, AlertTriangle, Recycle, Building2, Clock } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const categories = [
  { id: "all", label: "Todas", icon: HelpCircle },
  { id: "geral", label: "Geral", icon: FileText },
  { id: "descarte", label: "Descarte", icon: Truck },
  { id: "penalidades", label: "Penalidades", icon: AlertTriangle },
  { id: "reciclagem", label: "Reciclagem", icon: Recycle },
  { id: "empresas", label: "Empresas", icon: Building2 },
];

const faqs: FAQ[] = [
  {
    category: "geral",
    question: "A prefeitura realiza a coleta de entulho de obras particulares?",
    answer:
      "Não. Conforme a legislação municipal vigente, a responsabilidade pela destinação final de resíduos da construção civil (RCC) gerados em obras particulares é inteiramente do gerador.",
  },
  {
    category: "descarte",
    question: "É permitido dispor resíduos de construção junto ao lixo domiciliar?",
    answer:
      "Estritamente proibido. O descarte de materiais abrasivos ou pesados (tijolos, concreto) em sacos de lixo comum danifica os compactadores hidráulicos dos caminhões de coleta e coloca em risco a segurança dos coletores.",
  },
  {
    category: "geral",
    question: "Qual o procedimento para denúncia de descarte irregular?",
    answer:
      "O cidadão deve utilizar o canal oficial de denúncias (nesta plataforma ou via telefone 156), fornecendo endereço completo e, se possível, evidências fotográficas. A identidade do denunciante é preservada.",
  },
  {
    category: "descarte",
    question: "Existe local para descarte de pequenos volumes sem custo?",
    answer:
      "Sim. Para volumes de até 1m³ (um metro cúbico), o cidadão pode utilizar os Ecopontos Municipais. Consulte o mapa de Ecopontos na seção de informações.",
  },
  {
    category: "reciclagem",
    question: "Como são classificados os resíduos da construção civil?",
    answer:
      "Os RCC são divididos em classes: Classe A (concreto, argamassa, tijolos - recicláveis), Classe B (plásticos, papéis, metais, vidros), Classe C (gesso e outros sem tecnologia de reciclagem disponível) e Classe D (tintas, solventes, óleos - perigosos).",
  },
  {
    category: "penalidades",
    question: "Qual a multa para descarte irregular de entulho?",
    answer:
      "As multas variam conforme a gravidade da infração, podendo chegar a valores significativos para pessoas físicas e jurídicas. Além da multa, o infrator é obrigado a realizar a limpeza da área afetada às suas custas.",
  },
  {
    category: "descarte",
    question: "Como funciona o aluguel de caçambas estacionárias?",
    answer:
      "O cidadão deve contratar uma empresa licenciada pela prefeitura. A caçamba pode permanecer na via pública por até 72 horas, devendo estar sinalizada e posicionada conforme as normas de trânsito. A empresa é responsável pela destinação correta dos resíduos.",
  },
  {
    category: "penalidades",
    question: "Posso queimar resíduos de construção no meu terreno?",
    answer:
      "Absolutamente não. A queima de qualquer tipo de resíduo é proibida por lei e pode resultar em multas ambientais severas, além de representar risco de incêndio e danos à saúde pública pela emissão de gases tóxicos.",
  },
  {
    category: "reciclagem",
    question: "O que fazer com materiais recicláveis da obra?",
    answer:
      "Materiais como metais, plásticos, papelão e vidros limpos podem ser separados e encaminhados para cooperativas de reciclagem. Alguns Ecopontos também aceitam esses materiais separadamente.",
  },
  {
    category: "descarte",
    question: "Como descartar materiais perigosos como tintas e solventes?",
    answer:
      "Materiais classificados como Classe D (perigosos) devem ser entregues em pontos de coleta especializados ou empresas licenciadas para tratamento de resíduos perigosos. Nunca descarte no lixo comum ou em terrenos baldios.",
  },
  {
    category: "geral",
    question: "Qual o horário de funcionamento dos Ecopontos?",
    answer:
      "Os Ecopontos municipais funcionam de segunda a sábado, sendo a maioria das 7h às 17h. Consulte os horários específicos de cada unidade na seção de informações desta plataforma.",
  },
  {
    category: "empresas",
    question: "Empresas de construção têm obrigações específicas?",
    answer:
      "Sim. Construtoras e empreiteiras devem apresentar Plano de Gerenciamento de Resíduos (PGRCC) para obras acima de 300m², manter controle de transporte (CTR) e comprovar destinação adequada de todos os resíduos gerados.",
  },
  {
    category: "empresas",
    question: "O que é o CTR (Controle de Transporte de Resíduos)?",
    answer:
      "O CTR é um documento obrigatório que acompanha o transporte de resíduos da construção civil. Ele identifica a origem, o transportador e o destino final dos resíduos, garantindo a rastreabilidade e o cumprimento das normas ambientais.",
  },
  {
    category: "reciclagem",
    question: "O entulho reciclado pode ser reutilizado em obras?",
    answer:
      "Sim. Agregados reciclados de Classe A podem ser utilizados em diversas aplicações como base de pavimentação, contra-piso, blocos de concreto e argamassas. O uso de materiais reciclados é incentivado e regulamentado por normas técnicas.",
  },
  {
    category: "penalidades",
    question: "O que acontece se eu for flagrado descartando entulho irregularmente?",
    answer:
      "O infrator pode ser autuado imediatamente pelos agentes de fiscalização. As penalidades incluem multa, apreensão do veículo (se aplicável), obrigação de limpeza da área e possível responsabilização criminal por crime ambiental.",
  },
  {
    category: "geral",
    question: "Como acompanhar uma denúncia realizada?",
    answer:
      "Após registrar a denúncia, você receberá um número de protocolo. Use-o para acompanhar o andamento através desta plataforma ou pelo telefone 156. O prazo médio de análise é de 5 a 10 dias úteis.",
  },
];

export const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "all") return faqs.length;
    return faqs.filter((faq) => faq.category === categoryId).length;
  };

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg">
          <HelpCircle className="text-white" size={32} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Central de Ajuda
        </h2>
        <p className="text-slate-500 max-w-lg mx-auto">
          Encontre respostas para as dúvidas mais frequentes sobre gestão de resíduos da construção civil.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Buscar pergunta ou palavra-chave..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none text-slate-700 transition shadow-sm"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => {
          const Icon = category.icon;
          const count = getCategoryCount(category.id);
          const isActive = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                isActive
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-green-300 hover:bg-green-50"
              }`}
            >
              <Icon size={16} />
              {category.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                isActive ? "bg-white/20" : "bg-slate-100"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results Count */}
      {searchTerm && (
        <p className="text-sm text-slate-500 mb-4">
          {filteredFaqs.length} {filteredFaqs.length === 1 ? "resultado encontrado" : "resultados encontrados"} para "{searchTerm}"
        </p>
      )}

      {/* FAQ List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <div className="text-slate-400 mb-3">
              <Search size={48} className="mx-auto opacity-50" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-1">
              Nenhum resultado encontrado
            </h3>
            <p className="text-slate-500 text-sm">
              Tente buscar por outras palavras-chave ou altere os filtros.
            </p>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const category = categories.find((c) => c.id === faq.category);
            const CategoryIcon = category?.icon || HelpCircle;

            return (
              <div
                key={index}
                className={`bg-white rounded-xl border overflow-hidden transition-all ${
                  isOpen
                    ? "border-green-500 shadow-md ring-2 ring-green-500/20"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-start gap-4 p-5 text-left"
                >
                  <div className={`p-2 rounded-lg shrink-0 ${
                    isOpen ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-500"
                  }`}>
                    <CategoryIcon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-base ${
                      isOpen ? "text-green-700" : "text-slate-800"
                    }`}>
                      {faq.question}
                    </h3>
                    <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
                      isOpen 
                        ? "bg-green-100 text-green-700" 
                        : "bg-slate-100 text-slate-500"
                    }`}>
                      {category?.label}
                    </span>
                  </div>
                  <ChevronDown
                    className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-green-500" : ""
                    }`}
                    size={20}
                  />
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-5 pb-5 pt-0 ml-14">
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Help Footer */}
      <div className="mt-10 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Clock className="text-green-400" size={20} />
          <span className="text-green-400 text-sm font-medium">Atendimento: Seg-Sex, 8h às 18h</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          Não encontrou o que procurava?
        </h3>
        <p className="text-slate-400 mb-6 text-sm">
          Nossa equipe está pronta para ajudar você com qualquer dúvida.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:156"
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            📞 Ligue 156
          </a>
          <a
            href="mailto:ssam@maraba.pa.gov.br"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-lg transition border border-white/20"
          >
            ✉️ Enviar e-mail
          </a>
        </div>
      </div>
    </div>
  );
};
