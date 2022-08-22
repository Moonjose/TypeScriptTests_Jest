import { ICartItem } from './ICartItem';

export interface IShoppingCart {
  items: Readonly<ICartItem[]>;
  addItem(item: ICartItem): void;
  removeItem(index: number): void;
  total(): number;
  totalWithDiscount(): number;
  isEmpty(): boolean;
  clear(): void;
}
