import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Recipe from './Recipe';

it('renders a recipe title', async () => {
  render(
    <Provider store={store}>
      <Recipe title='Ciasteczka' />
    </Provider>
  );
  const divElement = await waitFor(() => screen.getByRole('recipe-info'));
  expect(divElement).toHaveTextContent('Ciasteczka');
});
