"use client";

import { useState } from "react";
import { Configurator, type Selection } from "./configurator";
import { models, paints, rims, type Model, type VehicleType } from "./data";
import { XeHeader } from "./header";
import { Finance, Lineup, SpecTable, TestDrive, XeFooter } from "./sections";

/** `initialModel` comes from ?xe=<id> (e.g. /demo/xe?xe=st300) so links can open a given model. */
export function Showroom({ initialModel }: { initialModel?: string }) {
  const [sel, setSel] = useState<Selection>(() => ({
    model: models.find((m) => m.id === initialModel) ?? models[1],
    paint: paints[3],
    rim: rims[0],
  }));

  const pickModel = (model: Model) => setSel((s) => ({ ...s, model }));
  const pickType = (t: VehicleType) => {
    if (t !== sel.model.type) pickModel(models.find((m) => m.type === t)!);
  };
  const configure = (model: Model) => {
    pickModel(model);
    document.getElementById("cau-hinh")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="demo-xe min-h-screen bg-paper text-ink">
      <XeHeader />
      <main>
        <Configurator
          sel={sel}
          onType={pickType}
          onModel={pickModel}
          onPaint={(paint) => setSel((s) => ({ ...s, paint }))}
          onRim={(rim) => setSel((s) => ({ ...s, rim }))}
        />
        <Lineup onConfigure={configure} />
        <SpecTable />
        <Finance sel={sel} />
        <TestDrive sel={sel} />
      </main>
      <XeFooter />
    </div>
  );
}
