import { IImage, IImageStyles } from '../../store/interfaces';

const Image = ({ recipeId, image, style }: { recipeId: number | string; image: IImage; style: IImageStyles }) => {
  return (
    <div className='img-container mx-auto' style={style}>
      <img src={image ? image.url : ''} alt={image.alt} style={style} />
      <button className='btn-in-img'>X</button>
    </div>
  );
};

export default Image;
