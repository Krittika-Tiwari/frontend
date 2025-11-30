import Link from "next/link";
import { Flame, ArrowRight } from "lucide-react";
import { Recipe } from "@/lib/types";
import Image from "next/image";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Veg":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Non-Veg":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "Dessert":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400";
    }
  };

  return (
    <div className="group overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1">
      <div className="p-0">
        <div className="relative aspect-video overflow-hidden bg-zinc-100">
          <div className="relative aspect-video overflow-hidden bg-zinc-100">
            <Image
              src={recipe.image_url}
              alt={recipe.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          <div className="absolute left-3 top-3">
            <span
              className={`${getCategoryColor(
                recipe.category
              )} text-sm py-1 px-2 rounded-full inline-block`}
            >
              {recipe.category}
            </span>
          </div>

          <div className="absolute left-3 bottom-3 text-white">
            <h3 className="text-base font-semibold drop-shadow">
              {recipe.name}
            </h3>
            <p className="text-xs opacity-90 drop-shadow">
              {recipe.calories} cal • {recipe.protein}g protein
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 pt-2 flex flex-col gap-2">
        <p className="line-clamp-3  text-sm text-zinc-700 dark:text-zinc-300">
          {recipe.description}
        </p>
        <div className=" flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="font-medium">{recipe.calories}</span>
              <span className="text-xs text-zinc-500">cal</span>
            </div>
            <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-700" />
            <div className="text-xs">
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {recipe.protein}g
              </span>{" "}
              protein
            </div>
          </div>

          <Link
            href={`/recipes/${recipe.id}`}
            className="inline-flex items-center gap-2 rounded-md border px-3 py-1 text-sm bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <span>View</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
