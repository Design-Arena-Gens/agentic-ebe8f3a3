import Image from "next/image";
import type {
  BuildingDefinition,
  ResourceSet,
  ResourceType,
} from "@/lib/gameData";
import { resourceLabels } from "@/lib/gameData";

type BuildingCardProps = {
  definition: BuildingDefinition;
  level: number;
  cost: ResourceSet;
  canUpgrade: boolean;
  onUpgrade: () => void;
};

const formatCost = (cost: ResourceSet) =>
  Object.entries(cost)
    .map(
      ([resource, amount]) =>
        `${resourceLabels[resource as ResourceType]}: ${Math.round(amount)}`,
    )
    .join(" | ");

export function BuildingCard({
  definition,
  level,
  cost,
  canUpgrade,
  onUpgrade,
}: BuildingCardProps) {
  const categoryLabel: Record<BuildingDefinition["category"], string> = {
    resource: "مورد",
    infrastructure: "بنية تحتية",
    military: "عسكري",
  };

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-emerald-200 bg-white/90 p-4 shadow-md shadow-emerald-950/5">
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-emerald-100 bg-emerald-50">
          <Image
            src={definition.image}
            alt={definition.name}
            fill
            className="object-contain p-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-emerald-600">
            {categoryLabel[definition.category]}
          </span>
          <h3 className="text-lg font-semibold text-emerald-900">
            {definition.name}
          </h3>
          <p className="text-xs text-emerald-700">المستوى الحالي: {level}</p>
        </div>
      </div>
      <p className="text-sm leading-6 text-emerald-800">
        {definition.description}
      </p>
      <p className="rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
        تكلفة الترقية التالية — {formatCost(cost)}
      </p>
      <button
        onClick={onUpgrade}
        disabled={!canUpgrade}
        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
      >
        ترقية المبنى
      </button>
    </article>
  );
}
