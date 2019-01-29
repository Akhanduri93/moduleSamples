import { NgModule } from '@angular/core';

/* Pipes */
import { CurrencyFormat } from './currency.pipe';
import { SafePipe } from './safe.pipe';
import { IbanPipe } from './iban.pipe';

@NgModule({
  declarations: [
    CurrencyFormat,
    SafePipe,
    IbanPipe
  ],
  exports: [
    CurrencyFormat,
    SafePipe,
    IbanPipe
  ]
})
export class MyPipesModule { }
