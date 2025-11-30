/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface Column {
  key: string;
  label: string;
}

interface ColumnSelectorProps {
  columns: Column[];
  storageKey?: string;
  onChange?: (visibleKeys: string[]) => void;
}

export default function ColumnSelector({
  columns,
  storageKey = "recipes_columns",
  onChange,
}: ColumnSelectorProps) {
  const defaultState = columns.reduce<Record<string, boolean>>((acc, c) => {
    acc[c.key] = true;
    return acc;
  }, {});

  const [visible, setVisible] = useState<Record<string, boolean>>(defaultState);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as string[];
        const state = { ...defaultState };
        parsed.forEach((k) => {
          if (k in state) state[k] = true;
        });

        Object.keys(state).forEach((k) => {
          if (!parsed.includes(k)) state[k] = false;
        });
        setVisible(state);
      }
    } catch (e) {
      setVisible(defaultState);
    }
  }, [storageKey]);

  useEffect(() => {
    const visibleKeys = Object.keys(visible).filter((k) => visible[k]);
    try {
      localStorage.setItem(storageKey, JSON.stringify(visibleKeys));
    } catch (e) {}
    onChange?.(visibleKeys);
  }, [visible]);

  function toggle(key: string) {
    setVisible((s) => ({ ...s, [key]: !s[key] }));
  }

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (e.target instanceof Node && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none ${
          open
            ? "bg-zinc-900 text-white dark:bg-zinc-200 dark:text-zinc-900"
            : "border bg-white text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
        }`}
      >
        <span>Columns</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-64 rounded-lg border bg-white p-3 shadow-lg dark:bg-zinc-900">
          <div className="mb-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
            Show columns
          </div>
          <div className="flex flex-col gap-2">
            {columns.map((c) => {
              const active = !!visible[c.key];
              return (
                <label
                  key={c.key}
                  className="inline-flex items-center justify-between gap-3 rounded-md px-2 py-1 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => toggle(c.key)}
                      className="h-4 w-4"
                    />
                    <span className="truncate">{c.label}</span>
                  </div>
                  <div className="text-xs text-zinc-500">
                    {active ? "Shown" : "Hidden"}
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
