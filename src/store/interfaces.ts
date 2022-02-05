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
  id: IRecipe['id'];
  title: IRecipe['title'];
  ingredients: IRecipe['ingredients'];
  tags: IRecipe['tags'];
  preparation?: IRecipe['preparation'];
  tips: IRecipe['tips'];
  mainPhoto: IRecipe['mainPhoto'];
}

export interface IImageStyles {
  border?: string;
  width: string;
  height?: string;
  borderRadius?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  margin?: string;
}
