import { MessagingSend } from "../services/messaging-send";

const createSut = () => {
  return new MessagingSend();
}

describe('Messaging', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return undefined', () => {
    const sut = createSut();
    expect(sut.sendMessage('teste')).toBeUndefined();
  })

  it('should call console.log once', () => {
    const sut = createSut();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.sendMessage('teste');
    expect(consoleSpy).toBeCalledTimes(1);
  })

  it('should call console.log with "Mensagem enviada: and msg"', () => {
    const sut = createSut();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.sendMessage('teste');
    expect(consoleSpy).toHaveBeenCalledWith('Mensagem enviada:', 'teste');
  })
})