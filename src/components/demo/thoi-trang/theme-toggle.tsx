"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

/** Light/dark switch. Also honours ?theme=light|dark so a demo can be linked in either mode. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const fromUrl = new URLSearchParams(location.search).get("theme");
    if (fromUrl === "light" || fromUrl === "dark") root.dataset.theme = fromUrl;
    // sync local state with what the pre-paint theme script decided
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(root.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const flip = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("nt-theme", next);
    } catch {}
    setTheme(next);
  };

  return (
    <button
      onClick={flip}
      className="grid size-10 place-items-center rounded-full hover:bg-chip"
      aria-label={theme === "dark" ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
    >
      {theme === "dark" ? <Sun className="size-5 stroke-[1.5]" /> : <Moon className="size-5 stroke-[1.5]" />}
    </button>
  );
}
