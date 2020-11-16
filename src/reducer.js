export function recipeReducer(recipes, action) {
  if (action.type === "RECIPE_LOADED") {
    return action.payload;
  }
  if (action.type === "RECIPE_DELETED") {
    return recipes.filter((recipe) => {
      return recipe.id !== action.payload.id;
    });
  }
  if (action.type === "RECIPE_EDITED") {
    return recipes.map((recipe) => {
      if (recipe.id === action.payload.editedRecipe.id) {
        return action.payload.editedRecipe;
      } else {
        return recipe;
      }
    });
  }
  if (action.type === "RECIPE_CREATED") {
    return recipes.concat(action.payload.newRecipe);
  }
  throw new Error(`Invalid action type: ${action.type}`);
}
