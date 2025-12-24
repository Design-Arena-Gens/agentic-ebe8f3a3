type ActionPanelProps = {
  onSendRaid: () => void;
  onCompleteQuest: () => void;
  onFestival: () => void;
};

export function ActionPanel({
  onSendRaid,
  onCompleteQuest,
  onFestival,
}: ActionPanelProps) {
  return (
    <section className="rounded-xl border border-emerald-200 bg-white/95 p-4 shadow-md shadow-emerald-950/5">
      <h2 className="mb-4 text-lg font-semibold text-emerald-900">
        لوحة التحكم
      </h2>
      <div className="grid gap-3 sm:grid-cols-3">
        <button
          onClick={onSendRaid}
          className="rounded-lg border border-emerald-200 bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          إرسال غارة سريعة
        </button>
        <button
          onClick={onCompleteQuest}
          className="rounded-lg border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
        >
          إنهاء مهمة يومية
        </button>
        <button
          onClick={onFestival}
          className="rounded-lg border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
        >
          إقامة احتفال
        </button>
      </div>
    </section>
  );
}
