import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from './Image';
import { uploadMainImage, uploadSecondaryImage, uploadThumbnailImage, deleteImage } from '../../store/images/actions';
import { IImage } from '../../store/interfaces';
import { mainPhotoStyles, secondaryPhotoStyles, thumbnailStyles } from '../../helpers/styles';

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
  uploadedMainPhoto?: IImage;
  uploadedSecondaryPhoto?: IImage;
  uploadedThumbnail?: IImage;
}) => {
  const [mainImageInput, setMainImageInput] = useState<File | null>(null);
  const [secondaryImageInput, setSecondaryImageInput] = useState<File>();
  const [thumbnailInput, setThumbnailInput] = useState<File>();

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

  const removeImageFromServer = (imageId: string | number) => dispatch(deleteImage(imageId));
  const handleRemoveImageClick = (imageId: string | number) => {
    removeImageFromServer(imageId);
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
          onChange={handleMainImageChange}
        />
        <button
          className='btn btn-primary rounded-1 btn-sm'
          type='button'
          id='inputGroupFileAddon04'
          onClick={handleMainImageUploadClick}>
          Button
        </button>
      </div>
      {(uploadedMainPhoto || mainPhoto) && (
        <Image
          recipeId={recipeId}
          style={mainPhotoStyles}
          image={uploadedMainPhoto ? uploadedMainPhoto : mainPhoto}
          imageId={uploadedMainPhoto ? uploadedMainPhoto.id : mainPhoto.id}
          handleRemoveImageClick={handleRemoveImageClick}
        />
      )}
      <div className='input-group my-5'>
        <input
          type='file'
          className='form-control form-control-sm'
          id='inputGroupFile04'
          aria-describedby='inputGroupFileAddon04'
          aria-label='Upload'
          onChange={handleSecondaryImageChange}
        />
        <button
          className='btn btn-primary rounded-1 btn-sm'
          type='button'
          id='inputGroupFileAddon04'
          onClick={handleSecondaryUploadClick}>
          Button
        </button>
      </div>
      {(uploadedSecondaryPhoto || secondaryPhoto) && (
        <Image
          recipeId={recipeId}
          style={secondaryPhotoStyles}
          image={uploadedSecondaryPhoto ? uploadedSecondaryPhoto : secondaryPhoto}
          imageId={uploadedSecondaryPhoto ? uploadedSecondaryPhoto.id : secondaryPhoto.id}
          handleRemoveImageClick={handleRemoveImageClick}
        />
      )}
      <div className='input-group my-5'>
        <input
          type='file'
          className='form-control form-control-sm'
          id='inputGroupFile04'
          aria-describedby='inputGroupFileAddon04'
          aria-label='Upload'
          onChange={handleThumbnailImageChange}
        />
        <button
          className='btn btn-primary rounded-1 btn-sm'
          type='button'
          id='inputGroupFileAddon04'
          onClick={handleThumbnailUploadClick}>
          Button
        </button>
      </div>
      {(uploadedThumbnail || thumbnail) && (
        <Image
          recipeId={recipeId}
          style={thumbnailStyles}
          image={uploadedThumbnail ? uploadedThumbnail : thumbnail}
          imageId={uploadedThumbnail ? uploadedThumbnail.id : thumbnail.id}
          handleRemoveImageClick={handleRemoveImageClick}
        />
      )}
    </div>
  );
};

export default Images;
