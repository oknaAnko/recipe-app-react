import { fireEvent, render, waitFor } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import mockAxios from 'axios';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

test('renders confirm button only for one ingredient after edit button is clicked ', async () => {
  mockAxios.get.mockImplementationOnce(() => {
    return Promise.resolve({
      data: {
        id: 1,
        title: 'Ciasteczka owsiasdasd2ane z masłem orzechowym',
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
      },
    });
  });

  const { container, queryByText } = renderWithRouter(<App />, { route: '1/edit' });

  await waitFor(() => {
    expect(queryByText('Brak danych')).not.toBeInTheDocument();
  });

  console.log(container.outerHTML);

  expect(container.querySelectorAll('.bi-pencil-fill').length).toBe(5);
  expect(container.querySelectorAll('.bi-check2').length).toBe(0);

  const editButton = container.querySelector('.bi-pencil-fill').parentElement;
  fireEvent.click(editButton);

  expect(container.querySelectorAll('.bi-pencil-fill').length).toBe(4);
  expect(container.querySelectorAll('.bi-check2').length).toBe(1);
});
