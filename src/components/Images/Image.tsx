import { IImage, IImageStyles } from '../../store/interfaces';

const Image = ({
  image,
  style,
  handleRemoveImageClick,
}: {
  image: IImage;
  style: IImageStyles;
  handleRemoveImageClick: (e: React.FormEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <div className='img-container mx-auto'>
      {image.url && (
        <>
          <img src={image ? image.url : ''} alt={image ? image.alt : ''} style={style} />
          <button
            type='button'
            className='btn-close btn-close-white btn-in-img'
            aria-label='Close'
            onClick={handleRemoveImageClick}></button>
        </>
      )}
    </div>
  );
};

export default Image;
