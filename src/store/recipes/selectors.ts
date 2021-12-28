import { createSelector } from "reselect";
import { RootState } from "../store";
import { IRecipesState } from "./reducer";

const recipesState = (state: RootState): IRecipesState => state.recipes;

export const getAllRecipes = createSelector(recipesState, state => state.recipes);
export const getRecipesError = createSelector(recipesState, state => state.error);
export const getRecipesLoadingStatus = createSelector(recipesState, state => state.isLoading);