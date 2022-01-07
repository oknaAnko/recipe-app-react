import { rest } from 'msw';
import data from './data';

export const handlers = [
  rest.post('/recipes', (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get('/recipes', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(data));
  }),

  rest.get('/recipes/recipeId', (req, res, ctx) => {
    const recipeId = req.url.searchParams.get('recipeId');
    if (recipeId === 2) return res(ctx.status(200), ctx.json(data));
  }),
];
