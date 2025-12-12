import { useState } from "react";
import {
  Calculator,
  CheckCircle,
  Package,
  Truck,
  Calendar,
} from "lucide-react";

export const CalculatorSection = () => {
  const [workType, setWorkType] = useState("reforma");
  const [size, setSize] = useState("");
  const [result, setResult] = useState<{
    volume: string;
    buckets: number;
    minBuckets: number;
  } | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!size) return;

    const factors: Record<string, number> = {
      reforma: 0.1,
      demolicao: 0.25,
      construcao: 0.08,
    };

    const volume = parseFloat(size) * factors[workType];
    const buckets = Math.ceil(volume / 4);

    setResult({
      volume: volume.toFixed(1),
      buckets: buckets,
      minBuckets: Math.max(buckets, 1),
    });
  };

  return (
    <div className="animate-fadeIn max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Calculator className="text-green-600" size={28} />
          Estimativa de Volume de Resíduos
        </h2>
        <p className="text-slate-500">
          Ferramenta de planejamento para gestão de resíduos de obra.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <form onSubmit={calculate} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">
                1. Categoria da Atividade
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  {
                    id: "reforma",
                    label: "Reforma",
                    desc: "Troca de piso, reparos",
                  },
                  {
                    id: "demolicao",
                    label: "Demolição",
                    desc: "Quebra de paredes",
                  },
                  { id: "construcao", label: "Construção", desc: "Obra nova" },
                ].map((type) => (
                  <label
                    key={type.id}
                    className={`block p-4 rounded border cursor-pointer transition relative
                      ${
                        workType === type.id
                          ? "border-green-600 bg-green-50 ring-1 ring-green-600"
                          : "border-slate-200 hover:border-green-400"
                      }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={type.id}
                      checked={workType === type.id}
                      onChange={(e) => setWorkType(e.target.value)}
                      className="hidden"
                    />
                    <div className="font-bold text-slate-900">{type.label}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      {type.desc}
                    </div>
                    {workType === type.id && (
                      <div className="absolute top-2 right-2 text-green-600">
                        <CheckCircle size={14} />
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">
                2. Área de Intervenção (m²)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  required
                  placeholder="0"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 border border-slate-300 rounded focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none text-lg font-mono"
                />
                <span className="absolute right-4 top-3.5 text-slate-400 font-bold">
                  m²
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded shadow-md transition flex items-center justify-center gap-2"
            >
              <Calculator size={18} />
              Processar Cálculo
            </button>
          </form>
        </div>

        <div className="lg:col-span-5">
          {!result ? (
            <div className="bg-slate-100 p-8 rounded-lg border border-slate-200 text-center h-full flex flex-col items-center justify-center min-h-75">
              <Package size={40} className="text-slate-400 mb-4" />
              <p className="text-slate-500 text-sm font-medium">
                Aguardando dados de entrada para estimativa.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm h-full flex flex-col">
              <div className="bg-slate-900 text-white p-6 rounded-t-lg">
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
                  Volume Calculado
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-mono font-bold text-green-400">
                    {result.volume}
                  </span>
                  <span className="text-lg text-slate-300">m³</span>
                </div>
              </div>

              <div className="p-6 grow space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded text-green-700">
                    <Truck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">
                      Equipamento Recomendado
                    </h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Necessário contratar{" "}
                      <strong className="text-slate-900">
                        {result.minBuckets} caçamba(s)
                      </strong>{" "}
                      padrão de 4m³.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded text-blue-700">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">
                      Prazo de Agendamento
                    </h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Solicite com 48h de antecedência para garantir
                      disponibilidade.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 border-t border-slate-200 text-xs text-slate-500 text-center">
                *Cálculo baseado em índices médios da indústria (SINDUSCON).
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
