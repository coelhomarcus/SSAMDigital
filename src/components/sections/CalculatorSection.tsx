import { useState } from "react";
import {
  Calculator,
  CheckCircle,
  Package,
  Truck,
  Calendar,
  Hammer,
  Building2,
  Wrench,
  Info,
  DollarSign,
  Clock,
  AlertCircle,
  RotateCcw,
  Sparkles,
} from "lucide-react";

interface CalculationResult {
  volume: number;
  buckets: number;
  minBuckets: number;
  estimatedCost: { min: number; max: number };
  duration: string;
}

const workTypes = [
  {
    id: "reforma",
    label: "Reforma",
    description: "Troca de piso, reparos gerais, pintura",
    icon: Wrench,
    factor: 0.1,
    color: "amber",
  },
  {
    id: "demolicao",
    label: "Demolição",
    description: "Quebra de paredes, remoção de estruturas",
    icon: Hammer,
    factor: 0.25,
    color: "red",
  },
  {
    id: "construcao",
    label: "Construção",
    description: "Obra nova, ampliação, fundação",
    icon: Building2,
    factor: 0.08,
    color: "blue",
  },
];

const sizePresets = [
  { label: "Banheiro", value: 6, icon: "🚿" },
  { label: "Quarto", value: 15, icon: "🛏️" },
  { label: "Sala", value: 25, icon: "🛋️" },
  { label: "Cozinha", value: 12, icon: "🍳" },
  { label: "Casa pequena", value: 70, icon: "🏠" },
  { label: "Casa média", value: 150, icon: "🏡" },
];

export const CalculatorSection = () => {
  const [workType, setWorkType] = useState("reforma");
  const [size, setSize] = useState("");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!size) return;

    setIsCalculating(true);
    
    // Simular processamento
    await new Promise((resolve) => setTimeout(resolve, 800));

    const selectedType = workTypes.find((t) => t.id === workType);
    const factor = selectedType?.factor || 0.1;
    
    const volume = parseFloat(size) * factor;
    const buckets = Math.ceil(volume / 4);
    const minBuckets = Math.max(buckets, 1);

    // Estimativa de custo (valores fictícios para demonstração)
    const costPerBucket = { min: 180, max: 280 };
    
    setResult({
      volume,
      buckets,
      minBuckets,
      estimatedCost: {
        min: minBuckets * costPerBucket.min,
        max: minBuckets * costPerBucket.max,
      },
      duration: minBuckets <= 2 ? "1-2 dias" : minBuckets <= 4 ? "3-5 dias" : "7+ dias",
    });
    
    setIsCalculating(false);
  };

  const reset = () => {
    setSize("");
    setResult(null);
  };

  const applyPreset = (value: number) => {
    setSize(value.toString());
  };

  const selectedType = workTypes.find((t) => t.id === workType);

  return (
    <div className="animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg">
          <Calculator className="text-white" size={32} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Calculadora de Entulho
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto">
          Estime o volume de resíduos da sua obra e saiba quantas caçambas você vai precisar.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={calculate} className="space-y-6">
            {/* Work Type Selection */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wide mb-4">
                <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">1</span>
                Tipo de Obra
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {workTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = workType === type.id;
                  return (
                    <label
                      key={type.id}
                      className={`relative block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? `border-${type.color}-500 bg-${type.color}-50 shadow-md`
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={type.id}
                        checked={isSelected}
                        onChange={(e) => setWorkType(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          isSelected 
                            ? `bg-${type.color}-100 text-${type.color}-600` 
                            : "bg-slate-100 text-slate-500"
                        }`}>
                          <Icon size={20} />
                        </div>
                        <div className="flex-1">
                          <div className={`font-bold ${isSelected ? `text-${type.color}-700` : "text-slate-800"}`}>
                            {type.label}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {type.description}
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <div className={`absolute top-2 right-2 text-${type.color}-500`}>
                          <CheckCircle size={18} />
                        </div>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Size Input */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wide mb-4">
                <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">2</span>
                Área de Intervenção
              </label>
              
              {/* Presets */}
              <div className="mb-4">
                <p className="text-xs text-slate-500 mb-2">Tamanhos comuns (clique para preencher):</p>
                <div className="flex flex-wrap gap-2">
                  {sizePresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => applyPreset(preset.value)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                        size === preset.value.toString()
                          ? "bg-green-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {preset.icon} {preset.label} ({preset.value}m²)
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="10000"
                  required
                  placeholder="Digite a área em m²"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full pl-4 pr-16 py-4 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none text-xl font-mono transition"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">
                  m²
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isCalculating || !size}
              className={`w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-3 ${
                isCalculating || !size ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isCalculating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Calculando...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Calcular Volume
                </>
              )}
            </button>
          </form>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
            <Info className="text-blue-600 shrink-0 mt-0.5" size={18} />
            <div className="text-sm text-blue-700">
              <p className="font-semibold">Como funciona o cálculo?</p>
              <p className="mt-1 text-blue-600">
                Usamos índices médios da indústria (SINDUSCON) para estimar o volume de resíduos 
                gerados por m² de área trabalhada, variando conforme o tipo de obra.
              </p>
            </div>
          </div>
        </div>

        {/* Result Section */}
        <div className="lg:col-span-5">
          {!result ? (
            <div className="bg-gradient-to-br from-slate-100 to-slate-50 p-8 rounded-2xl border border-slate-200 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                <Package size={40} className="text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-2">
                Resultado aparecerá aqui
              </h3>
              <p className="text-slate-500 text-sm max-w-xs">
                Selecione o tipo de obra e informe a área para ver a estimativa de volume e caçambas.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden">
              {/* Result Header */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                    Resultado do Cálculo
                  </h3>
                  <button
                    onClick={reset}
                    className="text-slate-400 hover:text-white transition flex items-center gap-1 text-xs"
                  >
                    <RotateCcw size={14} />
                    Novo cálculo
                  </button>
                </div>
                <div className="flex items-end gap-3">
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                    {result.volume.toFixed(1)}
                  </span>
                  <span className="text-2xl text-slate-300 mb-1">m³</span>
                </div>
                <p className="text-slate-400 text-sm mt-2">
                  de resíduos estimados para {selectedType?.label.toLowerCase()}
                </p>
              </div>

              {/* Result Details */}
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="bg-green-100 p-3 rounded-lg text-green-600">
                    <Truck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Caçambas Necessárias</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      <span className="text-2xl font-black text-green-600">{result.minBuckets}</span>
                      {" "}caçamba{result.minBuckets > 1 ? "s" : ""} de 4m³
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <div className="bg-amber-100 p-3 rounded-lg text-amber-600">
                    <DollarSign size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Custo Estimado</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      <span className="text-lg font-bold text-amber-600">
                        R$ {result.estimatedCost.min.toLocaleString()} - R$ {result.estimatedCost.max.toLocaleString()}
                      </span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      *Valores aproximados para região de Marabá
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <Clock size={18} className="text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Duração estimada</p>
                      <p className="font-bold text-slate-800 text-sm">{result.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <Calendar size={18} className="text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Antecedência</p>
                      <p className="font-bold text-slate-800 text-sm">48 horas</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-slate-50 p-4 border-t border-slate-100">
                <div className="flex items-start gap-2">
                  <AlertCircle size={14} className="text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-500">
                    Valores baseados em índices médios. O volume real pode variar conforme 
                    características específicas da obra.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
