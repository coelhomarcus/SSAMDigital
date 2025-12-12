interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
  iconTextColor: string;
}

export const InfoCard = ({
  icon,
  title,
  description,
  iconBgColor,
  iconTextColor,
}: InfoCardProps) => (
  <div className="flex items-start gap-4">
    <div className={`${iconBgColor} p-3 rounded ${iconTextColor} shrink-0`}>
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-slate-900 text-lg">{title}</h3>
      <p className="text-slate-600 text-sm mt-1">{description}</p>
    </div>
  </div>
);
