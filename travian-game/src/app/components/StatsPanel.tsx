type StatsPanelProps = {
  population: number;
  culturePoints: number;
  heroLevel: number;
};

export function StatsPanel({
  population,
  culturePoints,
  heroLevel,
}: StatsPanelProps) {
  return (
    <section className="rounded-xl border border-emerald-200 bg-white/95 p-4 shadow-md shadow-emerald-950/5">
      <h2 className="mb-3 text-lg font-semibold text-emerald-900">
        حالة القرية
      </h2>
      <div className="grid gap-3 text-sm text-emerald-800 sm:grid-cols-3">
        <div className="rounded-lg border border-emerald-100 bg-emerald-50/70 p-3">
          <p className="text-xs text-emerald-600">عدد السكان</p>
          <p className="text-xl font-semibold text-emerald-900">
            {population}
          </p>
        </div>
        <div className="rounded-lg border border-emerald-100 bg-emerald-50/70 p-3">
          <p className="text-xs text-emerald-600">نقاط الحضارة</p>
          <p className="text-xl font-semibold text-emerald-900">
            {culturePoints}
          </p>
        </div>
        <div className="rounded-lg border border-emerald-100 bg-emerald-50/70 p-3">
          <p className="text-xs text-emerald-600">مستوى البطل</p>
          <p className="text-xl font-semibold text-emerald-900">
            {heroLevel}
          </p>
        </div>
      </div>
    </section>
  );
}
