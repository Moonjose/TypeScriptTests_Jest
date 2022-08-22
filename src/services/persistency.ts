import { IPersistency } from '../classes/interfaces/IPersistency';

export class Persistency implements IPersistency {
  saveOrder(): void {
    console.log('Pedido salvo com sucesso...');
  }
}
