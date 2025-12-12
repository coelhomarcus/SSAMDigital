import { ChevronDown } from "lucide-react";

export const FAQSection = () => {
  const faqs = [
    {
      question:
        "A prefeitura realiza a coleta de entulho de obras particulares?",
      answer:
        "Não. Conforme a legislação municipal vigente, a responsabilidade pela destinação final de resíduos da construção civil (RCC) gerados em obras particulares é inteiramente do gerador.",
    },
    {
      question:
        "É permitido dispor resíduos de construção junto ao lixo domiciliar?",
      answer:
        "Estritamente proibido. O descarte de materiais abrasivos ou pesados (tijolos, concreto) em sacos de lixo comum danifica os compactadores hidráulicos dos caminhões de coleta e coloca em risco a segurança dos coletores.",
    },
    {
      question: "Qual o procedimento para denúncia de descarte irregular?",
      answer:
        "O cidadão deve utilizar o canal oficial de denúncias (nesta plataforma ou via telefone 156), fornecendo endereço completo e, se possível, evidências fotográficas. A identidade do denunciante é preservada.",
    },
    {
      question: "Existe local para descarte de pequenos volumes sem custo?",
      answer:
        "Sim. Para volumes de até 1m³ (um metro cúbico), o cidadão pode utilizar os Ecopontos Municipais. Consulte o mapa de Ecopontos na seção de informações.",
    },
  ];

  return (
    <div className="animate-fadeIn max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-slate-900">
          Perguntas Frequentes
        </h2>
        <p className="text-slate-500">
          Base de conhecimento para dúvidas operacionais e legais.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group bg-white rounded border border-slate-200 overflow-hidden cursor-pointer open:ring-2 open:ring-green-500/20"
          >
            <summary className="flex items-center justify-between p-5 list-none bg-white hover:bg-slate-50 transition">
              <span className="font-bold text-slate-800 text-sm md:text-base group-hover:text-green-700">
                {faq.question}
              </span>
              <ChevronDown
                className="text-slate-400 group-open:rotate-180 transition-transform"
                size={18}
              />
            </summary>
            <div className="px-5 pb-5 pt-2 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};
