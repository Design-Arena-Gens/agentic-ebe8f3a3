type VillageLogProps = {
  entries: string[];
};

export function VillageLog({ entries }: VillageLogProps) {
  return (
    <section className="h-full rounded-xl border border-emerald-200 bg-white/90 p-4 shadow-md shadow-emerald-950/5">
      <h2 className="mb-3 text-lg font-semibold text-emerald-900">
        التقارير
      </h2>
      <div className="flex h-64 flex-col gap-2 overflow-y-auto rounded-lg border border-emerald-100 bg-emerald-50/70 p-3 text-sm text-emerald-800">
        {entries.length === 0 ? (
          <p className="text-emerald-600">لا يوجد تقارير بعد.</p>
        ) : (
          entries.map((entry, index) => (
            <p key={index} className="leading-6">
              {entry}
            </p>
          ))
        )}
      </div>
    </section>
  );
}
