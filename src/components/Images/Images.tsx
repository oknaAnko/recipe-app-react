import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from './Image';
import { uploadMainImage, uploadSecondaryImage, uploadThumbnailImage } from '../../store/images/actions';
import { IImage } from '../../store/interfaces';

const Images = ({
  recipeId,
  mainPhoto,
  secondaryPhoto,
  thumbnail,
  uploadedMainPhoto,
  uploadedSecondaryPhoto,
  uploadedThumbnail,
}: {
  recipeId: number | string;
  mainPhoto: IImage;
  secondaryPhoto: IImage;
  thumbnail: IImage;
  uploadedMainPhoto: IImage;
  uploadedSecondaryPhoto: IImage;
  uploadedThumbnail: IImage;
}) => {
  const [mainImageInput, setMainImageInput] = useState<File>();
  const [secondaryImageInput, setSecondaryImageInput] = useState<File>();
  const [thumbnailInput, setThumbnailInput] = useState<File>();
  const [isMainPhotoAdded, setIsMainPhotoAdded] = useState<boolean>(false); //true=photo uploaded, action succesful

  const dispatch = useDispatch();
  const sendMainImageToServer = (newImage: File) => dispatch(uploadMainImage(newImage));
  const sendSecondaryImageToServer = (newImage: File) => dispatch(uploadSecondaryImage(newImage));
  const sendThumbnailImageToServer = (newImage: File) => dispatch(uploadThumbnailImage(newImage));

  const handleMainImageUploadClick = () => {
    mainImageInput && sendMainImageToServer(mainImageInput);
  };
  const handleSecondaryUploadClick = () => {
    secondaryImageInput && sendSecondaryImageToServer(secondaryImageInput);
  };
  const handleThumbnailUploadClick = () => {
    thumbnailInput && sendThumbnailImageToServer(thumbnailInput);
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    const fileObj = fileList[0];
    setMainImageInput(fileObj);
  };
  const handleSecondaryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    const fileObj = fileList[0];
    setSecondaryImageInput(fileObj);
  };
  const handleThumbnailImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    const fileObj = fileList[0];
    setThumbnailInput(fileObj);
  };

  return (
    <div className='mb-3'>
      <div className='input-group'>
        <input
          type='file'
          className='form-control form-control-sm'
          id='inputGroupFile04'
          aria-describedby='inputGroupFileAddon04'
          aria-label='Upload'
          onChange={handleMainImageChange}
        />
        <button
          className='btn btn-secondary btn-sm'
          type='button'
          id='inputGroupFileAddon04'
          onClick={handleMainImageUploadClick}>
          Button
        </button>
      </div>
      <div className='input-group'>
        <input
          type='file'
          className='form-control form-control-sm'
          id='inputGroupFile04'
          aria-describedby='inputGroupFileAddon04'
          aria-label='Upload'
          onChange={handleSecondaryImageChange}
        />
        <button
          className='btn btn-secondary btn-sm'
          type='button'
          id='inputGroupFileAddon04'
          onClick={handleSecondaryUploadClick}>
          Button
        </button>
      </div>
      <div className='input-group'>
        <input
          type='file'
          className='form-control form-control-sm'
          id='inputGroupFile04'
          aria-describedby='inputGroupFileAddon04'
          aria-label='Upload'
          onChange={handleThumbnailImageChange}
        />
        <button
          className='btn btn-secondary btn-sm'
          type='button'
          id='inputGroupFileAddon04'
          onClick={handleThumbnailUploadClick}>
          Button
        </button>
      </div>
      <div className='text-center'>
        {isMainPhotoAdded && (
          <Image
            recipeId={recipeId}
            mainPhoto={mainPhoto}
            secondaryPhoto={secondaryPhoto}
            thumbnail={thumbnail}
            uploadedMainPhoto={uploadedMainPhoto}
            uploadedSecondaryPhoto={uploadedSecondaryPhoto}
            uploadedThumbnail={uploadedThumbnail}
          />
        )}
      </div>
    </div>
  );
};

export default Images;
