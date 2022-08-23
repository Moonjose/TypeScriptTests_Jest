import { ShoppingCart } from '../classes/shopping-cart';
import { Discount } from '../classes/discount';
import { ICartItem } from '../classes/interfaces/ICartItem';

const createSut = () => {
  const discountMock = createDiscountMock();
  const sut = new ShoppingCart(discountMock);
  return { sut, discountMock };
}

const createDiscountMock = () => {
  class DiscountMock extends Discount {}
  return new DiscountMock();
}

const createCartItemMock = (name: string, price: number) => {
  class CartItemMock implements ICartItem {
    constructor(public name: string, public price: number) {}
  }

  return new CartItemMock(name, price);
}

const createSutWithProducts = () => {
  const { sut, discountMock } = createSut();
  const cartItem1 = createCartItemMock('Camiseta', 49.9);
  const cartItem2 = createCartItemMock('Mouse', 159.9);
  sut.addItem(cartItem1);
  sut.addItem(cartItem2);
  return { sut, discountMock };
}

describe('ShoppingCart', () => {
  it('should be an empty cart when no product is added', () => {
    const { sut } = createSut();
    expect(sut.isEmpty()).toBe(true);
  })

  it('should have 2 cart items', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
  })

  it('should test total and totalWithDiscount', () => {
    const { sut } = createSutWithProducts();
    expect(sut.total()).toBe(209.8);
    expect(sut.totalWithDiscount()).toBe(209.8);
  })

  it('should add products and clear cart', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
    sut.clear();
    expect(sut.items.length).toBe(0);
    expect(sut.isEmpty()).toBe(true);
  })

  it('should remove products', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
    sut.removeItem(1);
    expect(sut.items.length).toBe(1);
    sut.removeItem(0);
    expect(sut.items.length).toBe(0);
    expect(sut.isEmpty()).toBe(true);
  })

  it('should call discount.calculate once when totalWithDiscount is called', () => {
    const { sut, discountMock } = createSutWithProducts();
    const discountMockSpy = jest.spyOn(discountMock, 'calculate');
    sut.totalWithDiscount();
    expect(discountMockSpy).toHaveBeenCalledTimes(1);
  })

  it('should call discount.calculate with total price when totalWithDiscount is called', () => {
    const { sut, discountMock } = createSutWithProducts();
    const discountMockSpy = jest.spyOn(discountMock, 'calculate');
    sut.totalWithDiscount();
    expect(discountMockSpy).toBeCalledWith(sut.total());
  })
})