import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RecipesResponse } from "@/lib/types";
import { RecipeFilters } from "@/components/recipes/recipe-filters";
import RecipesClientView from "@/components/recipes/recipes-client-view";
import Navbar from "@/components/recipes/navbar";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

interface SearchParams {
  search?: string;
  filter?: string;
  page?: string;
}

interface RecipesPageProps {
  searchParams: SearchParams | Promise<SearchParams>;
}

//fetching data from backend
async function getRecipes(
  searchParams: SearchParams
): Promise<RecipesResponse> {
  const params = new URLSearchParams();

  if (searchParams.search) params.append("search", searchParams.search);
  if (searchParams.filter) params.append("filter", searchParams.filter);
  if (searchParams.page) params.append("page", searchParams.page);
  params.append("limit", "12");

  const res = await fetch(`${API_URL}/api/recipes?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return res.json();
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const param = await searchParams;
  const data = await getRecipes(param);
  const { recipes, pagination } = data;
  const currentPage = pagination.currentPage;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="mb-8">
          <RecipeFilters />
        </div>

        {recipes.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed">
            <p className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
              No recipes found
            </p>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <>
            <RecipesClientView recipes={recipes} />

            {pagination.totalPages > 1 && (
              <div className="mt-12 flex items-center justify-between border-t pt-8">
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  Page{" "}
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {pagination.totalPages}
                  </span>
                </div>

                <div className="flex gap-2">
                  {currentPage > 1 ? (
                    <Link
                      href={(() => {
                        const params = new URLSearchParams();
                        if (param?.search) params.set("search", param.search);
                        if (param?.filter) params.set("filter", param.filter);
                        params.set("page", String(currentPage - 1));
                        return `/recipes?${params.toString()}`;
                      })()}
                      className="inline-flex items-center gap-2 rounded-md border px-3 py-1 text-sm"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Link>
                  ) : (
                    <button
                      className="inline-flex items-center gap-2 rounded-md border px-3 py-1 text-sm opacity-50 cursor-not-allowed"
                      disabled
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </button>
                  )}

                  <div className="hidden items-center gap-1 sm:flex">
                    {Array.from(
                      { length: Math.min(5, pagination.totalPages) },
                      (_, i) => {
                        let pageNum = i + 1;

                        if (pagination.totalPages > 5) {
                          if (currentPage > 3) {
                            pageNum = currentPage - 2 + i;
                          }
                          if (currentPage > pagination.totalPages - 3) {
                            pageNum = pagination.totalPages - 4 + i;
                          }
                        }

                        const params = new URLSearchParams();
                        if (param?.search) params.set("search", param.search);
                        if (param?.filter) params.set("filter", param.filter);
                        params.set("page", String(pageNum));

                        return (
                          <Link
                            key={pageNum}
                            href={`/recipes?${params.toString()}`}
                          >
                            <div
                              key={pageNum}
                            //   href={`/recipes?${params.toString()}`}
                              className={`px-2 py-1 rounded-md text-sm ${
                                currentPage === pageNum
                                  ? "bg-zinc-900 text-white"
                                  : "text-zinc-700"
                              }`}
                            >
                              {pageNum}
                            </div>
                          </Link>
                        );
                      }
                    )}
                  </div>

                  {currentPage < pagination.totalPages ? (
                    <Link
                      href={(() => {
                        const params = new URLSearchParams();
                        if (param?.search) params.set("search", param.search);
                        if (param?.filter) params.set("filter", param.filter);
                        params.set("page", String(currentPage + 1));
                        return `/recipes?${params.toString()}`;
                      })()}
                    >
                      <button className="gap-2 flex justify-center items-center border rounded-md px-3 py-1 text-sm">
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </Link>
                  ) : (
                    <button disabled className="gap-2">
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
