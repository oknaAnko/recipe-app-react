import { configureStore } from '@reduxjs/toolkit';
import { imagesReducer } from './images/reducer';
import { recipesReducer } from './recipes/reducer';

const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    image: imagesReducer,
    // tags: tagsReducer,
    // user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
