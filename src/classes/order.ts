import { IMessagingSend } from './interfaces/IMessagingSend';
import { IPersistency } from './interfaces/IPersistency';
import { IShoppingCart } from './interfaces/IShoppingCart';
import { IOrderStatus } from './interfaces/IOrderStatus';

export class Order {
  private _orderStatus: IOrderStatus = 'open';

  constructor(
    private readonly cart: IShoppingCart,
    private readonly messaging: IMessagingSend,
    private readonly persistency: IPersistency,
  ) {}

  get orderStatus(): IOrderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if (this.cart.isEmpty()) {
      console.log('Seu carrinho está vazio');
      return;
    }

    this._orderStatus = 'closed';
    this.messaging.sendMessage(
      `Seu pedido com total de ${this.cart.totalWithDiscount()} foi recebido.`,
    );
    this.persistency.saveOrder();
    this.cart.clear();
  }
}
