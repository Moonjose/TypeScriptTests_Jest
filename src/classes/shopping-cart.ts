import { Discount } from './discount';
import { ICartItem } from './interfaces/ICartItem';
import { IShoppingCart } from './interfaces/IShoppingCart';

export class ShoppingCart implements IShoppingCart {
  private readonly _items: ICartItem[] = [];

  constructor(private readonly discount: Discount) {}

  addItem(item: ICartItem): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    this._items.splice(index, 1);
  }

  get items(): Readonly<ICartItem[]> {
    return this._items;
  }

  total(): number {
    return +this._items
      .reduce((total, next) => total + next.price, 0)
      .toFixed(2);
  }

  totalWithDiscount(): number {
    return this.discount.calculate(this.total());
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  clear(): void {
    console.log('Carrinho de compras foi limpo');
    this._items.length = 0;
  }
}
