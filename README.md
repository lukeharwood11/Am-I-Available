# Am I Available (AmIA)

A comprehensive recipe and meal planning API built with FastAPI and Supabase.

## Setup

### Environment Variables

Create a `.env` file with the following variables:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
OPENAI_API_KEY=your_openai_api_key
DEBUG=false
API_V1_PREFIX=/api
```

### Installation

1. Install dependencies:
```bash
uv sync
```

2. Run the development server:
```bash
uv run uvicorn api.main:app --reload
```

3. Access the API documentation at `http://localhost:8000/docs`

## Database Schema

The API uses the following PostgreSQL schema with pgvector extension:

- `core.ingredient` - Ingredients with vector embeddings
- `core.recipe` - Recipes with vector embeddings
- `core.recipe_ingredient_link` - Many-to-many recipe-ingredient relationships
- `core.meal_plan` - Meal plans with vector embeddings
- `core.meal_plan_recipes` - Meal plan recipe scheduling
- `core.unit_of_measure` - Measurement units
- `core.unit_of_measure_type` - Unit categories
- `core.meal_type` - Meal types (breakfast, lunch, etc.)

## Security

- JWT authentication via Supabase
- User-based data isolation for recipes and meal plans
- Public read access for ingredients and units
- Authenticated write access for all operations

## Response Format

All endpoints return responses in the following format:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```
