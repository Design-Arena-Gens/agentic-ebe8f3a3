import Image from "next/image";
import { ResourceSet, resourceLabels } from "@/lib/gameData";

type ResourceBarProps = {
  resources: ResourceSet;
  production: ResourceSet;
  capacity: { warehouse: number; granary: number };
};

const resourceIcons: Record<keyof ResourceSet, string> = {
  wood: "/assets/woodcutter.svg",
  clay: "/assets/claypit.svg",
  iron: "/assets/ironmine.svg",
  crop: "/assets/cropland.svg",
};

export function ResourceBar({
  resources,
  production,
  capacity,
}: ResourceBarProps) {
  return (
    <header className="mb-6 rounded-xl border border-emerald-200 bg-white/80 shadow-md shadow-emerald-950/5 backdrop-blur">
      <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-4">
        {Object.entries(resourceLabels).map(([resource, label]) => {
          const value = resources[resource as keyof ResourceSet];
          const productionPerHour =
            production[resource as keyof ResourceSet] ?? 0;
          const cap =
            resource === "crop" ? capacity.granary : capacity.warehouse;

          return (
            <div
              key={resource}
              className="flex items-center justify-between rounded-lg border border-emerald-100 bg-emerald-50/60 px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-inner">
                  <Image
                    src={resourceIcons[resource as keyof ResourceSet]}
                    alt={label}
                    width={32}
                    height={32}
                  />
                </span>
                <div>
                  <p className="text-sm text-emerald-800">{label}</p>
                  <p className="text-xs text-emerald-600">
                    {productionPerHour.toFixed(0)} / ساعة
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-emerald-900">
                  {Math.floor(value)}
                </p>
                <p className="text-xs text-emerald-600">السعة {cap}</p>
              </div>
            </div>
          );
        })}
      </div>
    </header>
  );
}
