import { createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../helpers/request';

export const UPLOAD_MAIN_IMAGE_ACTION = 'images/UPLOAD_MAIN_IMAGE_ACTION';
export const UPLOAD_SECONDARY_IMAGE_ACTION = 'images/UPLOAD_SECONDARY_IMAGE_ACTION';
export const UPLOAD_THUMBNAIL_IMAGE_ACTION = 'images/UPLOAD_THUMBNAIL_IMAGE_ACTION';

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
