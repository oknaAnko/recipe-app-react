import { IImage, IImageStyles } from '../../store/interfaces';

const Image = ({
  image,
  style,
  handleRemoveImageClick,
}: {
  image: IImage;
  style: IImageStyles;
  imageId: string | number;
  handleRemoveImageClick: (e: React.FormEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <div className='img-container mx-auto' style={style}>
      <img src={image ? image.url : ''} alt={image.alt} style={style} />
      <button className='btn-in-img' onClick={handleRemoveImageClick}>
        X
      </button>
    </div>
  );
};

export default Image;
