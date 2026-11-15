"use client";

import { useSearchParams } from "next/navigation";
import { Showroom } from "./showroom";

/** Reads ?xe=<id> on the client (e.g. /demo/xe?xe=st300) so the page shell stays static. */
export function ShowroomFromQuery() {
  const xe = useSearchParams().get("xe");
  return <Showroom initialModel={xe ?? undefined} />;
}
