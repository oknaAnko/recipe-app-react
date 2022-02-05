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
      <img src={image ? image.url : ''} alt={image ? image.alt : ''} style={style} />
      <button className='btn-in-img' onClick={handleRemoveImageClick}>
        X
      </button>
    </div>
  );
};

export default Image;
