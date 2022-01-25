import React, { useState } from 'react';
import Image from './Image';
import { IImage } from '../../store/interfaces';
import { mainPhotoStyles } from '../../helpers/styles';
import request from '../../helpers/request';

const imagesEndpointUrl = 'https://api.zilurex.usermd.net/api/v1/images';
const axiosHeadersConfig = {
  header: {
    'content-type': 'multipart-form-data',
  },
  data: {},
};

const Images = ({
  setUploadedPhoto,
  currentPhoto,
  uploadedPhoto,
}: {
  setUploadedPhoto: (object: IImage) => void;
  currentPhoto: IImage;
  uploadedPhoto?: IImage;
}) => {
  const [mainImageInput, setMainImageInput] = useState<File | null>(null);

  const uploadImage = async (newImage: File) => {
    try {
      let formData = new FormData();
      formData.set('upload', newImage);
      const response = await request.post(imagesEndpointUrl, formData, axiosHeadersConfig);
      const newObjImage: IImage = {
        id: response.data.id,
        url: `http://api.zilurex.usermd.net/${response.data.path}`,
        alt: response.data.filename,
      };
      setUploadedPhoto(newObjImage);
    } catch (error) {
      alert(error);
    }
  };

  const handleImageUploadClick = () => {
    mainImageInput && uploadImage(mainImageInput);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    const fileObj = fileList[0];
    setMainImageInput(fileObj);
  };

  const handleRemoveImageClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUploadedPhoto({
      id: 0,
      url: '',
      alt: '',
    });
  };

  return (
    <div className='mb-3'>
      <div className='input-group my-5'>
        <input
          type='file'
          className='form-control form-control-sm'
          id='inputGroupFile04'
          aria-describedby='inputGroupFileAddon04'
          aria-label='Upload'
          onChange={handleImageChange}
        />
        <button
          className='btn btn-primary rounded-1 btn-sm'
          type='button'
          id='inputGroupFileAddon04'
          onClick={handleImageUploadClick}>
          Button
        </button>
      </div>
      {(uploadedPhoto || currentPhoto) && (
        <Image
          style={mainPhotoStyles}
          image={uploadedPhoto ? uploadedPhoto : currentPhoto}
          imageId={uploadedPhoto ? uploadedPhoto.id : currentPhoto.id}
          handleRemoveImageClick={handleRemoveImageClick}
        />
      )}
    </div>
  );
};

export default Images;
