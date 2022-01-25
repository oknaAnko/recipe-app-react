import { RouteComponentProps } from 'react-router-dom';

export interface IIngredient {
  id: number | string;
  amount: number;
  unit: string;
  name: string;
}

export interface ITag {
  id: string;
  category: string;
  subcategory: string;
  name: string;
}

export interface IImage {
  id: string | number;
  url: string;
  alt: string;
}

export interface IRecipe {
  id: number | string;
  title: string;
  ingredients: IIngredient[];
  tags: ITag[];
  preparation?: string;
  tips: string;
  mainPhoto: IImage;
  mainPhotoId?: string | number;
}

//match.params
export interface RecipeListPageMatchParams {
  name: string;
  category: string;
}

export interface RecipePageMatchParams {
  idParam: string;
}

export interface IRecipeRouterComponentProps extends RouteComponentProps<RecipePageMatchParams> {
  id: number;
  title: string;
  ingredients: IIngredient[];
  tags: ITag[];
  preparation?: string;
  tips: string;
  mainPhoto: IImage;
  mainPhotoId?: string | number;
}

export interface IImageStyles {
  border?: string;
  width: string;
  height?: string;
  borderRadius?: string;
}

export interface IUploadedImage {
  id: number;
  filename: string;
  mimetype: string;
  size: number;
  path: string;
  updated_at: string;
  created_at: string;
}
