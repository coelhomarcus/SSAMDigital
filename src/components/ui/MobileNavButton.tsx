interface MobileNavButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
  isSpecial?: boolean;
}

export const MobileNavButton = ({
  children,
  onClick,
  active,
  isSpecial,
}: MobileNavButtonProps) => (
  <button
    onClick={onClick}
    className={`block w-full text-left py-3 px-4 rounded-lg font-bold border
      ${
        active
          ? "bg-green-50 text-green-700 border-green-200"
          : "text-slate-600 border-slate-100 hover:bg-slate-50"
      }
      ${isSpecial ? "bg-red-50 text-red-600 border-red-100" : ""}  
    `}
  >
    {children}
  </button>
);
