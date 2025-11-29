import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ChefHat,
  Search,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-linear-to-br from-red-700/40 via-orange-600/20 to-black" />
        <div className="absolute -left-40 -top-20 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -right-40 top-40 h-96 w-96 rounded-full bg-red-500/20 blur-3xl" />
        <div className="absolute left-10 top-20 h-6 w-6 animate-bounce rounded-full bg-orange-400 blur-sm" />
        <div className="absolute right-20 top-32 h-4 w-4 animate-pulse rounded-full bg-red-400 blur-sm" />
        <div className="absolute left-1/2 top-10 h-3 w-3 animate-ping rounded-full bg-yellow-300" />

        <div className="relative min-h-screen mx-auto max-w-7xl px-6 py-28 lg:flex lg:items-center lg:py-40">
          <div className="max-w-2xl space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-zinc-300">50+ Authentic Recipes</span>
            </div>

            <h1 className="text-5xl font-bold leading-tight sm:text-7xl">
              Order Tasty & Fresh
              <span className="block bg-linear-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Food Anytime
              </span>
            </h1>

            <p className="text-lg text-zinc-300">
              Browse curated recipes with full nutrition, beautiful visuals, and
              effortless cooking steps — all in one place.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-start">
              <Link href="/recipes">
                <Button
                  size="lg"
                  className="gap-2 bg-linear-to-r from-orange-500 to-red-600 text-base font-semibold shadow-xl shadow-red-500/20"
                >
                  <Search className="h-5 w-5" />
                  Browse Recipes
                </Button>
              </Link>

              <Link href="/recipes?filter=Veg">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-zinc-700 bg-white/5 text-base backdrop-blur"
                >
                  <ChefHat className="h-5 w-5" />
                  Vegetarian Only
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-16 flex w-full justify-center lg:mt-0 lg:w-1/2">
            <div className="relative">
              <img
                src="/hero_dish.webp"
                alt="Food Dish"
                className="h-auto w-[460px] rounded-3xl shadow-[0_0_80px_-20px_rgba(255,0,0,0.4)]"
              />

              <div className="absolute -right-6 top-10 rounded-xl bg-white/10 px-4 py-2 backdrop-blur-md">
                ⭐ 4.9 Rating
              </div>
              <div className="absolute -left-6 bottom-10 rounded-xl bg-white/10 px-4 py-2 backdrop-blur-md">
                <UtensilsCrossed className="mr-2 inline-block h-4 w-4 text-orange-400" />
                Chef Special
              </div>
            </div>
          </div>
        </div>
      </section>

     

      
    </div>
  );
}
