import type { AnyAction } from 'redux';
import { onFullfiledAsyncAction, onPendingAsyncAction, onRejectedAsyncAction } from '../helpers';
import { IImage } from '../interfaces';
import { UPLOAD_MAIN_IMAGE_ACTION } from './actions';
import { UPLOAD_SECONDARY_IMAGE_ACTION } from './actions';
import { UPLOAD_THUMBNAIL_IMAGE_ACTION } from './actions';

export interface IImagesState {
  mainImage?: IImage;
  secondaryImage?: IImage;
  thumbnail?: IImage;
  error: Error | {};
  isLoading: boolean;
}

const defaultState: IImagesState = {
  mainImage: undefined,
  secondaryImage: undefined,
  thumbnail: undefined,
  error: {},
  isLoading: false,
};

export const imagesReducer = (state: IImagesState = defaultState, action: AnyAction): IImagesState => {
  switch (action.type) {
    case onFullfiledAsyncAction(UPLOAD_MAIN_IMAGE_ACTION): {
      return {
        ...state,
        mainImage:
          {
            id: action.payload.id,
            url: `http://api.zilurex.usermd.net/${action.payload.path}`,
            alt: action.payload.filename,
          } || {},
        isLoading: false,
      };
    }
    case onFullfiledAsyncAction(UPLOAD_SECONDARY_IMAGE_ACTION): {
      return {
        ...state,
        secondaryImage:
          {
            id: action.payload.id,
            url: `http://api.zilurex.usermd.net/${action.payload.path}`,
            alt: action.payload.filename,
          } || {},
        isLoading: false,
      };
    }
    case onFullfiledAsyncAction(UPLOAD_THUMBNAIL_IMAGE_ACTION): {
      return {
        ...state,
        thumbnail:
          {
            id: action.payload.id,
            url: `http://api.zilurex.usermd.net/${action.payload.path}`,
            alt: action.payload.filename,
          } || {},
        isLoading: false,
      };
    }
    default:
      return state;
  }
};
