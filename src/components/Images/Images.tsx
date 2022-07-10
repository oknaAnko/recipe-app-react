import React, { useEffect, useState } from 'react';
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
  uploadedPhoto: IImage;
}) => {
  const [mainImageInput, setMainImageInput] = useState<File | null>(null);

  useEffect(() => {
    console.log(mainImageInput);
    mainImageInput && uploadImage(mainImageInput);
  }, [mainImageInput]);

  const uploadImage = async (newImage: File) => {
    try {
      let formData = new FormData();
      formData.set('upload', newImage);
      const response = await request.post(imagesEndpointUrl, formData, axiosHeadersConfig);
      const newObjImage: IImage = {
        id: response.data.id,
        url: `${process.env.REACT_APP_API_PHOTO_URL}${response.data.path}`,
        alt: response.data.filename,
      };
      setUploadedPhoto(newObjImage);
    } catch (error) {
      alert(error);
    }
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
          id='formFileSm'
          aria-label='Upload'
          onChange={handleImageChange}
        />
      </div>
      {(uploadedPhoto || currentPhoto) && (
        <Image
          style={mainPhotoStyles}
          image={uploadedPhoto ? uploadedPhoto : currentPhoto}
          handleRemoveImageClick={handleRemoveImageClick}
        />
      )}
    </div>
  );
};

export default Images;
