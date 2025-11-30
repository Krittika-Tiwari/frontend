"use client";

import { useState } from "react";
import { Recipe } from "@/lib/types";
import ColumnSelector from "./column-selector";
import RecipesTable from "./recipes-table";
import { RecipeCard } from "@/components/recipes/recipe-card";

interface Props {
  recipes: Recipe[];
}

const DEFAULT_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "calories", label: "Calories" },
  { key: "protein", label: "Protein" },
  { key: "carbs", label: "Carbs" },
  { key: "fats", label: "Fats" },
];

export default function RecipesClientView({ recipes }: Props) {
  const [visibleKeys, setVisibleKeys] = useState<string[]>(
    DEFAULT_COLUMNS.map((c) => c.key)
  );
  const [view, setView] = useState<"grid" | "table">("grid");

  return (
    <div className="mb-6 min-h-[500px]">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">View</div>
          <div className="flex gap-2">
            <button
              onClick={() => setView("grid")}
              className={`rounded-md px-3 py-1 text-sm ${
                view === "grid" ? "bg-zinc-900 text-white" : "bg-zinc-100"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setView("table")}
              className={`rounded-md px-3 py-1 text-sm ${
                view === "table" ? "bg-zinc-900 text-white" : "bg-zinc-100"
              }`}
            >
              Table
            </button>
          </div>
        </div>
        {view === "table" && (
          <div>
            <ColumnSelector
              columns={DEFAULT_COLUMNS}
              onChange={(keys) => setVisibleKeys(keys)}
            />
          </div>
        )}
      </div>

      {view === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      ) : (
        <RecipesTable recipes={recipes} visibleColumns={visibleKeys} />
      )}
    </div>
  );
}
