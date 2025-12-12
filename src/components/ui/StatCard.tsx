interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit: string;
  iconColor: string;
}

export const StatCard = ({
  icon,
  label,
  value,
  unit,
  iconColor,
}: StatCardProps) => (
  <div className="bg-slate-50 p-6 rounded border border-slate-200 text-center hover:border-slate-300 transition flex flex-col justify-center items-center">
    <div className="text-slate-500 text-xs uppercase font-bold mb-3 flex items-center justify-center gap-2">
      <span className={iconColor}>{icon}</span> {label}
    </div>
    <div className="text-3xl font-black text-slate-800 mb-1">{value}</div>
    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
      {unit}
    </div>
  </div>
);
