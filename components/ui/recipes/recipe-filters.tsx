"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X, Leaf, Drumstick, Cake } from "lucide-react";
import { CategoryFilter } from "@/lib/types";

const categories = [
  { value: "all" as CategoryFilter, label: "All Recipes", icon: null },
  { value: "Veg" as CategoryFilter, label: "Vegetarian", icon: Leaf },
  { value: "Non-Veg" as CategoryFilter, label: "Non-Veg", icon: Drumstick },
  { value: "Dessert" as CategoryFilter, label: "Desserts", icon: Cake },
];

export function RecipeFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const activeCategory = (searchParams.get("filter") ||
    "all") as CategoryFilter;

  //search function
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    params.delete("page");
    router.push(`/recipes?${params.toString()}`);
  };

  //category filter function
  const handleCategoryChange = (category: CategoryFilter) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === "all") {
      params.delete("filter");
    } else {
      params.set("filter", category);
    }
    params.delete("page");
    router.push(`/recipes?${params.toString()}`);
  };

  // Function for clearing all filters
  const clearFilters = () => {
    setSearch("");
    router.push("/recipes");
  };

  const hasActiveFilters = search || activeCategory !== "all";

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-3 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-400" />
          <Input
            type="text"
            placeholder="Search recipes, ingredients, or descriptions"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 ring-1 ring-transparent focus:ring-2 focus:ring-orange-400/60"
          />
        </div>

        <Button
          type="submit"
          className="bg-linear-to-r from-orange-500 to-red-600 text-white shadow-md hover:opacity-95"
        >
          Search
        </Button>

        <Button
          variant="ghost"
          onClick={() => {
            setSearch("");
            const params = new URLSearchParams(searchParams.toString());
            params.delete("search");
            params.delete("page");
            router.push(`/recipes?${params.toString()}`);
          }}
          className="text-sm text-zinc-600 dark:text-zinc-300"
        >
          Reset
        </Button>
      </form>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Filter by:
        </span>
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.value;

          return (
            <button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-linear-to-r from-orange-500 to-red-600 text-white shadow-sm"
                  : "border border-zinc-200 bg-white/60 text-zinc-800 hover:bg-orange-50 dark:bg-zinc-800 dark:border-zinc-700"
              }`}
            >
              {Icon && (
                <Icon
                  className={`h-4 w-4 ${
                    isActive ? "text-white" : "text-orange-500"
                  }`}
                />
              )}
              {category.label}
            </button>
          );
        })}

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-2 rounded-full bg-red-50 text-red-600 px-3 py-1.5 text-sm"
          >
            <X className="h-4 w-4" /> Clear
          </button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Active filters:
          </span>
          {search && (
            <Badge variant="secondary" className="gap-2">
              Search: {search}
              <button
                onClick={() => {
                  setSearch("");
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete("search");
                  router.push(`/recipes?${params.toString()}`);
                }}
                className="ml-1 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                <X className="h-3 w-3" />
                {}
              </button>
            </Badge>
          )}
          {activeCategory !== "all" && (
            <Badge variant="secondary" className="gap-2">
              Category: {activeCategory}
              <button
                onClick={() => handleCategoryChange("all")}
                className="ml-1 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                <X className="h-3 w-3" />
                {}
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
