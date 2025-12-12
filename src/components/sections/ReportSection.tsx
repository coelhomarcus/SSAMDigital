import { useState } from "react";
import { FileWarning, CheckCircle } from "lucide-react";

const neighborhoods = [
  "Nova Marabá",
  "Cidade Nova",
  "Núcleo Pioneiro",
  "São Félix",
  "Morada Nova",
  "Liberdade",
];

export const ReportSection = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="bg-white border-l-4 border-green-600 rounded shadow-sm p-10 max-w-2xl mx-auto mt-10 animate-fadeIn">
        <div className="flex flex-col items-center text-center">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <CheckCircle className="text-green-600 h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Protocolo Registrado
          </h2>
          <p className="text-slate-600 mb-6">
            Sua solicitação foi encaminhada ao departamento de fiscalização sob
            o número{" "}
            <strong className="font-mono text-slate-900">#MB2024-8892</strong>.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-green-700 font-bold hover:underline text-sm"
          >
            Registrar nova ocorrência
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fadeIn">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-red-50 px-8 py-6 border-b border-red-100 flex items-start gap-4">
          <div className="bg-white p-2 rounded text-red-600 shadow-sm">
            <FileWarning size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-red-700">
              Canal de Denúncia
            </h2>
            <p className="text-red-600/80 text-sm">
              Reporte irregularidades ambientais. O sigilo é garantido.
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="p-8 space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                Bairro / Setor
              </label>
              <select className="w-full p-3 bg-slate-50 border border-slate-300 rounded focus:border-slate-500 focus:ring-0 outline-none text-slate-700">
                <option value="">Selecione...</option>
                {neighborhoods.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                Ponto de Referência
              </label>
              <input
                required
                type="text"
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded focus:border-slate-500 focus:ring-0 outline-none text-slate-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-3">
              Natureza da Infração
            </label>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "Obstrução de Calçada (Entulho)",
                "Descarte em Terreno Baldio",
                "Queimada de Resíduos",
                "Caçamba Irregular",
              ].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 p-3 border border-slate-200 rounded hover:bg-slate-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="type"
                    className="accent-red-600 h-4 w-4"
                  />
                  <span className="text-sm text-slate-700 font-medium">
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
              Evidência Fotográfica
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded p-8 text-center hover:bg-slate-50 cursor-pointer transition group">
              <div className="text-slate-400 group-hover:text-slate-600 flex flex-col items-center">
                <span className="text-sm font-medium">
                  Arraste arquivos ou clique para upload
                </span>
                <span className="text-xs mt-1">
                  Formatos aceitos: JPG, PNG (Max 5MB)
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded shadow-sm transition"
            >
              Enviar Relatório
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
