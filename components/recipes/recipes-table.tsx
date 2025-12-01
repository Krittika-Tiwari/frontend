"use client";

import Link from "next/link";
import { Recipe } from "@/lib/types";
import { Eye } from "lucide-react";

interface RecipesTableProps {
  recipes: Recipe[];
  visibleColumns: string[];
}

export default function RecipesTable({
  recipes,
  visibleColumns,
}: RecipesTableProps) {
  const cols = visibleColumns.reduce<Record<string, boolean>>((acc, k) => {
    acc[k] = true;
    return acc;
  }, {});

  return (
    <div className="overflow-hidden rounded-2xl border bg-white dark:bg-zinc-900 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead className="sticky top-0 bg-linear-to-r from-orange-500/80 to-red-600/70 text-white font-extrabold shadow-sm backdrop-blur-sm border-b ">
            <tr>
              {cols["name"] && <th className="px-4 py-3 text-left ">Name</th>}
              {cols["category"] && (
                <th className="px-4 py-3 text-left ">Category</th>
              )}
              {cols["calories"] && (
                <th className="px-4 py-3 text-right ">Calories</th>
              )}
              {cols["protein"] && (
                <th className="px-4 py-3 text-right ">Protein</th>
              )}
              {cols["carbs"] && (
                <th className="px-4 py-3 text-right ">Carbs</th>
              )}
              {cols["fats"] && <th className="px-4 py-3 text-right ">Fats</th>}
              <th className="px-4 py-3 text-right ">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-zinc-900">
            {recipes.map((r, idx) => (
              <tr
                key={r.id}
                className={`border-b last:border-b-0 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 ${
                  idx % 2 === 0 ? "" : "bg-zinc-50 dark:bg-zinc-950/40"
                }`}
              >
                {cols["name"] && (
                  <td className="px-4 py-3">
                    <Link
                      href={`/recipes/${r.id}`}
                      className="font-medium hover:underline"
                    >
                      {r.name}
                    </Link>
                  </td>
                )}
                {cols["category"] && (
                  <td className="px-4 py-3">{r.category}</td>
                )}
                {cols["calories"] && (
                  <td className="px-4 py-3 text-right">{r.calories}</td>
                )}
                {cols["protein"] && (
                  <td className="px-4 py-3 text-right">{r.protein} g</td>
                )}
                {cols["carbs"] && (
                  <td className="px-4 py-3 text-right">{r.carbs} g</td>
                )}
                {cols["fats"] && (
                  <td className="px-4 py-3 text-right">{r.fats} g</td>
                )}
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/recipes/${r.id}`}
                    className="text-sm text-rose-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
