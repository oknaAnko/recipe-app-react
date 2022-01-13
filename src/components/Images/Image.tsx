import { IImage } from '../../store/interfaces';

const Image = ({
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
  return (
    <div className='text-center'>
      <img
        src={uploadedMainPhoto ? uploadedMainPhoto.url : mainPhoto ? mainPhoto.url : ''}
        className='rounded img-page'
        alt={mainPhoto.alt}
      />
      <img
        src={uploadedSecondaryPhoto ? uploadedSecondaryPhoto.url : secondaryPhoto ? secondaryPhoto.url : ''}
        className='rounded img-page'
        alt={mainPhoto.alt}
      />
      <img
        src={uploadedThumbnail ? uploadedThumbnail.url : thumbnail ? thumbnail.url : ''}
        className='rounded img-page'
        alt={mainPhoto.alt}
      />
    </div>
  );
};

export default Image;
