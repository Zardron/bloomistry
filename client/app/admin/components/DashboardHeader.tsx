import type { AdminStat } from "../adminTypes";

export function DashboardHeader({
  title,
  stats,
}: {
  title: string;
  stats: AdminStat[];
}) {
  return (
    <header className="flex flex-col justify-between gap-4 border-b border-[#d9c385]/50 pb-5 md:flex-row md:items-end lg:pb-6">
      <div>
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#a98739] sm:text-xs sm:tracking-[0.22em]">
          Bloomistry dashboard
        </p>
        <h2 className="font-serif text-3xl leading-tight text-[#67558a] sm:text-4xl">{title}</h2>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {stats.map((item) => (
          <div key={item.label} className="min-w-0 border border-[#d9c385]/55 bg-white px-3 py-3 sm:px-5 sm:py-4">
            <p className="truncate text-[0.62rem] font-bold uppercase tracking-[0.08em] text-[#a98739] sm:text-[0.7rem] sm:tracking-[0.16em]">
              {item.label}
            </p>
            <p className="mt-1 font-serif text-2xl text-[#67558a] sm:mt-2 sm:text-3xl">{item.value}</p>
          </div>
        ))}
      </div>
    </header>
  );
}
