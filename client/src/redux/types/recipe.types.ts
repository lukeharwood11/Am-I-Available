// Recipe State Types
export interface RecipeState {
  recipes: Recipe[];
  currentRecipe: Recipe | null;
  loading: boolean;
  error: string | null;
  searchResults: Recipe[];
  searchLoading: boolean;
}

// Re-export Recipe types from the existing types folder
export * from '../../types/recipe';
