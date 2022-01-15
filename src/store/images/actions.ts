import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../helpers/request';

export const UPLOAD_MAIN_IMAGE_ACTION = 'images/UPLOAD_MAIN_IMAGE_ACTION';
export const UPLOAD_SECONDARY_IMAGE_ACTION = 'images/UPLOAD_SECONDARY_IMAGE_ACTION';
export const UPLOAD_THUMBNAIL_IMAGE_ACTION = 'images/UPLOAD_THUMBNAIL_IMAGE_ACTION';
export const DELETE_IMAGE = 'images/DELETE_IMAGE';
export const DELETE_MAIN_IMAGE = 'images/DELETE_MAIN_IMAGE';
export const DELETE_SECONDARY_IMAGE = 'images/DELETE_SECONDARY_IMAGE';
export const DELETE_THUMBNAIL_IMAGE = 'images/DELETE_THUMBNAIL_IMAGE';

const imagesEndpointUrl = 'https://api.zilurex.usermd.net/api/v1/images';
const axiosHeadersConfig = {
  header: {
    'content-type': 'multipart-form-data',
  },
  data: {},
};

export const uploadMainImage = createAsyncThunk(UPLOAD_MAIN_IMAGE_ACTION, async (newImage: File) => {
  let formData = new FormData();
  formData.set('upload', newImage);
  const response = await request.post(imagesEndpointUrl, formData, axiosHeadersConfig);
  return response.data;
});

export const uploadSecondaryImage = createAsyncThunk(UPLOAD_SECONDARY_IMAGE_ACTION, async (newImage: File) => {
  let formData = new FormData();
  formData.set('upload', newImage);
  const response = await request.post(imagesEndpointUrl, formData, axiosHeadersConfig);
  return response.data;
});

export const uploadThumbnailImage = createAsyncThunk(UPLOAD_THUMBNAIL_IMAGE_ACTION, async (newImage: File) => {
  let formData = new FormData();
  formData.set('upload', newImage);
  const response = await request.post(imagesEndpointUrl, formData, axiosHeadersConfig);
  return response.data;
});

export const deleteMainImage = createAction<void>(DELETE_MAIN_IMAGE);
export const deleteSecondaryImage = createAction<void>(DELETE_SECONDARY_IMAGE);
export const deleteThumbnail = createAction<void>(DELETE_THUMBNAIL_IMAGE);
