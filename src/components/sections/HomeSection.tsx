import {
  AlertTriangle,
  Construction,
  CheckCircle,
  Calculator,
  ClipboardCheck,
  ArrowRight,
  Calendar,
  MapPin,
  Clock,
  ShieldCheck,
  Info,
  Timer,
  Banknote,
  Truck,
} from "lucide-react";
import { InfoCard } from "../ui/InfoCard";
import { StatCard } from "../ui/StatCard";

interface HomeSectionProps {
  changeTab: (tab: string) => void;
}

export const HomeSection = ({ changeTab }: HomeSectionProps) => {
  const ecopontos = [
    {
      name: "Ecoponto Folha 33",
      address: "Av. VP-8, Folha 33, Nova Marabá",
      hours: "08:00 - 18:00",
    },
    {
      name: "Ecoponto Cidade Nova",
      address: "Av. Paraíso, Próx. Aeroporto",
      hours: "08:00 - 17:00",
    },
    {
      name: "Ecoponto Liberdade",
      address: "Rua Rio de Janeiro, Bairro Liberdade",
      hours: "07:00 - 17:00",
    },
  ];

  const companies = [
    {
      name: "Caçambas Marabá Express",
      phone: "(94) 99111-0001",
      location: "Nova Marabá",
    },
    {
      name: "Transamazônica Entulhos",
      phone: "(94) 99222-0002",
      location: "Cidade Nova",
    },
    {
      name: "Disk Entulho Pioneiro",
      phone: "(94) 99333-0003",
      location: "Núcleo Pioneiro",
    },
    {
      name: "Recicla Obras Ltda",
      phone: "(94) 98111-1234",
      location: "Distrito Industrial",
    },
  ];

  const schedule = [
    {
      zone: "Zona A",
      neighborhoods: "Nova Marabá (Folhas), km 07",
      days: "Seg / Qua / Sex",
      shift: "Diurno (A partir das 07h)",
    },
    {
      zone: "Zona B",
      neighborhoods: "Cidade Nova, Laranjeiras",
      days: "Ter / Qui / Sáb",
      shift: "Diurno (A partir das 07h)",
    },
    {
      zone: "Zona C",
      neighborhoods: "Núcleo Pioneiro, Marabá Pioneira",
      days: "Seg / Qua / Sex",
      shift: "Noturno (A partir das 18h)",
    },
    {
      zone: "Zona D",
      neighborhoods: "São Félix, Morada Nova",
      days: "Ter / Qui / Sáb",
      shift: "Noturno (A partir das 18h)",
    },
  ];

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Hero Block */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-12 flex flex-col justify-center bg-linear-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Truck size={200} />
            </div>

            <div className="relative z-10">
              <div className="inline-block bg-green-600 text-white text-xs font-bold px-2 py-1 rounded mb-4 uppercase tracking-widest">
                Conscientização Pública
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                Gestão Inteligente de{" "}
                <span className="text-green-400">Resíduos Sólidos</span>
              </h1>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-md">
                A limpeza urbana é responsabilidade compartilhada. Saiba
                diferenciar lixo doméstico de entulho e evite sanções legais.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => changeTab("calculator")}
                  className="bg-green-600 text-white px-6 py-3 rounded font-bold hover:bg-green-500 transition shadow-lg flex items-center justify-center gap-2 group"
                >
                  <Calculator size={18} />
                  Calculadora de Entulho
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
                <button
                  onClick={() => changeTab("quiz")}
                  className="bg-transparent border-2 border-slate-600 text-slate-300 px-6 py-3 rounded font-bold hover:bg-slate-700 hover:text-white transition flex items-center justify-center gap-2"
                >
                  <ClipboardCheck size={18} />
                  Quiz Educativo
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-8 md:p-12 flex flex-col justify-center">
            <InfoCard
              icon={<AlertTriangle size={24} />}
              iconBgColor="bg-yellow-100"
              iconTextColor="text-yellow-700"
              title="Evite Autuações"
              description="O descarte em vias públicas gera multa imediata conforme Lei Municipal nº 1234/20."
            />

            <div className="w-full h-px bg-slate-200 my-6"></div>

            <InfoCard
              icon={<Construction size={24} />}
              iconBgColor="bg-blue-100"
              iconTextColor="text-blue-700"
              title="Responsabilidade do Gerador"
              description="Resíduos de construção civil (RCC) classe A, B, C e D são de responsabilidade privada."
            />

            <div className="w-full h-px bg-slate-200 my-6"></div>

            <InfoCard
              icon={<CheckCircle size={24} />}
              iconBgColor="bg-green-100"
              iconTextColor="text-green-700"
              title="Coleta Domiciliar"
              description="O serviço público recolhe apenas resíduos sólidos domiciliares (RSD) e recicláveis."
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 border-l-4 border-l-green-600 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-slate-800 mb-2">
              Cronograma de Coleta
            </h3>
            <p className="text-slate-600 text-sm">
              Verifique os dias e horários que o caminhão compactador passa no
              seu setor.
            </p>
          </div>
          <div className="mt-4 text-green-700 text-sm font-bold flex items-center gap-1">
            <ArrowRight size={14} /> Veja tabela completa abaixo (verde)
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 border-l-4 border-l-orange-500 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-slate-800 mb-2">Ecopontos</h3>
            <p className="text-slate-600 text-sm">
              Locais autorizados para entrega voluntária de pequenos volumes
              (até 1m³).
            </p>
          </div>
          <div className="mt-4 text-orange-700 text-sm font-bold flex items-center gap-1">
            <ArrowRight size={14} /> Veja lista abaixo (laranja)
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 border-l-4 border-l-blue-600 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-slate-800 mb-2">
              Credenciamento
            </h3>
            <p className="text-slate-600 text-sm">
              Empresas de caçambas devem estar cadastradas no sistema municipal.
            </p>
          </div>
          <div className="mt-4 text-blue-700 text-sm font-bold flex items-center gap-1">
            <ArrowRight size={14} /> Veja lista abaixo (azul)
          </div>
        </div>
      </div>

      {/* Schedule Section */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 p-2 rounded text-green-600">
            <Calendar size={24} />
          </div>
          <div>
            <h3 className="font-bold text-xl text-green-900">
              Cronograma de Coleta Domiciliar
            </h3>
            <p className="text-green-800/70 text-sm">
              Serviço regular para lixo doméstico e orgânico.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg border border-green-100 shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-green-600 text-white uppercase text-xs font-bold">
              <tr>
                <th className="px-6 py-3">Zona</th>
                <th className="px-6 py-3">Bairros de Referência</th>
                <th className="px-6 py-3">Frequência</th>
                <th className="px-6 py-3">Turno</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-100">
              {schedule.map((item, idx) => (
                <tr key={idx} className="hover:bg-green-50/50 transition">
                  <td className="px-6 py-4 font-bold text-slate-800">
                    {item.zone}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {item.neighborhoods}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-800 py-1 px-2 rounded font-bold text-xs">
                      {item.days}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 flex items-center gap-2">
                    <Clock size={14} /> {item.shift}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Ecopontos */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-100 p-2 rounded text-orange-600">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="font-bold text-xl text-orange-900">Ecopontos</h3>
              <p className="text-orange-800/70 text-sm">
                Pequenos volumes (até 1m³)
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {ecopontos.map((eco, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded border border-orange-100 shadow-sm hover:shadow-md transition"
              >
                <strong className="block text-slate-800 font-bold">
                  {eco.name}
                </strong>
                <div className="flex items-start gap-2 text-sm text-slate-600 mt-1">
                  <MapPin
                    size={14}
                    className="shrink-0 mt-0.5 text-orange-500"
                  />
                  <span>{eco.address}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Companies */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-2 rounded text-blue-600">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-xl text-blue-900">
                Empresas Credenciadas
              </h3>
              <p className="text-blue-800/70 text-sm">
                Grandes volumes e entulhos.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {companies.map((comp, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded border border-blue-100 shadow-sm hover:shadow-md transition flex items-center justify-between"
              >
                <div>
                  <strong className="block text-slate-800 font-bold text-sm">
                    {comp.name}
                  </strong>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                    <MapPin size={12} className="text-blue-400" />{" "}
                    {comp.location}
                  </div>
                </div>
                <a
                  href={`tel:${comp.phone}`}
                  className="text-blue-600 font-bold text-sm hover:underline"
                >
                  {comp.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Data */}
      <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-slate-100 p-2 rounded text-slate-600">
            <Info size={24} />
          </div>
          <div>
            <h3 className="font-bold text-xl text-slate-900">
              Dados de Conscientização
            </h3>
            <p className="text-slate-500 text-sm">
              Impacto ambiental e penalidades previstas em lei.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <StatCard
            icon={<Timer size={14} />}
            iconColor="text-orange-500"
            label="Decomposição Vidro"
            value="4.000"
            unit="Anos"
          />
          <StatCard
            icon={<Timer size={14} />}
            iconColor="text-orange-500"
            label="Decomposição Plástico"
            value="400"
            unit="Anos"
          />
          <StatCard
            icon={<Banknote size={14} />}
            iconColor="text-red-500"
            label="Multa Leve"
            value="R$ 540"
            unit="Valor Inicial"
          />
          <StatCard
            icon={<Banknote size={14} />}
            iconColor="text-red-500"
            label="Multa Grave"
            value="5.000+"
            unit="Reais"
          />
        </div>
      </div>
    </div>
  );
};
