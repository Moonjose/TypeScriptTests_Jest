import { Order } from './classes/order';
import { Persistency } from './services/persistency';

import { MessagingSend } from './services/messaging-send';
import { ShoppingCart } from './classes/shopping-cart';
import { Product } from './classes/product';
import { NoDiscount } from './classes/discount';

// const fiftyDisc = new FiftyPercentDiscount();
// const tenDisc = new TenPercentDiscount();
const noDisc = new NoDiscount();
const shoppingCart = new ShoppingCart(noDisc);
const messaging = new MessagingSend();
const persistency = new Persistency();

const order = new Order(shoppingCart, messaging, persistency);
shoppingCart.addItem(new Product('Camiseta', 49.9));
shoppingCart.addItem(new Product('Livro', 145.9));
shoppingCart.addItem(new Product('Mouse', 49.9));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());

console.log(order.orderStatus);
order.checkout();
console.log(order.orderStatus);
