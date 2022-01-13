import { IImage } from '../../store/interfaces';

const Image = ({ image }: { recipeId: number | string; image: IImage }) => {
  return (
    <div className='text-center'>
      <img src={image ? image.url : ''} className='rounded img-page' alt={image.alt} />
    </div>
  );
};

export default Image;
