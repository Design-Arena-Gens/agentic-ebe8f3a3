"use client";

import { useEffect, useMemo, useState } from "react";
import { ActionPanel } from "./components/ActionPanel";
import { BuildingCard } from "./components/BuildingCard";
import { ResourceBar } from "./components/ResourceBar";
import { StatsPanel } from "./components/StatsPanel";
import { VillageLog } from "./components/VillageLog";
import { BuildingState, initialBuildings, initialResources } from "@/lib/gameData";
import {
  addResources,
  calculateProductionPerHour,
  calculateStorageCapacity,
  calculateVillagePopulation,
  canAffordUpgrade,
  calculateUpgradeCost,
  getBuildingDefinition,
  spendResources,
} from "@/lib/gameLogic";

export default function Home() {
  const [resources, setResources] = useState(initialResources);
  const [buildings, setBuildings] =
    useState<BuildingState[]>(initialBuildings);
  const [log, setLog] = useState<string[]>([]);
  const [heroExperience, setHeroExperience] = useState(0);

  const productionPerHour = useMemo(
    () => calculateProductionPerHour(buildings),
    [buildings],
  );

  const capacity = useMemo(
    () => calculateStorageCapacity(buildings),
    [buildings],
  );

  const population = useMemo(
    () => calculateVillagePopulation(buildings),
    [buildings],
  );

  const culturePoints = useMemo(
    () =>
      buildings.reduce(
        (total, building) =>
          total + Math.round((building.level * 6) / 2),
        0,
      ),
    [buildings],
  );

  const heroLevel = useMemo(
    () => Math.max(1, Math.floor(heroExperience / 150) + 1),
    [heroExperience],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setResources((current) => {
        const delta: Partial<typeof current> = {
          wood: productionPerHour.wood / 3600,
          clay: productionPerHour.clay / 3600,
          iron: productionPerHour.iron / 3600,
          crop: productionPerHour.crop / 3600,
        };
        return addResources(current, delta, capacity);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [productionPerHour, capacity]);

  const pushLog = (message: string) => {
    setLog((current) => {
      const timestamp = new Date().toLocaleTimeString("ar-EG", {
        hour12: false,
      });
      const withTime = `[${timestamp}] ${message}`;
      return [withTime, ...current].slice(0, 25);
    });
  };

  const handleUpgrade = (id: string) => {
    const definition = getBuildingDefinition(id);
    if (!definition) return;

    const current = buildings.find((building) => building.id === id);
    if (!current) return;

    const cost = calculateUpgradeCost(definition, current.level);

    if (!canAffordUpgrade(resources, cost)) {
      pushLog(`لا توجد موارد كافية لترقية ${definition.name}.`);
      return;
    }

    setResources((prev) => spendResources(prev, cost));

    setBuildings((prev) =>
      prev.map((building) =>
        building.id === id
          ? { ...building, level: building.level + 1 }
          : building,
      ),
    );

    setHeroExperience((prev) => prev + 25);

    pushLog(`تم ترقية ${definition.name} إلى المستوى ${current.level + 1}.`);
  };

  const handleRaid = () => {
    const loot = {
      wood: Math.round(90 + Math.random() * 60),
      clay: Math.round(80 + Math.random() * 60),
      iron: Math.round(60 + Math.random() * 45),
      crop: Math.round(40 + Math.random() * 30),
    };
    setResources((prev) => addResources(prev, loot, capacity));
    setHeroExperience((prev) => prev + 45);
    pushLog(
      `عادت الغارة بموارد: خشب ${loot.wood}، طين ${loot.clay}، حديد ${loot.iron}، قمح ${loot.crop}.`,
    );
  };

  const handleQuest = () => {
    const reward = {
      wood: 120,
      clay: 120,
      iron: 120,
      crop: 80,
    };
    setResources((prev) => addResources(prev, reward, capacity));
    setHeroExperience((prev) => prev + 30);
    pushLog(
      "تم إنهاء المهمة اليومية وحصلت القرية على موارد إضافية ودعم من السكان.",
    );
  };

  const handleFestival = () => {
    if (resources.crop < 200) {
      pushLog("لا يوجد قمح كافٍ لإقامة الاحتفال.");
      return;
    }

    setResources((prev) =>
      spendResources(prev, { wood: 0, clay: 0, iron: 0, crop: 200 }),
    );
    setHeroExperience((prev) => prev + 60);
    pushLog("أقيم احتفال كبير في القرية وزادت نقاط الحضارة!");
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-100 via-emerald-50 to-emerald-200 p-6 font-sans"
      dir="rtl"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-emerald-900">
            قرية ترافيان التجريبية
          </h1>
          <p className="max-w-3xl text-sm text-emerald-700">
            قم بإدارة مواردك، طوّر المباني، وأرسل الغارات لتوسيع إمبراطوريتك.
            هذه نسخة مبسطة تتيح لك الإحساس بروح لعبة ترافيان الأصلية.
          </p>
        </div>

        <ResourceBar
          resources={resources}
          production={productionPerHour}
          capacity={capacity}
        />

        <StatsPanel
          population={population}
          culturePoints={culturePoints}
          heroLevel={heroLevel}
        />

        <ActionPanel
          onSendRaid={handleRaid}
          onCompleteQuest={handleQuest}
          onFestival={handleFestival}
        />

        <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="grid gap-4 md:grid-cols-2">
            {buildings.map((building) => {
              const definition = getBuildingDefinition(building.id);
              if (!definition) return null;
              const cost = calculateUpgradeCost(
                definition,
                building.level,
              );
              const affordable = canAffordUpgrade(resources, cost);
              return (
                <BuildingCard
                  key={building.id}
                  definition={definition}
                  level={building.level}
                  cost={cost}
                  canUpgrade={affordable}
                  onUpgrade={() => handleUpgrade(building.id)}
                />
              );
            })}
          </div>
          <VillageLog entries={log} />
        </section>

        <footer className="pb-6 pt-2 text-center text-xs text-emerald-600">
          نسخة تدريبية مستوحاة من لعبة ترافيان الأصلية، تم إنشاؤها لأغراض
          تعليمية وتجريبية.
        </footer>
      </div>
    </div>
  );
}
