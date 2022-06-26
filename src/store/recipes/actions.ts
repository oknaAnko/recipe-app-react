import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import history from '../../helpers/history';
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
  createAction<{ recipeId: IRecipe['id']; ingredientId: IIngredient['id'] }>(DELETE_INGREDIENT);
export const editIngredient =
  createAction<{ recipeId: IRecipe['id']; ingredientId: IIngredient['id']; changedIngredient: IIngredient }>(
    EDIT_INGREDIENT
  );
export const addIngredient = createAction<{ recipeId: IRecipe['id']; newIngredient: IIngredient }>(ADD_INGREDIENT);

export const setRecipesLoadingStatus = createAction<boolean>(SET_RECIPES_LOADING_STATUS);
export const setRecipesError = createAction<IError>(SET_RECIPES_ERROR);
export const clearRecipesError = createAction<void>(CLEAR_RECIPES_ERROR);
export const resetStore = createAction<void>(RESET_STORE);

export const fetchAllRecipes = createAsyncThunk(FETCH_ALL_RECIPES, (_, { rejectWithValue }) =>
  request
    .get('/recipes')
    .then((res) => res.data)
    .catch((err) => {
      return rejectWithValue({ status: err.response.status, statusText: err.response.statusText });
    })
);

export const fetchRecipe = createAsyncThunk(FETCH_RECIPE, (id: IRecipe['id'], { rejectWithValue }) =>
  request
    .get(`/recipes/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      return rejectWithValue({ status: err.response.status, statusText: err.response.statusText });
    })
);

export const fetchSearchedRecipes = createAsyncThunk(
  FETCH_SEARCHED_RECIPES,
  (searchTerm: string, { rejectWithValue }) =>
    request
      .get(`/recipes?title=${searchTerm}`)
      .then((res) => {
        console.log(res.data.items);
        history.push(`/przepisy/${searchTerm}`);
        return res.data.items;
      })
      .catch((err) => {
        return rejectWithValue({ status: err.response.status, statusText: err.response.statusText });
      })
);

export const addRecipe = createAsyncThunk(ADD_RECIPE_ACTION, (newRecipe: IRecipe, { rejectWithValue }) =>
  request
    .post('/recipes', newRecipe)
    .then((res) => {
      console.log(res.data);
      history.push(`/${res.data.id}/edit`);
      return res.data;
    })
    .catch((err) => {
      return rejectWithValue({ status: err.response.status, statusText: err.response.statusText });
    })
);

export const editRecipe = createAsyncThunk(
  EDIT_RECIPE_ACTION,
  ({ id, changedRecipe }: { id: IRecipe['id']; changedRecipe: Partial<IRecipe> }, { rejectWithValue }) =>
    request
      .put(`/recipes/${id}`, changedRecipe)
      .then((res) => {
        console.log(res.data);
        history.push(`/${id}`);
        return res.data;
      })
      .catch((err) => {
        return rejectWithValue({ status: err.response.status, statusText: err.response.statusText });
      })
);
