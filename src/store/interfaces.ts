export interface IIngredient {
  id: number;
  amount: number;
  unit: string;
  name: string;
}

export interface IRecipe {
  id: number;
  title: string;
  ingredients: IIngredient[];
  tags: string[];
  preparation?: string;
  tips?: string;
}
