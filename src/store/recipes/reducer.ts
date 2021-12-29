import type { AnyAction } from 'redux';
import { onFullfiledAsyncAction, onPendingAsyncAction, onRejectedAsyncAction } from '../helpers';
import { IRecipe } from '../interfaces';
import {
  ADD_RECIPE_ACTION,
  EDIT_RECIPE_ACTION,
  SET_RECIPES_ERROR,
  CLEAR_RECIPES_ERROR,
  SET_RECIPES_LOADING_STATUS,
  DELETE_INGREDIENT,
  FETCH_ALL_RECIPES,
  FETCH_RECIPE,
  RESET_STORE,
} from './actions';

export interface IRecipesState {
  recipes: IRecipe[];
  error: Error | {};
  isLoading: boolean;
}

const defaultState: IRecipesState = {
  recipes: [],
  error: {},
  isLoading: false,
};

export const recipesReducer = (state: IRecipesState = defaultState, action: AnyAction): IRecipesState => {
  switch (action.type) {
    case onPendingAsyncAction(FETCH_ALL_RECIPES): {
      return {
        ...state,
        isLoading: true,
        error: {},
      };
    }
    case onFullfiledAsyncAction(FETCH_ALL_RECIPES): {
      return {
        ...state,
        recipes: action.payload || [],
        isLoading: false,
      };
    }
    case onRejectedAsyncAction(FETCH_ALL_RECIPES): {
      return {
        ...state,
        error: action.payload,
      };
    }
    case onPendingAsyncAction(FETCH_RECIPE): {
      return {
        ...state,
        isLoading: true,
        error: {},
      };
    }
    case onFullfiledAsyncAction(FETCH_RECIPE): {
      return {
        ...state,
        recipes: action.payload || [],
        isLoading: false,
      };
    }
    case onRejectedAsyncAction(FETCH_RECIPE): {
      return {
        ...state,
        error: action.payload,
      };
    }
    case ADD_RECIPE_ACTION: {
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    }
    case EDIT_RECIPE_ACTION: {
      const editRecipeById = (recipe: IRecipe) =>
        recipe.id === action.payload.id ? { ...recipe, ...action.payload.recipe } : recipe;
      return {
        ...state,
        recipes: state.recipes.map(editRecipeById),
      };
    }
    case DELETE_INGREDIENT: {
      const { recipeId, ingredientId } = action.payload;
      const deleteIngredientById = (recipe: IRecipe) =>
        recipe.id === recipeId
          ? { ...recipe, ingredients: recipe.ingredients.filter((id) => id !== ingredientId) }
          : recipe;
      return {
        ...state,
        recipes: state.recipes.map(deleteIngredientById),
      };
    }
    case SET_RECIPES_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case CLEAR_RECIPES_ERROR: {
      return {
        ...state,
        error: {},
      };
    }
    case SET_RECIPES_LOADING_STATUS: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case RESET_STORE: {
      return state;
    }
    default:
      return state;
  }
};
