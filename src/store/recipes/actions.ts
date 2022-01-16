import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IIngredient, IRecipe } from '../interfaces';
import request from '../../helpers/request';

export const ADD_RECIPE_ACTION = 'recipes/ADD_RECIPE';
export const EDIT_RECIPE_ACTION = 'recipes/EDIT_RECIPE';
export const DELETE_INGREDIENT = 'recipes/DELETE_INGREDIENT';
export const EDIT_INGREDIENT = 'recipes/EDIT_INGREDIENT';
export const ADD_INGREDIENT = 'recipes/ADD_INGREDIENT';
export const SET_RECIPES_ERROR = 'recipes/SET_RECIPES_ERROR';
export const CLEAR_RECIPES_ERROR = 'recipes/CLEAR_RECIPES_ERROR';
export const SET_RECIPES_LOADING_STATUS = 'recipes/SET_RECIPES_LOADING_STATUS';
export const FETCH_ALL_RECIPES = 'recipes/FETCH_ALL_RECIPES';
export const FETCH_SEARCHED_RECIPES = 'recipes/FETCH_SEARCHED_RECIPES';
export const FETCH_RECIPE = 'recipes/FETCH_RECIPE';
export const RESET_STORE = 'recipes/RESET_STORE';

export const deleteIngredient =
  createAction<{ recipeId: number | string; ingredientId: number | string }>(DELETE_INGREDIENT);
export const editIngredient =
  createAction<{ recipeId: number | string; ingredientId: number | string; changedIngredient: IIngredient }>(
    EDIT_INGREDIENT
  );
export const addIngredient = createAction<{ recipeId: number | string; newIngredient: IIngredient }>(ADD_INGREDIENT);

export const setRecipesLoadingStatus = createAction<boolean>(SET_RECIPES_LOADING_STATUS);
export const setRecipesError = createAction<Error>(SET_RECIPES_ERROR);
export const clearRecipesError = createAction<void>(CLEAR_RECIPES_ERROR);
export const resetStore = createAction<void>(RESET_STORE);

export const fetchAllRecipes = createAsyncThunk(FETCH_ALL_RECIPES, () =>
  request
    .get('/recipes')
    .then((res) => res.data)
    .catch((err) => err)
);

export const fetchRecipe = createAsyncThunk(FETCH_RECIPE, (id: number) =>
  request
    .get(`/recipes/${id}`)
    .then((res) => res.data)
    .catch((err) => err)
);

export const fetchSearchedRecipes = createAsyncThunk(FETCH_SEARCHED_RECIPES, (searchTerm: string) =>
  request
    .get(`/recipes?title=${searchTerm}`)
    .then((res) => res.data)
    .catch((err) => err)
);

export const addRecipe = createAsyncThunk(ADD_RECIPE_ACTION, (newRecipe: IRecipe) =>
  request
    .post('/recipes', newRecipe)
    .then((res) => res.data)
    .catch((err) => err)
);

export const editRecipe = createAsyncThunk(
  EDIT_RECIPE_ACTION,
  ({ id, changedRecipe }: { id: number | string; changedRecipe: Partial<IRecipe> }) => {
    request
      .post(`/recipes/${id}`, changedRecipe)
      .then((res) => res.data)
      .catch((err) => err);
  }
);
