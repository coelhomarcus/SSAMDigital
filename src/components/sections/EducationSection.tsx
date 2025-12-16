import { useState } from "react";
import {
  Construction,
  ArrowRight,
  Trash2,
  CheckCircle,
  Ban,
  XCircle,
  BookOpen,
  Layers,
  AlertTriangle,
  Recycle,
  Truck,
  FileText,
  Scale,
  Leaf,
  Info,
} from "lucide-react";

const wasteClasses = [
  {
    class: "A",
    name: "Reutilizáveis",
    color: "green",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700",
    iconBg: "bg-green-100",
    description: "Podem ser reutilizados ou reciclados como agregados",
    examples: ["Tijolos", "Blocos", "Concreto", "Argamassa", "Telhas", "Pisos cerâmicos"],
    destination: "Áreas de transbordo, reciclagem ou aterros de RCC Classe A",
  },
  {
    class: "B",
    name: "Recicláveis",
    color: "blue",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    iconBg: "bg-blue-100",
    description: "Recicláveis para outras destinações",
    examples: ["Plásticos", "Papéis", "Metais", "Vidros", "Madeiras", "Gesso"],
    destination: "Cooperativas de reciclagem ou áreas de armazenamento",
  },
  {
    class: "C",
    name: "Sem Destinação",
    color: "amber",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
    iconBg: "bg-amber-100",
    description: "Sem tecnologia de reciclagem economicamente viável",
    examples: ["Produtos de gesso contaminados", "Isopor sujo", "Espumas"],
    destination: "Armazenamento, transporte e destinação específica",
  },
  {
    class: "D",
    name: "Perigosos",
    color: "red",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700",
    iconBg: "bg-red-100",
    description: "Perigosos ou contaminados",
    examples: ["Tintas", "Solventes", "Óleos", "Amianto", "Lâmpadas fluorescentes"],
    destination: "Empresas licenciadas para tratamento de resíduos perigosos",
  },
];

const tips = [
  {
    icon: Layers,
    title: "Separe por Classe",
    description: "Organize os resíduos conforme sua classificação para facilitar a destinação correta.",
  },
  {
    icon: Truck,
    title: "Contrate Licenciados",
    description: "Utilize apenas transportadores e áreas de destino licenciadas pelo órgão ambiental.",
  },
  {
    icon: FileText,
    title: "Guarde Comprovantes",
    description: "Mantenha os CTRs (Controle de Transporte de Resíduos) por no mínimo 5 anos.",
  },
  {
    icon: Recycle,
    title: "Priorize a Reciclagem",
    description: "Materiais classe A e B podem ser reaproveitados, reduzindo custos e impacto ambiental.",
  },
];

export const EducationSection = () => {
  const [activeClass, setActiveClass] = useState<string>("A");

  return (
    <div className="animate-fadeIn space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl mb-4 shadow-lg">
          <BookOpen className="text-white" size={32} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Educação Ambiental
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Aprenda sobre a classificação, separação e destinação correta dos resíduos da construção civil.
        </p>
      </div>

      {/* What is RCC */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4 flex justify-between items-center">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Construction size={20} className="text-orange-400" />
            O que são RCC (Resíduos da Construção Civil)?
          </h3>
          <span className="text-xs font-mono bg-white/10 px-3 py-1 rounded-full text-slate-300">
            CONAMA 307/2002
          </span>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <p className="text-slate-700 mb-4 leading-relaxed">
                Resíduos da Construção Civil são os materiais provenientes de <span className="font-semibold">construções, reformas, reparos e demolições</span> de obras, incluindo os resultantes da preparação e escavação de terrenos para obras civis.
              </p>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Layers size={16} className="text-orange-500" />
                  Composição Típica
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "Tijolos", icon: "🧱" },
                    { name: "Concreto", icon: "🪨" },
                    { name: "Argamassa", icon: "�ite" },
                    { name: "Cerâmica", icon: "🔲" },
                    { name: "Madeira", icon: "🪵" },
                    { name: "Metais", icon: "🔩" },
                    { name: "Vidro", icon: "🪟" },
                    { name: "Gesso", icon: "⬜" },
                  ].map((item) => (
                    <span
                      key={item.name}
                      className="px-3 py-2 bg-white border border-slate-200 text-slate-700 text-sm rounded-lg font-medium flex items-center gap-2 hover:border-slate-300 transition"
                    >
                      <span>{item.icon}</span>
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-100">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="text-orange-600" size={20} />
                <span className="text-orange-700 font-bold text-sm uppercase tracking-wider">
                  Responsabilidade
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm font-bold text-slate-800 mb-3 bg-white px-4 py-2 rounded-lg">
                <span>Gerador</span>
                <ArrowRight className="text-orange-400" size={16} />
                <span>Transportador</span>
                <ArrowRight className="text-orange-400" size={16} />
                <span>Destino</span>
              </div>
              <p className="text-sm text-slate-600 text-center">
                O gerador é <span className="font-semibold">integralmente responsável</span> pela destinação adequada dos resíduos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Waste Classes */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Recycle size={20} />
            Classificação dos Resíduos (CONAMA 307)
          </h3>
        </div>
        <div className="p-6">
          {/* Class Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {wasteClasses.map((wc) => (
              <button
                key={wc.class}
                onClick={() => setActiveClass(wc.class)}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition flex items-center gap-2 ${
                  activeClass === wc.class
                    ? `${wc.bgColor} ${wc.textColor} ${wc.borderColor} border-2`
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 border-2 border-transparent"
                }`}
              >
                <span className={`w-6 h-6 rounded-full ${wc.iconBg} ${wc.textColor} flex items-center justify-center text-xs font-black`}>
                  {wc.class}
                </span>
                Classe {wc.class}
              </button>
            ))}
          </div>

          {/* Active Class Content */}
          {wasteClasses.map((wc) => (
            wc.class === activeClass && (
              <div key={wc.class} className={`${wc.bgColor} rounded-xl p-6 border ${wc.borderColor}`}>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`w-12 h-12 rounded-xl ${wc.iconBg} ${wc.textColor} flex items-center justify-center text-xl font-black`}>
                        {wc.class}
                      </span>
                      <div>
                        <h4 className={`text-xl font-bold ${wc.textColor}`}>
                          Classe {wc.class} - {wc.name}
                        </h4>
                        <p className="text-slate-600 text-sm">{wc.description}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-white/80 rounded-lg p-4">
                        <h5 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                          <Info size={14} />
                          Exemplos
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {wc.examples.map((ex) => (
                            <span key={ex} className="px-2 py-1 bg-white rounded text-xs font-medium text-slate-600 border border-slate-200">
                              {ex}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white/80 rounded-lg p-4">
                        <h5 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                          <Truck size={14} />
                          Destinação
                        </h5>
                        <p className="text-sm text-slate-600">{wc.destination}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      {/* What's Collected vs Not */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-green-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 font-bold flex items-center gap-2">
            <Trash2 size={20} />
            Coleta Pública Municipal
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-500 mb-4 flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              Serviço regular porta a porta
            </p>
            <ul className="space-y-3">
              {[
                { icon: "🍎", text: "Resíduos orgânicos (restos alimentares)" },
                { icon: "🧻", text: "Resíduos sanitários" },
                { icon: "📦", text: "Embalagens e recicláveis leves" },
                { icon: "🧹", text: "Resíduos de varrição domiciliar" },
                { icon: "🥫", text: "Latas e recipientes limpos" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-slate-700 text-sm font-medium">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-red-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-6 py-4 font-bold flex items-center gap-2">
            <Ban size={20} className="text-red-400" />
            NÃO Recolhido pela Prefeitura
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-500 mb-4 flex items-center gap-2">
              <XCircle size={16} className="text-red-500" />
              Proibido dispor para coleta comum
            </p>
            <ul className="space-y-3">
              {[
                { icon: "🧱", text: "Entulho e restos de obra" },
                { icon: "🛋️", text: "Móveis, colchões e sofás" },
                { icon: "📺", text: "Eletroeletrônicos e linha branca" },
                { icon: "⚠️", text: "Resíduos industriais e perigosos" },
                { icon: "🛢️", text: "Tintas, solventes e óleos" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 p-2 bg-red-50 rounded-lg">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-slate-700 text-sm font-medium">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-3">
            <Leaf className="text-green-400" size={18} />
            <span className="text-green-400 text-sm font-medium">Boas Práticas</span>
          </div>
          <h3 className="text-2xl font-bold text-white">
            Dicas para Gestão Correta
          </h3>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/15 transition">
                <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-green-400" size={24} />
                </div>
                <h4 className="font-bold text-white mb-2">{tip.title}</h4>
                <p className="text-slate-400 text-sm">{tip.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legal Reference */}
      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
        <div className="flex items-start gap-4">
          <div className="bg-slate-200 p-3 rounded-lg">
            <Scale className="text-slate-600" size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-1">Base Legal</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              As normas de gestão de resíduos da construção civil são regulamentadas pela{" "}
              <span className="font-semibold">Resolução CONAMA nº 307/2002</span> e suas alterações, 
              além da <span className="font-semibold">Política Nacional de Resíduos Sólidos (Lei nº 12.305/2010)</span>. 
              Municípios podem estabelecer regras complementares mais restritivas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
