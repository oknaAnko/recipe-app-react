import type { AnyAction } from 'redux';
import { onFullfiledAsyncAction, onPendingAsyncAction, onRejectedAsyncAction } from '../helpers';
import { IRecipe, IRecipeFromAPI, IIngredient, IError } from '../interfaces';
import {
  ADD_RECIPE_ACTION,
  EDIT_RECIPE_ACTION,
  SET_RECIPES_ERROR,
  CLEAR_RECIPES_ERROR,
  SET_RECIPES_LOADING_STATUS,
  DELETE_INGREDIENT,
  EDIT_INGREDIENT,
  ADD_INGREDIENT,
  FETCH_ALL_RECIPES,
  FETCH_SEARCHED_RECIPES,
  FETCH_RECIPE,
  RESET_STORE,
} from './actions';

export interface IRecipesState {
  recipes: IRecipe[];
  error: IError;
  isLoading: boolean;
}

const defaultState: IRecipesState = {
  recipes: [],
  error: {}, //null
  isLoading: false,
};

const changeImageParams = (recipe: IRecipeFromAPI) => {
  console.log(recipe);
  return {
    ...recipe,
    mainPhoto: {
      id: recipe.main_photo != null ? recipe.main_photo.id : 0,
      url: recipe.main_photo != null ? `${process.env.REACT_APP_API_PHOTO_URL}${recipe.main_photo.path}` : '',
      alt: recipe.main_photo != null ? recipe.main_photo.filename : '',
    },
  };
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
      console.log(action.payload);
      return {
        ...state,
        recipes: action.payload.map(changeImageParams) || [],
      };
    }
    case onRejectedAsyncAction(FETCH_ALL_RECIPES): {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case onPendingAsyncAction(FETCH_SEARCHED_RECIPES): {
      return {
        ...state,
        isLoading: true,
        error: {},
      };
    }
    case onFullfiledAsyncAction(FETCH_SEARCHED_RECIPES): {
      return {
        ...state,
        recipes: action.payload.map(changeImageParams) || [],
        isLoading: false,
      };
    }
    case onRejectedAsyncAction(FETCH_SEARCHED_RECIPES): {
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
        recipes: [action.payload].map(changeImageParams) || [],
      };
    }
    case onRejectedAsyncAction(FETCH_RECIPE): {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    //ADD_RECIPE_ACTION
    case onFullfiledAsyncAction(ADD_RECIPE_ACTION): {
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    }
    case onRejectedAsyncAction(ADD_RECIPE_ACTION): {
      return {
        ...state,
        error: action.payload,
      };
    }
    //EDIT_RECIPE_ACTION
    case onFullfiledAsyncAction(EDIT_RECIPE_ACTION): {
      const { payload } = action;
      console.log(payload);
      const editRecipeById = (recipe: IRecipe) => {
        console.log(recipe);
        return recipe.id === payload.id
          ? {
              ...payload,
              mainPhoto: {
                id: payload.main_photo != null ? payload.main_photo.id : 0,
                url:
                  payload.main_photo != null ? `${process.env.REACT_APP_API_PHOTO_URL}${payload.main_photo.path}` : '',
                alt: payload.main_photo != null ? payload.main_photo.filename : '',
              },
            }
          : recipe;
      };

      return {
        ...state,
        recipes: state.recipes.map(editRecipeById),
      };
    }
    case onRejectedAsyncAction(EDIT_RECIPE_ACTION): {
      return {
        ...state,
        error: action.payload,
      };
    }
    case DELETE_INGREDIENT: {
      const { recipeId, ingredientId } = action.payload;
      const deleteIngredientById = (recipe: IRecipe) =>
        recipe.id === recipeId
          ? { ...recipe, ingredients: recipe.ingredients.filter((ingredient) => ingredient.id !== ingredientId) }
          : recipe;
      return {
        ...state,
        recipes: state.recipes.map(deleteIngredientById),
      };
    }
    case ADD_INGREDIENT: {
      const { recipeId, newIngredient } = action.payload;
      const addIngredientToRecipe = (recipe: IRecipe) =>
        recipe.id === recipeId ? { ...recipe, ingredients: [...recipe.ingredients, newIngredient] } : recipe;
      return {
        ...state,
        recipes: state.recipes.map(addIngredientToRecipe),
      };
    }
    case EDIT_INGREDIENT: {
      const { recipeId, ingredientId, changedIngredient } = action.payload;
      const editIngredientById = (recipe: IRecipe) =>
        recipe.id === recipeId
          ? {
              ...recipe,
              ingredients: recipe.ingredients.map((ingredient: IIngredient) =>
                ingredient.id === ingredientId ? { ...ingredient, ...changedIngredient } : ingredient
              ),
            }
          : recipe;

      return {
        ...state,
        recipes: state.recipes.map(editIngredientById),
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
