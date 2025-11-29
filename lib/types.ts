export interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  steps: string;
  image_url: string;
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
  category: "Veg" | "Non-Veg" | "Dessert";
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalRecipes: number;
  limit: number;
}

export interface RecipesResponse {
  recipes: Recipe[];
  pagination: PaginationInfo;
}

export type CategoryFilter = "all" | "Veg" | "Non-Veg" | "Dessert";

export interface RecipeFilters {
  search: string;
  category: CategoryFilter;
  page: number;
}
