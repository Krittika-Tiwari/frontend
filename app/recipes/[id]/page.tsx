"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Flame, Activity, Wheat, Droplet } from "lucide-react";
import { Recipe } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export default function RecipeDetailPage() {
  const params = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //fetch recipe details
    async function fetchRecipe() {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/recipes/${params.id}`);

        if (!res.ok) {
          throw new Error("Recipe not found");
        }

        const data: Recipe = await res.json();
        setRecipe(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "An error occurred while fetching the recipe."
        );
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchRecipe();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
            <div className="relative h-screen w-full overflow-hidden">
              <div className="h-full w-full bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
            </div>

            <div className="h-screen overflow-auto p-8 flex justify-center">
              <div className="w-full max-w-xl bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-6 flex flex-col gap-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="max-w-prose w-full">
                    <div className="mb-2 h-8 w-3/4 bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                    <div className="mb-1 h-4 w-5/6 bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                  </div>
                  <div className="ml-2">
                    <div className="h-8 w-20 rounded-full bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3 text-center"
                    >
                      <div className="mb-2 h-6 w-6 rounded-full bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                      <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                      <div className="mt-1 h-3 w-20 bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                    </div>
                  ))}
                </div>

                <div className="mt-2 space-y-4 w-full">
                  <div>
                    <div className="mb-2 h-5 w-40 bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                    <div className="rounded-lg bg-transparent">
                      <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900/50">
                        <div className="h-4 w-full mb-2 bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                        <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 h-5 w-44 bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                    <div className="space-y-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <div className="h-7 w-7 rounded-full bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                          <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-start">
                  <div className="h-9 w-36 rounded-md bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-md p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Recipe Not Found</h2>
          <p className="mb-6 text-zinc-600 dark:text-zinc-400">
            {error || "The recipe you are looking for does not exist."}
          </p>
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 rounded-md border px-3 py-1 text-sm"
          >
            Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Veg":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Non-Veg":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "Dessert":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-zinc-100 text-zinc-800";
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
          <div className="relative h-screen w-full overflow-hidden">
            <Image
              src={recipe.image_url}
              alt={recipe.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="h-screen overflow-auto p-8 flex justify-center">
            <div className="w-full max-w-xl bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-6 flex flex-col gap-6">
              <div className="flex items-start justify-between gap-4">
                <div className="max-w-prose">
                  <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                    {recipe.name}
                  </h1>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {recipe.description}
                  </p>
                </div>
                <div className="ml-2">
                  <span
                    className={`${getCategoryColor(
                      recipe.category
                    )} text-sm py-1 px-3 rounded-full inline-block`}
                  >
                    {recipe.category}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div className="flex flex-col items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3 text-center">
                  <Flame className="mb-1 h-5 w-5 text-orange-500" />
                  <div className="text-lg font-semibold">{recipe.calories}</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">
                    Calories
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3 text-center">
                  <Activity className="mb-1 h-5 w-5 text-red-500" />
                  <div className="text-lg font-semibold">{recipe.protein}g</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">
                    Protein
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3 text-center">
                  <Wheat className="mb-1 h-5 w-5 text-yellow-600" />
                  <div className="text-lg font-semibold">{recipe.carbs}g</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">
                    Carbs
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-800 p-3 text-center">
                  <Droplet className="mb-1 h-5 w-5 text-purple-500" />
                  <div className="text-lg font-semibold">{recipe.fats}g</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">
                    Fats
                  </div>
                </div>
              </div>

              <div className="mt-2 space-y-4">
                <div className="rounded-lg bg-transparent">
                  <h2 className="mb-2 text-sm font-medium text-zinc-800 dark:text-zinc-100">
                    Ingredients
                  </h2>
                  <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900/50">
                    <p className="whitespace-pre-line leading-relaxed text-sm text-zinc-700 dark:text-zinc-300">
                      {recipe.ingredients}
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="mb-2 text-sm font-medium text-zinc-800 dark:text-zinc-100">
                    Preparation
                  </h2>
                  <div className="space-y-2">
                    {recipe.steps
                      .split(/\d+\./)
                      .filter(Boolean)
                      .map((step, index) => (
                        <div key={index} className="flex gap-3 items-start">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
                            {index + 1}
                          </div>
                          <p className="flex-1 text-sm text-zinc-700 dark:text-zinc-300">
                            {step.trim()}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-start">
                <Link
                  href="/recipes"
                  className="inline-flex items-center gap-2 rounded-md border px-3 py-1 text-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Recipes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
