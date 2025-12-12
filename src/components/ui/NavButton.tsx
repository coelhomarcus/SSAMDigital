interface NavButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
  icon: React.ReactNode;
}

export const NavButton = ({
  children,
  onClick,
  active,
  icon,
}: NavButtonProps) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md font-semibold text-sm transition-all flex items-center gap-2
      ${
        active
          ? "bg-green-50 text-green-700 border border-green-200 shadow-sm"
          : "text-slate-600 hover:bg-slate-50 hover:text-green-700 border border-transparent"
      }`}
  >
    {icon}
    {children}
  </button>
);
