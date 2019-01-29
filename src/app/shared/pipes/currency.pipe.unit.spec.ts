import { CurrencyFormat } from './currency.pipe';

xdescribe('CurrencyFormatPipe', () => {
  let pipe: CurrencyFormat;

  beforeEach(() => {
    pipe = new CurrencyFormat();
  });

  it('should convert currency', () => {
    expect(pipe.transform(300)).toBe('300,00 €');
  });
});
