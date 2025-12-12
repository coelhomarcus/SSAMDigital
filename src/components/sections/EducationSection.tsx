import {
  Construction,
  ArrowRight,
  Trash2,
  CheckCircle,
  Ban,
  XCircle,
} from "lucide-react";

export const EducationSection = () => (
  <div className="animate-fadeIn space-y-10">
    <div className="border-b border-slate-200 pb-6">
      <h2 className="text-3xl font-extrabold text-slate-900">
        Normas de Descarte
      </h2>
      <p className="text-slate-500 mt-2">
        Especificações técnicas para a separação e destino final de resíduos.
      </p>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Construction size={20} className="text-orange-500" />
          Definição de RCC (Resíduos da Construção Civil)
        </h3>
        <span className="text-xs font-mono bg-slate-200 px-2 py-1 rounded text-slate-600">
          CONAMA 307
        </span>
      </div>
      <div className="p-8 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-slate-700 mb-6 leading-relaxed">
            RCC são os resíduos provenientes de construções, reformas, reparos e
            demolições de obras de construção civil, e os resultantes da
            preparação e da escavação de terrenos.
          </p>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
            Composição Típica
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              "Tijolos",
              "Blocos",
              "Concreto",
              "Argamassa",
              "Solo",
              "Madeira",
              "Metais",
            ].map((item) => (
              <span
                key={item}
                className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-sm rounded font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-6 border border-orange-100 flex flex-col items-center text-center">
          <span className="text-orange-600 font-bold uppercase text-xs tracking-wider mb-2">
            Fluxo de Responsabilidade
          </span>
          <div className="flex items-center gap-3 text-lg font-bold text-slate-800 mb-2">
            <span>Gerador</span> <ArrowRight className="text-slate-400" />{" "}
            <span>Transportador</span>
          </div>
          <p className="text-sm text-slate-600">
            O gerador (proprietário da obra) é integralmente responsável pela
            contratação de caçambas estacionárias licenciadas.
          </p>
        </div>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg border border-green-200 shadow-sm">
        <div className="bg-green-600 text-white px-6 py-3 font-bold flex items-center gap-2">
          <Trash2 size={20} />
          Coleta Pública Municipal
        </div>
        <div className="p-6">
          <p className="text-sm text-slate-500 mb-4">
            Serviço regular porta a porta.
          </p>
          <ul className="space-y-3">
            {[
              "Resíduos orgânicos (restos alimentares)",
              "Resíduos sanitários",
              "Embalagens e recicláveis leves",
              "Resíduos de varrição domiciliar",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="text-green-600 shrink-0" size={18} />
                <span className="text-slate-700 text-sm font-medium">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-red-200 shadow-sm">
        <div className="bg-slate-800 text-white px-6 py-3 font-bold flex items-center gap-2">
          <Ban size={20} className="text-red-400" />
          Não Recolhido pela Prefeitura
        </div>
        <div className="p-6">
          <p className="text-sm text-slate-500 mb-4">
            Proibido dispor para coleta comum.
          </p>
          <ul className="space-y-3">
            {[
              "Entulho e restos de obra",
              "Móveis, colchões e sofás",
              "Eletroeletrônicos e linha branca",
              "Resíduos industriais e perigosos",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <XCircle className="text-red-600 shrink-0" size={18} />
                <span className="text-slate-700 text-sm font-medium">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);
