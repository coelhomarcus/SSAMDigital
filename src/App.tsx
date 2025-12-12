import { useState } from "react";
import {
  Truck,
  Trash2,
  AlertTriangle,
  Menu,
  X,
  Info,
  Calculator,
  HelpCircle,
  Phone,
  ClipboardCheck,
} from "lucide-react";
import { NavButton, MobileNavButton } from "./components/ui";
import {
  HomeSection,
  EducationSection,
  CalculatorSection,
  QuizSection,
  FAQSection,
  ReportSection,
} from "./components/sections";

const App = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeSection changeTab={setActiveTab} />;
      case "education":
        return <EducationSection />;
      case "calculator":
        return <CalculatorSection />;
      case "quiz":
        return <QuizSection />;
      case "faq":
        return <FAQSection />;
      case "report":
        return <ReportSection />;
      default:
        return <HomeSection changeTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800 flex flex-col">
      {/* Top Bar - Informational */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span>Serviço de Saneamento Ambiental de Marabá (SSAM)</span>
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <Phone size={12} /> Emergência: 190
            </span>
            <span>Segunda a Sexta, 08h às 18h</span>
          </div>
        </div>
      </div>

      {/* Industrial Header */}
      <header className="bg-white border-b-4 border-green-600 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Area */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setActiveTab("home")}
            >
              <div className="bg-green-600 text-white p-2 rounded-lg shadow-sm group-hover:bg-green-700 transition">
                <Trash2 className="h-8 w-8" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl text-slate-900 tracking-tight leading-none uppercase">
                  SSAM<span className="text-green-600">Digital</span>
                </span>
                <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                  Gestão de Resíduos Sólidos
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              <NavButton
                icon={<Truck size={16} />}
                active={activeTab === "home"}
                onClick={() => setActiveTab("home")}
              >
                Início
              </NavButton>
              <NavButton
                icon={<Info size={16} />}
                active={activeTab === "education"}
                onClick={() => setActiveTab("education")}
              >
                Regras
              </NavButton>
              <NavButton
                icon={<Calculator size={16} />}
                active={activeTab === "calculator"}
                onClick={() => setActiveTab("calculator")}
              >
                Calculadora
              </NavButton>
              <NavButton
                icon={<ClipboardCheck size={16} />}
                active={activeTab === "quiz"}
                onClick={() => setActiveTab("quiz")}
              >
                Quiz
              </NavButton>
              <NavButton
                icon={<HelpCircle size={16} />}
                active={activeTab === "faq"}
                onClick={() => setActiveTab("faq")}
              >
                Dúvidas
              </NavButton>

              <button
                onClick={() => setActiveTab("report")}
                className={`ml-4 px-5 py-2.5 rounded font-bold text-sm transition-all flex items-center gap-2 shadow-sm
                  ${
                    activeTab === "report"
                      ? "bg-red-600 text-white shadow-md"
                      : "bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-600 border border-slate-200"
                  }`}
              >
                <AlertTriangle size={16} />
                Denunciar
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded"
              >
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3 shadow-xl absolute w-full left-0 z-40">
            <MobileNavButton
              active={activeTab === "home"}
              onClick={() => {
                setActiveTab("home");
                setMenuOpen(false);
              }}
            >
              Início
            </MobileNavButton>
            <MobileNavButton
              active={activeTab === "education"}
              onClick={() => {
                setActiveTab("education");
                setMenuOpen(false);
              }}
            >
              Regras
            </MobileNavButton>
            <MobileNavButton
              active={activeTab === "calculator"}
              onClick={() => {
                setActiveTab("calculator");
                setMenuOpen(false);
              }}
            >
              Calculadora
            </MobileNavButton>
            <MobileNavButton
              active={activeTab === "quiz"}
              onClick={() => {
                setActiveTab("quiz");
                setMenuOpen(false);
              }}
            >
              Quiz Educativo
            </MobileNavButton>
            <MobileNavButton
              active={activeTab === "faq"}
              onClick={() => {
                setActiveTab("faq");
                setMenuOpen(false);
              }}
            >
              Dúvidas
            </MobileNavButton>
            <MobileNavButton
              active={activeTab === "report"}
              isSpecial
              onClick={() => {
                setActiveTab("report");
                setMenuOpen(false);
              }}
            >
              Denunciar
            </MobileNavButton>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Industrial Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t-4 border-green-600">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="text-white font-bold text-lg mb-4 uppercase tracking-wider">
              SSAM Digital
            </h4>
            <p className="mb-4">Serviço de Saneamento Ambiental de Marabá.</p>
            <p>© 2024 Todos os direitos reservados.</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4 uppercase tracking-wider">
              Links Rápidos
            </h4>
            <ul className="space-y-2">
              <li className="hover:text-green-400 cursor-pointer">
                Portal da Transparência
              </li>
              <li className="hover:text-green-400 cursor-pointer">
                Legislação Municipal
              </li>
              <li className="hover:text-green-400 cursor-pointer">
                Fale Conosco
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4 uppercase tracking-wider">
              Contato
            </h4>
            <p>Av. VP-8, Folha 32 - Nova Marabá</p>
            <p>Marabá - PA, 68500-000</p>
            <p className="mt-2 text-green-400 font-bold">0800 123 4567</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
