import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IngredientForm from './IngredientForm';
import Ingredient from './Ingredient';
import Ingredients from './Ingredients';
import * as redux from 'react-redux';
import * as actions from '../../store/recipes/actions';
import { Provider } from 'react-redux';
import store from '../../store/store';

it('empty IngredientForm renders when button clicked', async () => {
  render(
    <Provider store={store}>
      <Ingredients isEditMode={true} />
    </Provider>
  );
  const addIngredientBtn = await waitFor(() => screen.getByTestId('add-ingredient-btn'));
  userEvent.click(addIngredientBtn);

  expect(screen.getByTestId('form')).toBeInTheDocument();
});

it('filled IngredientForm renders when button clicked', async () => {
  render(
    <Provider store={store}>
      <Ingredient ingredientId={2} amount={4} unit={'szt'} name={'bananas'} isEditMode={true} />
    </Provider>
  );
  const editButton = await waitFor(() => screen.getByTestId('edit-btn-2'));
  userEvent.click(editButton);

  expect(screen.getByTestId('form')).toBeInTheDocument();
});

it('calls editIngredient fn when button clicked', async () => {
  const editIngredientAction = jest
    .spyOn(actions, 'editIngredient')
    .mockImplementation(({ recipeId, ingredientId, changedIngredient }) => {
      recipeId, ingredientId, changedIngredient;
    });

  const mockDispatch = () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    return mockDispatchFn;
  };

  const mockedDispatch = mockDispatch();

  const recipeId = 2;
  const ingredientId = 1;
  const changedIngredient = {
    id: ingredientId,
    amount: 4,
    name: 'bananas',
    unit: 'szt',
  };

  render(
    <Provider store={store}>
      <IngredientForm
        recipeId={recipeId}
        ingredientId={ingredientId}
        amount={4}
        name={'bananas'}
        unit={'szt'}
        isIngredientInEdition={true}
        closeIngredientEdition={() => {}}
      />
    </Provider>
  );

  const confirmButton = await waitFor(() => screen.getByTestId('confirm-btn'));
  userEvent.click(confirmButton);

  expect(mockedDispatch).toHaveBeenCalledTimes(1);
  expect(mockedDispatch).toHaveBeenCalledWith(editIngredientAction({ recipeId, ingredientId, changedIngredient }));
});

it('calls addIngredient fn when button clicked', async () => {
  const addIngredientAction = jest.spyOn(actions, 'addIngredient').mockImplementation(({ recipeId, newIngredient }) => {
    recipeId, newIngredient;
  });

  const mockDispatch = () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    return mockDispatchFn;
  };

  const mockedDispatch = mockDispatch();

  const recipeId = 2;
  const newIngredient = {
    id: '1234567',
    amount: 4,
    name: 'bananas',
    unit: 'szt',
  };

  render(
    <Provider store={store}>
      <IngredientForm recipeId={recipeId} ingredientId={'1234567'} amount={4} name={'bananas'} unit={'szt'} />
    </Provider>
  );

  const confirmButton = await waitFor(() => screen.getByTestId('confirm-btn'));
  userEvent.click(confirmButton);

  expect(mockedDispatch).toHaveBeenCalledTimes(1);
  expect(mockedDispatch).toHaveBeenCalledWith(addIngredientAction({ recipeId, newIngredient }));
});

it('calls deleteCurrentIngredient fn when button clicked', async () => {
  const deleteCurrentIngredient = jest.fn();

  const recipeId = 2;
  const ingredientId = 1;

  render(
    <Provider store={store}>
      <IngredientForm
        recipeId={recipeId}
        ingredientId={ingredientId}
        amount={4}
        name={'bananas'}
        unit={'szt'}
        isNewIngredientAdded={false}
        deleteCurrentIngredient={deleteCurrentIngredient}
      />
    </Provider>
  );

  const removeButton = await waitFor(() => screen.getByTestId('remove-btn'));
  userEvent.click(removeButton);

  expect(deleteCurrentIngredient).toHaveBeenCalledTimes(1);
});

it('calls deleteNewIngredient fn when button clicked', async () => {
  const deleteNewIngredient = jest.fn();

  const recipeId = 2;
  const ingredientId = 1;

  render(
    <Provider store={store}>
      <IngredientForm
        recipeId={recipeId}
        ingredientId={ingredientId}
        amount={4}
        name={'bananas'}
        unit={'szt'}
        isNewIngredientAdded={true}
        deleteNewIngredient={deleteNewIngredient}
      />
    </Provider>
  );

  const removeButton = await waitFor(() => screen.getByTestId('remove-btn'));
  userEvent.click(removeButton);

  expect(deleteNewIngredient).toHaveBeenCalledTimes(1);
});
