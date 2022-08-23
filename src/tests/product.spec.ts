import { Product } from "../classes/product";


const createSut = (name: string, price: number): Product => {
  return new Product(name, price);
}

describe('Product', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have properties name and price', () => {
    const sut = createSut('Camisa', 39.9);
    expect(sut).toHaveProperty('name', 'Camisa');
    expect(sut.price).toBeCloseTo(39.9);
  })
})