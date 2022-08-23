import { Order } from "../classes/order";
import { IShoppingCart } from '../classes/interfaces/IShoppingCart';
import { ICartItem } from '../classes/interfaces/ICartItem';
import { IMessagingSend } from '../classes/interfaces/IMessagingSend';
import { IPersistency } from '../classes/interfaces/IPersistency';
import { ShoppingCart } from "../classes/shopping-cart";

class ShoppingCartMock implements IShoppingCart {
  get items(): Readonly<ICartItem[]> {
    return [];
  }
  addItem(item: ICartItem): void {
    
  }
  removeItem(index: number): void {
    
  }
  total(): number {
    return 1;
  }
  totalWithDiscount(): number {
    return 2;
  }
  isEmpty(): boolean {
    return false;
  }
  clear(): void {
    
  }
}

class MessagingSendMock implements IMessagingSend {
  sendMessage() {}
}

class PersistencyMock implements IPersistency {
  saveOrder() {}
}

const createSut = () => {
  const shoppingCartMock = new ShoppingCartMock();
  const messagingMock = new MessagingSendMock();
  const persistencyMock = new PersistencyMock();
  const sut = new Order(
    shoppingCartMock,
    messagingMock,
    persistencyMock,
  )
  
  return {
    sut,
    shoppingCartMock,
    messagingMock,
    persistencyMock,
  }
}

describe('Order', () => {
  it('should not checkout if cart is empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'isEmpty').mockReturnValueOnce(true);
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('open');
  });

  it('should checkout if cart is not empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmpty')
      .mockReturnValueOnce(false);
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('closed');
  });

  it('should send an email to customer', () => {
    const { sut, messagingMock } = createSut();
    const messagingMockSpy = jest.spyOn(messagingMock, 'sendMessage');
    sut.checkout();
    expect(messagingMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should save order', () => {
    const { sut, persistencyMock } = createSut();
    const persistencyMockSpy = jest.spyOn(persistencyMock, 'saveOrder');
    sut.checkout();
    expect(persistencyMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should clear cart', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'clear');
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
  });
})