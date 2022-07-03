import { IImageStyles } from '../store/interfaces';

export const mainPhotoStyles: IImageStyles = {
  width: '100%',
  height: '500px',
  borderRadius: '.2rem',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  border: ' 1px solid black',
};

export const secondaryPhotoStyles: IImageStyles = {
  width: '100%',
  height: '200px',
  borderRadius: '.2rem',
  // backgroundSize: 'cover',
  backgroundPosition: 'center',
  border: ' 1px solid black',
};

export const thumbnailStyles: IImageStyles = {
  width: '100%',
  height: '150px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  margin: '0 auto',
};
