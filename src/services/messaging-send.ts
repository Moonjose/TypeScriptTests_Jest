import { IMessagingSend } from '../classes/interfaces/IMessagingSend';

export class MessagingSend implements IMessagingSend {
  sendMessage(msg: string): void {
    console.log('Mensagem enviada:', msg);
  }
}
