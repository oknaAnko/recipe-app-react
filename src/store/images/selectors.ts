import { createSelector } from 'reselect';
import { RootState } from '../store';
import { IImagesState } from './reducer';

const imagesState = (state: RootState): IImagesState => state.image;

export const getMainImage = createSelector(imagesState, (state) => state.mainImage);
export const getSecondaryImage = createSelector(imagesState, (state) => state.secondaryImage);
export const getThumbnailImage = createSelector(imagesState, (state) => state.thumbnail);
