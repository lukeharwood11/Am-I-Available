# Redux State Management

This project uses Redux Toolkit for state management with a Rails-style folder structure. This document explains the architecture and how to use it.

## Folder Structure

```
redux/
├── constants/          # API endpoints, error messages, action types
├── hubs/              # API request handlers (like Rails services)
├── selectors/         # Reselect selectors for computed state
├── slices/            # Redux Toolkit slices (reducers + actions)
├── thunks/            # Async action creators
├── types/             # TypeScript interfaces for state
├── hooks.ts           # Typed Redux hooks
├── index.ts           # Main exports
└── store.ts           # Store configuration
```

## Key Concepts

### Rails-Style Architecture

This Redux setup follows Rails conventions:
- **Hubs** (like Rails services): Handle API requests and business logic
- **Thunks** (like Rails controllers): Orchestrate actions and side effects
- **Slices** (like Rails models): Manage state and simple business logic
- **Selectors** (like Rails helpers): Compute derived state
- **Constants**: Centralized configuration and constants

### File Naming Conventions

- `*.slice.ts` - Redux Toolkit slices
- `*.thunk.ts` - Async action creators
- `*.hub.ts` - API request handlers
- `*.selectors.ts` - Reselect selectors

## Usage Examples

### 1. Using Redux Hooks

```typescript
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { selectUser, selectAuthLoading } from '../redux/selectors';
import { initializeAuth } from '../redux/thunks';

function MyComponent() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectAuthLoading);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return <div>{user?.email}</div>;
}
```

### 2. Using Custom Redux Hooks

```typescript
import { useReduxAuth } from '../hooks/useReduxAuth';

function AuthComponent() {
  const { user, loading, signOut } = useReduxAuth();

  return (
    <div>
      {loading ? 'Loading...' : `Welcome, ${user?.email}`}
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

### 3. Making API Calls

```typescript
import { useReduxRecipes } from '../hooks/useReduxRecipes';

function RecipeList() {
  const { recipes, loading, loadRecipes, createRecipe } = useReduxRecipes();

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  const handleCreate = async (recipeData) => {
    await createRecipe(recipeData);
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {recipes.map(recipe => (
        <div key={recipe.id}>{recipe.title}</div>
      ))}
    </div>
  );
}
```

## State Structure

```typescript
interface RootState {
  auth: {
    user: User | null;
    session: Session | null;
    loading: boolean;
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    error: string | null;
  };
  recipe: {
    recipes: Recipe[];
    currentRecipe: Recipe | null;
    loading: boolean;
    error: string | null;
    searchResults: Recipe[];
    searchLoading: boolean;
  };
  calendar: {
    events: CalendarEvent[];
    loading: boolean;
    error: string | null;
    googleTokens: {
      accessToken: string | null;
      refreshToken: string | null;
    };
  };
}
```

## API Integration

### Hubs

Hubs handle all API requests:

```typescript
// Direct hub usage (not recommended - use thunks instead)
import { recipeHub } from '../redux/hubs';

const recipes = await recipeHub.getRecipes();
```

### Thunks

Thunks orchestrate complex operations:

```typescript
import { fetchRecipes } from '../redux/thunks';

// In component
dispatch(fetchRecipes({ limit: 10 }));
```

## Selectors

Use selectors for computed state and memoization:

```typescript
import { selectRecipesByDifficulty } from '../redux/selectors';

const easyRecipes = useAppSelector(selectRecipesByDifficulty('easy'));
```

## Error Handling

Errors are automatically handled by thunks and stored in state:

```typescript
const error = useAppSelector(selectRecipeError);
if (error) {
  // Display error message
}
```

## Migration from Old Hooks

The following hooks are deprecated and should be replaced:

- `useAuth` → `useReduxAuth`
- `useRecipeApi` → `useReduxRecipes`
- `useAxios` → Use Redux thunks and hubs

## Best Practices

1. **Always use typed hooks**: Use `useAppSelector` and `useAppDispatch`
2. **Use selectors**: Create selectors for any computed state
3. **Handle loading states**: Check loading states in components
4. **Use custom hooks**: Prefer `useReduxAuth` over direct selector usage
5. **Error boundaries**: Implement error boundaries for better UX
6. **Async thunks**: Use thunks for all async operations
7. **Immutable updates**: Redux Toolkit uses Immer internally

## Performance Optimization

1. **Memoized selectors**: Use `createSelector` for expensive computations
2. **Granular selectors**: Create specific selectors to avoid unnecessary re-renders
3. **React.memo**: Wrap components that don't need frequent updates
4. **Split state**: Keep different domains in separate slices

## Testing

```typescript
import { store } from '../redux/store';
import { fetchRecipes } from '../redux/thunks';

// Test thunks
await store.dispatch(fetchRecipes());
const state = store.getState();
expect(state.recipe.recipes).toHaveLength(10);
```
