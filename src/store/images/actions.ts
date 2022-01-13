import { createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../helpers/request';

export const UPLOAD_MAIN_IMAGE_ACTION = 'images/UPLOAD_MAIN_IMAGE_ACTION';
export const UPLOAD_SECONDARY_IMAGE_ACTION = 'images/UPLOAD_SECONDARY_IMAGE_ACTION';
export const UPLOAD_THUMBNAIL_IMAGE_ACTION = 'images/UPLOAD_THUMBNAIL_IMAGE_ACTION';

export const uploadMainImage = createAsyncThunk(UPLOAD_MAIN_IMAGE_ACTION, (newImage: File) =>
  request
    .post('/images', { upload: newImage })
    .then((res) => res.data)
    .catch((err) => err)
);
export const uploadSecondaryImage = createAsyncThunk(UPLOAD_SECONDARY_IMAGE_ACTION, (newImage: File) =>
  request
    .post('/images', { upload: newImage })
    .then((res) => res.data)
    .catch((err) => err)
);
export const uploadThumbnailImage = createAsyncThunk(UPLOAD_THUMBNAIL_IMAGE_ACTION, (newImage: File) =>
  request
    .post('/images', { upload: newImage })
    .then((res) => res.data)
    .catch((err) => err)
);
