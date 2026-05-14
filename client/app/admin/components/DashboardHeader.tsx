import type { AdminStat } from "../adminTypes";

export function DashboardHeader({
  title,
  stats,
}: {
  title: string;
  stats: AdminStat[];
}) {
  return (
    <header className="flex flex-col justify-between gap-4 border-b border-[#d9c385]/50 pb-6 md:flex-row md:items-end">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a98739]">
          Bloomistry dashboard
        </p>
        <h2 className="font-serif text-4xl text-[#67558a]">{title}</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className="border border-[#d9c385]/55 bg-white px-5 py-4">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[#a98739]">
              {item.label}
            </p>
            <p className="mt-2 font-serif text-3xl text-[#67558a]">{item.value}</p>
          </div>
        ))}
      </div>
    </header>
  );
}
