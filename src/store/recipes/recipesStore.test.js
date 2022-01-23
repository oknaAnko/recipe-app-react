import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockAxios from 'axios';
import { onFullfiledAsyncAction, onPendingAsyncAction, onRejectedAsyncAction } from '../helpers';

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
  FETCH_RECIPE,
  RESET_STORE,
  addRecipe,
  editRecipe,
  fetchRecipe,
  fetchAllRecipes,
} from './actions';
import { recipesReducer } from './reducer';

it('should return the initial state', () => {
  expect(recipesReducer(undefined, {})).toEqual({
    recipes: [],
    error: {},
    isLoading: false,
  });
});

it('passes dispatch FETCH_RECIPE ', () => {
  const { store, invoke } = create();
  invoke((dispatch) => {
    dispatch('FETCH_RECIPE');
    getState();
  });
  expect(store.dispatch).toHaveBeenCalledWith('FETCH_RECIPE');
});

it('passes dispatch FETCH_ALL_RECIPES ', () => {
  const { store, invoke } = create();
  invoke((dispatch) => {
    dispatch('FETCH_ALL_RECIPES');
    getState();
  });
  expect(store.dispatch).toHaveBeenCalledWith('FETCH_ALL_RECIPES');
});

//! FETCH RECIPE ACTION
it('should fetch one recipe to store', () => {
  const previousState = {
    recipes: [],
    error: {},
    isLoading: false,
  };

  const id = 2;

  const recipe = {
    id: 2,
    title: 'Ciasteczka owsi2ane z masłem orzechowym',
    ingredients: [
      {
        id: 1,
        amount: 1,
        unit: 'szt.',
        name: 'granoli orzechowej',
      },
      {
        id: 2,
        amount: 1,
        unit: 'szt.',
        name: 'masy kajmakowej',
      },
      {
        id: 3,
        amount: 4,
        unit: 'szt.',
        name: 'bananów',
      },
      {
        id: 4,
        amount: 300,
        unit: 'ml',
        name: 'śmietany kremówki 30-36%',
      },
      {
        id: 5,
        amount: 1,
        unit: 'szt.',
        name: 'mascarpone',
      },
    ],
    preparation:
      'Banany i kiwi obieramy ze skórki.1,5 banana kroimy na kawałki i dokładnie rozdrabniamy blenderem.To samo robimy z 2,5 kiwi.Nie mieszamy ze sobą owoców. Pozostałe części owoców kroimy w drobną kostkę i dodajemy do tych rozdrobnionych.Jogurt grecki energicznie mieszamy,aby miał jednolitą konsystencję. Do szklaneczek wlewamy warstwowo(łyżeczką) jogurt grecki,odrobinę płatków migdałowych,banana,ponownie jogurt grecki,kiwi,odrobinę płatków migdałowych i pozostały jogurt grecki. Śmietanę miksujemy z odrobiną cukru.Ubitą śmietaną dekorujemy górę deseru.Udekorować świeżymi owocami albo posypać startą czekoladą.Podawać od razu albo lekko schłodzone. Z tych składników wychodzi 3 pucharki.',
    tips: '',
    tags: [
      {
        id: 1,
        category: 'słodkie',
        name: 'bez pieczenia',
        active: false,
      },
      {
        id: 2,
        category: 'słodkie',
        name: 'serniki',
        active: false,
      },
    ],
  };

  console.log(fetchRecipe(FETCH_RECIPE, id));

  expect(recipesReducer(previousState, { type: onFullfiledAsyncAction(FETCH_RECIPE), payload: recipe })).toEqual({
    recipes: [recipe],
    error: {},
    isLoading: false,
  });
});

//! ADD RECIPE ACTION
it('should add a recipe to the list', () => {
  const currentRecipe = {
    id: 1,
    title: 'Ciasteczka owsi2ane z masłem orzechowym',
    ingredients: [
      {
        id: 1,
        amount: 1,
        unit: 'szt.',
        name: 'granoli orzechowej',
      },
      {
        id: 2,
        amount: 1,
        unit: 'szt.',
        name: 'masy kajmakowej',
      },
      {
        id: 3,
        amount: 4,
        unit: 'szt.',
        name: 'bananów',
      },
      {
        id: 4,
        amount: 300,
        unit: 'ml',
        name: 'śmietany kremówki 30-36%',
      },
      {
        id: 5,
        amount: 1,
        unit: 'szt.',
        name: 'mascarpone',
      },
    ],
    preparation:
      'Banany i kiwi obieramy ze skórki.1,5 banana kroimy na kawałki i dokładnie rozdrabniamy blenderem.To samo robimy z 2,5 kiwi.Nie mieszamy ze sobą owoców. Pozostałe części owoców kroimy w drobną kostkę i dodajemy do tych rozdrobnionych.Jogurt grecki energicznie mieszamy,aby miał jednolitą konsystencję. Do szklaneczek wlewamy warstwowo(łyżeczką) jogurt grecki,odrobinę płatków migdałowych,banana,ponownie jogurt grecki,kiwi,odrobinę płatków migdałowych i pozostały jogurt grecki. Śmietanę miksujemy z odrobiną cukru.Ubitą śmietaną dekorujemy górę deseru.Udekorować świeżymi owocami albo posypać startą czekoladą.Podawać od razu albo lekko schłodzone. Z tych składników wychodzi 3 pucharki.',
    tips: '',
    tags: [
      {
        id: 1,
        category: 'słodkie',
        name: 'bez pieczenia',
        active: false,
      },
      {
        id: 2,
        category: 'słodkie',
        name: 'serniki',
        active: false,
      },
    ],
  };

  const previousState = {
    recipes: [currentRecipe],
    error: {},
    isLoading: false,
  };

  const newRecipe = {
    id: 2,
    title: 'Ciasteczka 2',
    ingredients: [
      {
        id: 1,
        amount: 1,
        unit: 'szt.',
        name: 'granoli orzechowej',
      },
      {
        id: 2,
        amount: 1,
        unit: 'szt.',
        name: 'masy kajmakowej',
      },
      {
        id: 3,
        amount: 4,
        unit: 'szt.',
        name: 'bananów',
      },
      {
        id: 4,
        amount: 300,
        unit: 'ml',
        name: 'śmietany kremówki 30-36%',
      },
      {
        id: 5,
        amount: 1,
        unit: 'szt.',
        name: 'mascarpone',
      },
    ],
    preparation: 'Banany i kiwi obieramy ze skórki.',
    tips: '',
    tags: [
      {
        id: 1,
        category: 'słodkie',
        name: 'bez pieczenia',
        active: false,
      },
      {
        id: 2,
        category: 'słodkie',
        name: 'serniki',
        active: false,
      },
    ],
  };

  expect(
    recipesReducer(previousState, { type: onFullfiledAsyncAction(ADD_RECIPE_ACTION), payload: newRecipe })
  ).toEqual({
    recipes: [currentRecipe, newRecipe],
    error: {},
    isLoading: false,
  });
});

//! EDIT RECIPE ACTION
it('should edit a recipe', () => {
  const currentRecipe = {
    id: 3,
    title: 'Ciasteczka owsi2ane z masłem orzechowym',
    ingredients: [
      {
        id: 1,
        amount: 1,
        unit: 'szt.',
        name: 'granoli orzechowej',
      },
      {
        id: 2,
        amount: 1,
        unit: 'szt.',
        name: 'masy kajmakowej',
      },
      {
        id: 3,
        amount: 4,
        unit: 'szt.',
        name: 'bananów',
      },
      {
        id: 4,
        amount: 300,
        unit: 'ml',
        name: 'śmietany kremówki 30-36%',
      },
      {
        id: 5,
        amount: 1,
        unit: 'szt.',
        name: 'mascarpone',
      },
    ],
    preparation:
      'Banany i kiwi obieramy ze skórki.1,5 banana kroimy na kawałki i dokładnie rozdrabniamy blenderem.To samo robimy z 2,5 kiwi.Nie mieszamy ze sobą owoców. Pozostałe części owoców kroimy w drobną kostkę i dodajemy do tych rozdrobnionych.Jogurt grecki energicznie mieszamy,aby miał jednolitą konsystencję. Do szklaneczek wlewamy warstwowo(łyżeczką) jogurt grecki,odrobinę płatków migdałowych,banana,ponownie jogurt grecki,kiwi,odrobinę płatków migdałowych i pozostały jogurt grecki. Śmietanę miksujemy z odrobiną cukru.Ubitą śmietaną dekorujemy górę deseru.Udekorować świeżymi owocami albo posypać startą czekoladą.Podawać od razu albo lekko schłodzone. Z tych składników wychodzi 3 pucharki.',
    tips: '',
    tags: [
      {
        id: 1,
        category: 'słodkie',
        name: 'bez pieczenia',
        active: false,
      },
      {
        id: 2,
        category: 'słodkie',
        name: 'serniki',
        active: false,
      },
    ],
  };

  const previousState = {
    recipes: [currentRecipe],
    error: {},
    isLoading: false,
  };

  const changedRecipe = {
    id: 3,
    title: 'Inny tytuł',
    ingredients: [
      {
        id: 1,
        amount: 1,
        unit: 'szt.',
        name: 'granoli orzechowej',
      },
      {
        id: 2,
        amount: 1,
        unit: 'szt.',
        name: 'masy kajmakowej',
      },
      {
        id: 3,
        amount: 4,
        unit: 'szt.',
        name: 'bananów',
      },
      {
        id: 4,
        amount: 300,
        unit: 'ml',
        name: 'śmietany kremówki 30-36%',
      },
      {
        id: 5,
        amount: 1,
        unit: 'szt.',
        name: 'mascarpone',
      },
    ],
    preparation: 'Inny opis przygotowania',
    tips: 'inne porady',
    tags: [
      {
        id: 1,
        category: 'słodkie',
        name: 'bez pieczenia',
        active: false,
      },
      {
        id: 2,
        category: 'słodkie',
        name: 'serniki',
        active: false,
      },
    ],
  };

  expect(
    recipesReducer(
      previousState,
      editRecipe(EDIT_RECIPE_ACTION, { id, changedRecipe }).toEqual({
        recipes: [changedRecipe],
        error: {},
        isLoading: false,
      })
    )
  );
});
